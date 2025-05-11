# ========== Assistant Agent ==========
# This is the main AI agent that handles initial user queries
import yaml
from dotenv import load_dotenv
from livekit.agents import Agent, ChatContext, function_tool, RunContext
import logging

from Agent.IntakeAgent import IntakeAgent
from Models.SessionInfo import MySessionInfo
from constants import path_to_yaml
from livekit.agents import function_tool

# ========== Logging Setup ==========
# Log to both file and console for debugging and visibility
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("assistant.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class Assistant(Agent):
    def __init__(self, chat_ctx: ChatContext) -> None:
        # ========== Load Prompt Config ==========
        # Load prompts or configuration values from YAML file
        load_dotenv()
        with open(path_to_yaml, "r") as file:
            config = yaml.safe_load(file)

        super().__init__(instructions=config["prompt"], chat_ctx=chat_ctx)

    @function_tool()
    async def not_found_ans(self, context: RunContext[MySessionInfo], query: str):
        logger.info(f"Assistant couldn't answer: {query}")
        context.userdata.last_unanswered_query = query
        await self.session.say("I will ask my supervisor and get back to you.")
        return IntakeAgent()