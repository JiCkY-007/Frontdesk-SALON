# ========== Intake Agent ==========
# This agent takes over when the assistant can’t answer a question
import asyncio
import logging
import aiohttp
from livekit.agents import Agent, function_tool, RunContext

from Models.SessionInfo import MySessionInfo
from constants import request_url_to_notify

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


class IntakeAgent(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are an intake agent. Ask the user for their name and phone number, and store both.")
        logger.info("Initialized IntakeAgent")

    async def on_enter(self) -> None:
        last_query = self.session.userdata.last_unanswered_query
        if last_query:
            await self.session.say(
                f"You asked: '{last_query}'. Before I follow up, may I know your name and phone number?")
        else:
            await self.session.say("Please provide your name and phone number.")

    @function_tool()
    async def record_user_info(self, context: RunContext[MySessionInfo], name: str, number: int):
        from EntryPoint.entrypoint import notify_human_review_required
        logger.info(f"Collected name: {name}, number: {number}")
        context.userdata.user_name = name
        context.userdata.number = number

        await self.session.say("Thank you! I am messaging my supervisor now. Please wait a moment.")

        await notify_human_review_required(name, number, self.session.userdata.last_unanswered_query)

        # ========== Polling Backend for Updates ==========
        # This checks every 20s for a supervisor reply for 2 minutes
        async def poll_backend():
            url = f"{request_url_to_notify}/{name}_{number}"
            headers = {"Content-Type": "application/json"}

            for _ in range(6):
                await asyncio.sleep(20)
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, headers=headers) as resp:
                        if resp.status == 200:
                            data = await resp.json()
                            if data.get("success") and data.get("data", {}).get("status") == "Approved":
                                answer = data["data"].get("updateMessage",
                                                          "Supervisor replied, but no message was found.")
                                query = self.session.userdata.last_unanswered_query or "your question"

                                response_text = f"I asked my supervisor about '{query}', and they said: {answer}"
                                await self.session.say(response_text)

                                await asyncio.sleep(2)
                                await self.session.say("Do you want to know anything else, or should I end the call?")
                                return

            await self.session.say(
                "Sorry, I couldn’t get a response from my supervisor right now. We'll follow up soon.")

        await poll_backend()
        return None

