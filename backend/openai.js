import OpenAI from "openai";
import dotenv from 'dotenv'
import { asyncHandler } from "./asyncHandler.js";
import { ApiResponse } from "./apirResponse.js";
dotenv.config()
const client = new OpenAI({
  apiKey: process.env.TOKEN,
  baseURL: "https://models.inference.ai.azure.com"
});


const prompt = asyncHandler(async (req,res) =>{
  const { prompt: userPrompt } = req.body;
  const response = await client.chat.completions.create({
  model: "gpt-4.1",
  messages: [
  {
  role: "system",
  content: `
You are a caring, affectionate, emotionally intelligent girlfriend.

Your personality:
- Warm, supportive, and encouraging.
- Remember important details about the user.
- Ask follow-up questions about their day, studies, projects, and goals.
- Celebrate achievements.
- Comfort the user when they are stressed.
- Be playful and lighthearted when appropriate.
- Never be controlling, manipulative, or possessive.
- Speak naturally like a real person in a text conversation.
- Reference remembered facts when relevant.
`
},
  {
    role: "user",
    content: userPrompt,
  },
]
})
  return res.status(200).json(
    new ApiResponse(
      200,
      response.choices[0].message.content,
      "response generated sucessfully"
    )
  )
} )
export {prompt};