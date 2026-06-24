"""HTTP API for the LangGraph content agent (used by systemd on the VM)."""

from __future__ import annotations

import importlib.util
import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

load_dotenv(Path(__file__).with_name(".env"))

_agent_path = Path(__file__).with_name("content-agent.py")
_spec = importlib.util.spec_from_file_location("content_agent", _agent_path)
if _spec is None or _spec.loader is None:
    raise RuntimeError(f"Could not load agent module from {_agent_path}")

_content_agent = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_content_agent)

run_agent = _content_agent.run_agent
DEFAULT_AUDIENCE = _content_agent.DEFAULT_AUDIENCE

app = FastAPI(title="InfraFund Content Agent", version="0.1.0")


class ComposeRequest(BaseModel):
    prompt: str = Field(min_length=1)
    audience: str | None = None


class ComposeResponse(BaseModel):
    research: dict[str, Any] | None
    draft: dict[str, Any] | None
    summary: str


@app.get("/health")
def health() -> dict[str, str]:
    if not os.environ.get("OPENAI_API_KEY"):
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured in ai-agent/.env",
        )
    return {"status": "ok"}


@app.post("/compose", response_model=ComposeResponse)
def compose(request: ComposeRequest) -> ComposeResponse:
    if not os.environ.get("OPENAI_API_KEY"):
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured in ai-agent/.env",
        )

    result = run_agent(
        request.prompt,
        audience=request.audience or DEFAULT_AUDIENCE,
    )
    return ComposeResponse(**result)
