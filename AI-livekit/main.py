from dotenv import load_dotenv
from livekit import agents

from EntryPoint.entrypoint import entrypoint
load_dotenv()
# ========== Run App ==========
if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
