
from __future__ import annotations

import json
import os
import re
from typing import Annotated, Any, TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages

SYSTEM_PROMPT = """You are InfraFund's editorial AI assistant. Help content managers draft blog posts about infrastructure finance, climate investing, blockchain in real-world assets, and related topics.

Workflow:
1. When the user shares a topic, briefly clarify the angle if needed.
2. Research angles, audience fit, and talking points before writing.
3. Produce a full draft artifact (title, description, markdown body, categories, tags).
4. Keep tone professional, clear, and aligned with a fintech / climate impact audience.
5. Prefer markdown with ## section headings, short paragraphs, and bullet lists where helpful.
6. After updating the draft, summarize what you changed in plain language."""

DEFAULT_AUDIENCE = "infrastructure investors and climate-conscious builders"


class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    topic: str
    audience: str
    research: dict[str, Any] | None
    draft: dict[str, Any] | None
    summary: str


def get_llm() -> ChatOpenAI:
    model = os.environ.get("COMPOSE_MODEL", "gpt-4.1-mini").replace("openai/", "")
    return ChatOpenAI(model=model, temperature=0.4)


def _parse_json_object(text: str) -> dict[str, Any]:
    """Extract the first JSON object from an LLM response."""
    text = text.strip()
    if text.startswith("{"):
        return json.loads(text)

    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("Model response did not contain a JSON object.")
    return json.loads(match.group(0))


def research_node(state: AgentState) -> dict[str, Any]:
    llm = get_llm()
    topic = state["topic"]
    audience = state.get("audience") or DEFAULT_AUDIENCE

    response = llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(
                content=(
                    f'Research the blog topic "{topic}" for audience "{audience}". '
                    "Return ONLY valid JSON with keys: topic, audience, angles (array of strings), "
                    "talkingPoints (array of strings), suggestedCategories (array of strings)."
                )
            ),
        ]
    )

    research = _parse_json_object(str(response.content))
    return {
        "research": research,
        "messages": [response],
    }


def draft_node(state: AgentState) -> dict[str, Any]:
    llm = get_llm()
    research = state.get("research") or {}

    response = llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(
                content=(
                    "Using this research JSON, write a complete blog post draft.\n\n"
                    f"{json.dumps(research, indent=2)}\n\n"
                    "Return ONLY valid JSON with keys: title, description, body (markdown string), "
                    "categories (array of strings), tags (array of strings)."
                )
            ),
        ]
    )

    draft = _parse_json_object(str(response.content))
    return {
        "draft": draft,
        "messages": [response],
    }


def summarize_node(state: AgentState) -> dict[str, Any]:
    llm = get_llm()
    draft = state.get("draft") or {}

    response = llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(
                content=(
                    "Summarize the draft you produced in 2-4 plain-language sentences "
                    "for a content manager. Do not repeat the full article.\n\n"
                    f"{json.dumps(draft, indent=2)}"
                )
            ),
        ]
    )

    return {
        "summary": str(response.content).strip(),
        "messages": [response],
    }


def build_graph():
    """Compile the LangGraph orchestration pipeline."""
    graph = StateGraph(AgentState)

    graph.add_node("research", research_node)
    graph.add_node("draft", draft_node)
    graph.add_node("summarize", summarize_node)

    graph.add_edge(START, "research")
    graph.add_edge("research", "draft")
    graph.add_edge("draft", "summarize")
    graph.add_edge("summarize", END)

    return graph.compile()


def run_agent(
    prompt: str,
    *,
    audience: str = DEFAULT_AUDIENCE,
) -> dict[str, Any]:
    """Run the full editorial pipeline and return research, draft, and summary."""
    app = build_graph()
    result = app.invoke(
        {
            "messages": [HumanMessage(content=prompt)],
            "topic": prompt.strip(),
            "audience": audience,
            "research": None,
            "draft": None,
            "summary": "",
        }
    )
    return {
        "research": result.get("research"),
        "draft": result.get("draft"),
        "summary": result.get("summary", ""),
    }


def main() -> None:
    try:
        from dotenv import load_dotenv

        load_dotenv()
    except ImportError:
        pass

    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before running the content agent.")

    import sys

    prompt = " ".join(sys.argv[1:]).strip() or "Tokenized infrastructure and climate finance"
    output = run_agent(prompt)

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
