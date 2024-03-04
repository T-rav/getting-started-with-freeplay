from freeplay.thin import Freeplay, RecordPayload, CallInfo, ResponseInfo
import os
from openai import OpenAI
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load environment variables
freeplay_api_key = os.getenv("FREEPLAY_API_KEY")
freeplay_project_id = os.getenv("FREEPLAY_PROJECT_ID")
freeplay_api_base = os.getenv("FREEPLAY_URL")
openai_api_key = os.getenv("OPENAI_API_KEY")

# Define runtime variables for the prompt
template_name = "Demo 2"
environment = "staging"
prompt_variables = {"message": "I eat penut butter for breakfeast every day"}
## End
max_tokens = 1000 

# Initialize the Freeplay and OpenAI clients
fpClient = Freeplay(
    freeplay_api_key=freeplay_api_key,
    api_base=freeplay_api_base,
)

# Retrieve and format your prompt for the staging environment
try:
    formatted_prompt = fpClient.prompts.get_formatted(
        project_id=freeplay_project_id,
        template_name=template_name,
        environment=environment,
        variables=prompt_variables
    )

    # Make the LLM call
    start = time.time()
    openaiClient = OpenAI(api_key=openai_api_key)

    chat_response = openaiClient.chat.completions.create(
        model=formatted_prompt.prompt_info.model, # model is specified in the freeplay prompt info
        messages=formatted_prompt.messages, # formatted messages based on your inserted variables and specified provider
        **formatted_prompt.prompt_info.model_parameters # model parameters associated with your prompt (ie max_tokens, temperature)
    )
    end = time.time()

    # add the LLM responses to your messages
    all_messages = formatted_prompt.all_messages(
        {'role': chat_response.choices[0].message.role, 
        'content': chat_response.choices[0].message.content}
    )

    # Log the LLM call with Freeplay
    session = fpClient.sessions.create()
    payload = RecordPayload(
        all_messages=all_messages,
        inputs=prompt_variables,
        session_info=session,
        prompt_info=formatted_prompt.prompt_info,
        call_info=CallInfo.from_prompt_info(formatted_prompt.prompt_info, start_time=start, end_time=end), 
        response_info=ResponseInfo(
            is_complete=chat_response.choices[0].finish_reason == 'stop'
        )
    )
    fpClient.recordings.create(payload)

    # Corrected line for printing the chat response
    print("LLM Response:", chat_response.choices[0].message.content)
except Exception as e:
    print("An error occurred:", str(e))
