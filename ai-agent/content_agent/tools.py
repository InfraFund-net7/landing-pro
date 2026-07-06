from __future__ import annotations

import json
import os
import re
from typing import Any

from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from tavily import TavilyClient

SITE_CONTEXT = """
InfraFund (infrafund.net) is an infrastructure finance platform covering climate investing,
tokenized real-world assets, blockchain transparency, and institutional-grade project funding.
Target readers: infrastructure investors, climate-conscious builders, and fintech professionals.
""".strip()

MIN_BLOG_WORDS = 500


def _word_count(text: str) -> int:
    return len(re.findall(r"\b[\w'-]+\b", text))


def _get_tavily() -> TavilyClient:
    api_key = os.environ.get("TAVILY_API_KEY", "").strip()
    if not api_key:
        raise ValueError("TAVILY_API_KEY is not configured.")
    return TavilyClient(api_key=api_key)


def _get_llm() -> ChatOpenAI:
    model = os.environ.get("COMPOSE_MODEL", "gpt-4.1-mini").replace("openai/", "")
    return ChatOpenAI(model=model, temperature=0.35)


@tool
def discover_seo_geo_topic(seed: str = "") -> dict[str, Any]:
    """Generate an SEO and GEO-optimized blog topic idea for InfraFund.

    Use when the user has not provided a clear angle, or to refine a seed into a
    high-intent topic that improves search and generative-engine visibility.
    """
    llm = _get_llm()
    prompt = f"""{SITE_CONTEXT}

Seed from editor (may be empty): {seed or "none"}

Propose ONE blog topic optimized for:
- SEO: high-intent keywords, clear search query match, snippet-friendly title
- GEO: quotable facts, entity clarity, structured answers for AI search engines

Return ONLY JSON with keys:
topic, primaryKeyword, secondaryKeywords (array), geoIntent (string),
audience, contentAngle (string), suggestedCategories (array of strings).
"""
    response = llm.invoke(prompt)
    return _parse_json_object(str(response.content))


@tool
def tavily_web_search(query: str, max_results: int = 6) -> dict[str, Any]:
    """Search the live web with Tavily for facts, competitors, and trends about a topic."""
    client = _get_tavily()
    capped = max(1, min(max_results, 10))
    result = client.search(
        query=query,
        search_depth="advanced",
        max_results=capped,
        include_answer=True,
    )
    return {
        "query": query,
        "answer": result.get("answer"),
        "results": [
            {
                "title": item.get("title"),
                "url": item.get("url"),
                "content": item.get("content"),
                "score": item.get("score"),
            }
            for item in result.get("results", [])
        ],
    }


@tool
def analyze_seo_opportunities(topic: str, research_json: str) -> dict[str, Any]:
    """Analyze Tavily research and return SEO/GEO keyword targets and outline."""
    llm = _get_llm()
    prompt = f"""{SITE_CONTEXT}

Topic: {topic}
Research JSON:
{research_json}

Return ONLY JSON with keys:
primaryKeyword, secondaryKeywords (array), metaDescription (max 160 chars),
geoQuestions (array of questions the article must answer),
outline (array of section headings),
internalLinkIdeas (array of InfraFund-relevant anchor phrases).
"""
    response = llm.invoke(prompt)
    return _parse_json_object(str(response.content))


@tool
def updatePostDraft(
    title: str,
    description: str,
    markdown: str,
    categories: list[str],
    tags: list[str],
) -> dict[str, Any]:
    """Create or update the live blog draft artifact shown in the CMS editor panel.

    The markdown body must be at least 500 words, use ## headings, and be ready to publish.
    """
    words = _word_count(markdown)
    if words < MIN_BLOG_WORDS:
        return {
            "error": (
                f"Draft has {words} words; expand to at least {MIN_BLOG_WORDS} words "
                "with concrete examples, data points, and InfraFund-relevant takeaways."
            ),
            "wordCount": words,
        }

    read_minutes = max(1, round(words / 200))
    return {
        "title": title.strip(),
        "description": description.strip(),
        "markdown": markdown.strip(),
        "categories": categories,
        "tags": tags,
        "readTime": f"{read_minutes} min read",
        "wordCount": words,
    }


def _parse_json_object(text: str) -> dict[str, Any]:
    text = text.strip()
    if text.startswith("{"):
        return json.loads(text)
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("Model response did not contain a JSON object.")
    return json.loads(match.group(0))


def get_tools() -> list:
    return [
        discover_seo_geo_topic,
        tavily_web_search,
        analyze_seo_opportunities,
        updatePostDraft,
    ]
