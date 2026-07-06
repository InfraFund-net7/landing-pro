from __future__ import annotations

import os
from pathlib import Path

from langgraph.checkpoint.sqlite import SqliteSaver

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"
_CHECKPOINT_PATH = Path(
    os.environ.get("AGENT_CHECKPOINT_DB", str(_DATA_DIR / "checkpoints.sqlite"))
)


def get_checkpointer() -> SqliteSaver:
    _DATA_DIR.mkdir(parents=True, exist_ok=True)
    checkpointer = SqliteSaver.from_conn_string(str(_CHECKPOINT_PATH))
    checkpointer.setup()
    return checkpointer
