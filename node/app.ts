import * as dotenv from "dotenv";
import Freeplay, { getCallInfo, getSessionInfo } from "freeplay/thin";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

// Load environment variables
dotenv.config();

// Environment variables
const freeplayApiKey = process.env.FREEPLAY_API_KEY || "";
const openaiApiKey = process.env.OPENAI_API_KEY || "";

// Runtime variables for the prompt
const freeplayApiBase = "https://8thlight.freeplay.ai/api";
const freeplayProjectId = "1019e664-88f2-4cfb-9df6-b82e00a5c941";
const templateName = "Demo 2";
const environment = "staging";
const promptVariables = { message: "I eat penut butter for breakfeast every day" };
const maxTokens = 1000;

// Initialize Freeplay client
const fpClient = new Freeplay({
    freeplayApiKey: freeplayApiKey,
    baseUrl: freeplayApiBase
})

const openai = new OpenAI({"apiKey":openaiApiKey});

async function performOperations() {
  try {
    // Assuming getFormatted is an async method; adjust according to the actual API
    const formattedPrompt = await fpClient.prompts.getFormatted({
      projectId: freeplayProjectId,
      templateName,
      environment,
      variables: promptVariables,
    });

    let start = new Date();

    // Explicitly cast to the expected type for passing to OpenAI
    const chatMessages: Array<ChatCompletionMessageParam> = formattedPrompt.messages.map(message => ({
      role: message.role, 
      content: message.content,
    })) as Array<ChatCompletionMessageParam>; 
    
    const chatCompletion = await openai.chat.completions.create({
        messages: chatMessages,
        model: formattedPrompt.promptInfo.model,
    });
    let end = new Date();
    
    let messages = formattedPrompt.allMessages({
        role: chatCompletion.choices[0].message.role,
        content: chatCompletion.choices[0].message.content as string,
    });

    // record the LLM interaction with Freeplay
    let session = fpClient.sessions.create({}); 
    await fpClient.recordings.create({
        allMessages: messages,
        inputs: promptVariables,
        sessionInfo: getSessionInfo(session),
        promptInfo: formattedPrompt.promptInfo,
        callInfo: getCallInfo(formattedPrompt.promptInfo, start, end),
        responseInfo: {
            isComplete: "stop" === chatCompletion.choices[0].finish_reason
        }
    });

    console.log("LLM Response: ",chatCompletion.choices[0].message);
  } catch (e) {
    console.error("An error occurred:", e);
  }
}

performOperations();
