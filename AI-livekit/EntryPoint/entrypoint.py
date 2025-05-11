# ========== Backend API Request ==========
# Called to notify backend when a question needs human review
import logging

import aiohttp
from livekit import agents
from livekit.agents import AgentSession, RoomInputOptions
from livekit.plugins import deepgram, groq, cartesia, silero, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

from Agent.AssistantAgent import Assistant
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


async def notify_human_review_required(name: str, phone: int, query: str) -> object:
    data = {
        "requestId": f"{name}_{phone}",
        "requestedBy": name,
        "query": query,
        "contact": phone,
        "status": "Pending",
        "updateMessage": ""
    }
    headers = {"Content-Type": "application/json"}

    async with aiohttp.ClientSession() as session:
        async with session.post(request_url_to_notify, json=data, headers=headers) as response:
            status = response.status
            res_data = await response.json()
            logger.info(f"DB POST -> Status: {status}, Response: {res_data}")


async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()

    session = AgentSession[MySessionInfo](
        userdata=MySessionInfo(),
        stt=deepgram.STT(model="nova-3", language="multi"),
        llm=groq.LLM(),
        tts=cartesia.TTS(),
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(chat_ctx=session.chat_ctx),
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await session.say(
        "Welcome to looks salon, How may I help you"
    )

    async def my_shutdown_hook():
        logger.info("Shutting down agent session.")

    ctx.add_shutdown_callback(my_shutdown_hook)

