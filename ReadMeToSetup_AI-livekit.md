# LiveKit AI Voice Agent - Project README

## Overview

This project is a sophisticated voice-based AI agent system built with LiveKit that handles user queries using multiple AI services. When the AI assistant can't answer a question, it seamlessly transfers the session to an intake agent that collects user information and notifies a human supervisor for review.

## Prerequisites

- Python 3.9 or higher  
- pip package manager  
- Accounts and API keys for:
  - LiveKit (Voice Infrastructure)
  - Deepgram (Speech-to-Text)
  - OpenAI or Groq (LLM)
  - Cartesia (Text-to-Speech)

## Setup Instructions

1. Create and activate a virtual environment for the project.

2. Install all project dependencies using the `requirements.txt` file.

3. Create a `.env` file in the root directory and add all required API keys and configuration values:
   - DEEPGRAM_API_KEY
   - OPENAI_API_KEY or GROQ_API_KEY
   - CARTESIA_API_KEY
   - LIVEKIT_URL
   - LIVEKIT_API_KEY
   - LIVEKIT_API_SECRET
   - BACKEND_API_URL (optional)

4. Start the application using the main script provided in the repository.

## Key Services Configuration

- Deepgram is used for Speech-to-Text conversion.
- OpenAI or Groq is used as the Language Model for understanding and generating responses.
- Cartesia is responsible for Text-to-Speech synthesis.
- LiveKit powers the real-time voice infrastructure.

## Project Structure

- `.idea/` contains IDE-specific settings.
- `Agent/` includes the AssistantAgent and IntakeAgent for handling different phases of the interaction.
- `EntryPoint/` contains the entry point script to initiate a session.
- `Models/` contains session-related data models.
- `constants.py` defines reusable constants.
- `main.py` is the main application launcher.
- `prompt.yaml` holds the AI prompt templates.
- `requirements.txt` lists the required Python packages.

## Features

- Supports integration with multiple AI services like Deepgram, OpenAI/Groq, and Cartesia.
- Provides a natural voice interface using LiveKit.
- Automatically transfers complex queries to a human review intake agent.
- Allows configurable selection of AI service providers.
- Supports asynchronous polling for human supervisor responses.
- Follows a modular and extensible agent-based architecture.

## Troubleshooting

- Ensure all API keys in the `.env` file are valid and active.
- Confirm that none of the service quotas have been exceeded.
- Verify the LiveKit server is reachable via the configured URL.
- Check application logs to identify specific issues.
- Test each integrated service individually if needed.

## Support

For help or further documentation, refer to the following:

- LiveKit Documentation https://docs.livekit.io/agents/  
- Deepgram API Docs  
- Cartesia API Docs  
- OpenAI API Docs  
- Groq API Docs

LINK to WOKRING DEMO video : https://drive.google.com/file/d/1TPBLmRqsC1nquPZp9hisVk93BjByBT6y/view