from __future__ import annotations

import uuid
from typing import Any

from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

from content_agent.persistence import get_checkpointer
from content_agent.tools import SITE_CONTEXT, get_tools

SYSTEM_PROMPT = f"""You are InfraFund's monolithic editorial agent orchestrated by LangGraph.

{SITE_CONTEXT}

Your mission: research and write blog posts that improve SEO ranking and GEO (generative engine
optimization) visibility for infrafund.net.

Required workflow for every new post request:
1. If the editor's prompt is vague, call discover_seo_geo_topic first.
2. Call tavily_web_search with a focused query (primary keyword + year when helpful).
3. Call analyze_seo_opportunities using the topic and Tavily JSON.
4. Write a complete article (minimum 500 words in markdown) with ## section headings,
   short paragraphs, bullet lists where useful, and quotable GEO-friendly statements.
5. Call updatePostDraft with title, meta description, markdown body, categories, and tags.
6. If updatePostDraft returns an error about word count, expand the article and call it again.
7. End with a brief plain-language summary of what you researched and wrote.

Tone: professional, credible, fintech / climate impact audience. Do not invent statistics;
prefer insights grounded in Tavily results. Mention InfraFund's transparency and access themes
where natural, without sounding like pure marketing copy.

For follow-up messages in the same thread, refine the existing draft per the editor's request
and call updatePostDraft again when the artifact changes materially.
"""

_agent = None


def get_agent():
    global _agent
    if _agent is None:
        model = ChatOpenAI(
            model=(
                __import__("os").environ.get("COMPOSE_MODEL", "gpt-4.1-mini").replace(
                    "openai/", ""
                )
            ),
            temperature=0.35,
        )
        _agent = create_react_agent(
            model,
            get_tools(),
            checkpointer=get_checkpointer(),
            prompt=SYSTEM_PROMPT,
        )
    return _agent


def _extract_tool_events(messages: list) -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []
    tool_outputs: dict[str, Any] = {}

    for message in messages:
        if isinstance(message, ToolMessage):
            content = message.content
            if isinstance(content, str):
                try:
                    import json

                    tool_outputs[message.tool_call_id] = json.loads(content)
                except json.JSONDecodeError:
                    tool_outputs[message.tool_call_id] = content
            else:
                tool_outputs[message.tool_call_id] = content

    for message in messages:
        if not isinstance(message, AIMessage) or not message.tool_calls:
            continue
        for call in message.tool_calls:
            events.append(
                {
                    "toolCallId": call["id"],
                    "toolName": call["name"],
                    "input": call.get("args", {}),
                    "output": tool_outputs.get(call["id"]),
                }
            )
    return events


def _extract_latest_draft(tool_events: list[dict[str, Any]]) -> dict[str, Any] | None:
    latest: dict[str, Any] | None = None
    for event in tool_events:
        if event["toolName"] != "updatePostDraft":
            continue
        output = event.get("output")
        if isinstance(output, str):
            try:
                import json

                output = json.loads(output)
            except json.JSONDecodeError:
                continue
        if isinstance(output, dict) and output.get("markdown") and not output.get("error"):
            latest = output
    return latest


def _latest_assistant_text(messages: list) -> str:
    for message in reversed(messages):
        if isinstance(message, AIMessage):
            content = message.content
            if isinstance(content, str) and content.strip():
                return content.strip()
            if isinstance(content, list):
                text_parts = [
                    part.get("text", "")
                    for part in content
                    if isinstance(part, dict) and part.get("type") == "text"
                ]
                joined = "\n".join(part for part in text_parts if part).strip()
                if joined:
                    return joined
    return ""


def run_chat(
    message: str,
    *,
    thread_id: str | None = None,
) -> dict[str, Any]:
    agent = get_agent()
    resolved_thread = thread_id or str(uuid.uuid4())
    config = {"configurable": {"thread_id": resolved_thread}}

    result = agent.invoke(
        {"messages": [HumanMessage(content=message.strip())]},
        config,
    )

    messages = result.get("messages", [])
    tool_events = _extract_tool_events(messages)
    draft = _extract_latest_draft(tool_events)

    return {
        "thread_id": resolved_thread,
        "assistant_text": _latest_assistant_text(messages),
        "tool_events": tool_events,
        "draft": draft,
    }
