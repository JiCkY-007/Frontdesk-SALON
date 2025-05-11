from dataclasses import dataclass


# ========== Data Model for User Session ==========
# This dataclass helps maintain session-specific info across agents

@dataclass
class MySessionInfo:
    user_name: str | None = None
    number: int | None = None
    last_unanswered_query: str | None = None  # Save last query assistant couldn’t answer
