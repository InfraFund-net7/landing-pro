"""HTTP API for the LangGraph content agent (Azure VM + CMS proxy)."""

from __future__ import annotations

import os
import secrets
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from content_agent.graph import run_chat

load_dotenv(Path(__file__).with_name(".env"))

app = FastAPI(title="InfraFund Content Agent", version="0.2.0")


def _require_env(*names: str) -> None:
    missing = [name for name in names if not os.environ.get(name, "").strip()]
    if missing:
        raise HTTPException(
            status_code=503,
            detail=f"Missing required environment variables: {', '.join(missing)}",
        )


def _authorize(authorization: str | None) -> None:
    expected = os.environ.get("CONTENT_AGENT_API_KEY", "").strip()
    if not expected:
        return
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token.")
    token = authorization.removeprefix("Bearer ").strip()
    if not secrets.compare_digest(token, expected):
        raise HTTPException(status_code=401, detail="Invalid bearer token.")


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    thread_id: str | None = None


class ToolEvent(BaseModel):
    toolCallId: str
    toolName: str
    input: dict[str, Any] | list[Any] | str | int | float | bool | None = None
    output: Any = None


class DraftArtifact(BaseModel):
    title: str
    description: str = ""
    markdown: str
    categories: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    readTime: str = ""
    wordCount: int | None = None


class ChatResponse(BaseModel):
    thread_id: str
    assistant_text: str
    tool_events: list[ToolEvent]
    draft: DraftArtifact | None = None


class ComposeRequest(BaseModel):
    prompt: str = Field(min_length=1)
    thread_id: str | None = None


@app.get("/health")
def health() -> dict[str, str]:
    _require_env("OPENAI_API_KEY", "TAVILY_API_KEY")
    return {"status": "ok", "agent": "langgraph-seo-geo"}


@app.post("/chat", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    authorization: str | None = Header(default=None),
) -> ChatResponse:
    _authorize(authorization)
    _require_env("OPENAI_API_KEY", "TAVILY_API_KEY")

    result = run_chat(request.message, thread_id=request.thread_id)
    draft = result.get("draft")

    return ChatResponse(
        thread_id=result["thread_id"],
        assistant_text=result.get("assistant_text", ""),
        tool_events=result.get("tool_events", []),
        draft=DraftArtifact(**draft) if draft else None,
    )


@app.post("/compose", response_model=ChatResponse)
def compose(
    request: ComposeRequest,
    authorization: str | None = Header(default=None),
) -> ChatResponse:
    return chat(
        ChatRequest(message=request.prompt, thread_id=request.thread_id),
        authorization=authorization,
    )
