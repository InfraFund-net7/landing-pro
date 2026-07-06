#!/usr/bin/env python3
"""CLI entrypoint for the InfraFund content agent."""

from __future__ import annotations

import json
import os
import sys

from dotenv import load_dotenv

from content_agent.graph import run_chat

load_dotenv()


def main() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before running the content agent.")
    if not os.environ.get("TAVILY_API_KEY"):
        raise SystemExit("Set TAVILY_API_KEY before running the content agent.")

    prompt = " ".join(sys.argv[1:]).strip() or (
        "Find an SEO topic about tokenized infrastructure for climate investors"
    )
    output = run_chat(prompt)
    print(json.dumps(output, indent=2, default=str))


if __name__ == "__main__":
    main()
