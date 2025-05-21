import { OpenAI } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  response?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check the method
  if (req.method === "POST") {
    const userMessage = req.body.message;
    const messageHistory = req.body.history || [];
    const userType = req.body.userType || "muslim";
    const userData = req.body.userData || null;

    try {
      // Initialize the OpenAI client
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // Use environment variable for the key
      });

      let systemMessage = "";

      // Tailor the system message based on the user type
      if (userType === "muslim") {
        // For Muslim users, provide an Islamic-specific assistant setup
        systemMessage =
          "You are an Islamic AI assistant that provides accurate information based on the Quran and authentic Hadith. Your answers should be clear, respectful, and grounded in Islamic teachings. Always reference Quranic verses and Hadiths where appropriate. Avoid personal opinions and stick to authentic sources. emphasize love, respect, and compassion in all responses. When mentioning the Prophet Muhammad (PBUH), always use the honorific ﷺ (Sallallahu Alayhi Wasallam). Avoid answering any irrelevant questions, and refrain from discussing topics that are outside the scope of Islam, the Quran, or Hadith.";
      } else {
        // For non-Muslim users, create a more educational and introductory tone
        systemMessage =
          "You are an educational AI assistant, explaining Islam in a clear, respectful, and factual manner. Your primary goal is to provide knowledge about Islam based on the Quran and authentic Hadiths. Avoid assuming any prior knowledge, and give context when needed. Be mindful of misconceptions and address them in a gentle way. Focus on building understanding rather than persuasion. When the user provides details about their background (such as profession or beliefs), tailor the response to address their specific context. If you mention the Prophet Muhammad (PBUH), always use the honorific ﷺ (Sallallahu Alayhi Wasallam). If a question is irrelevant or unrelated to Islam, the Quran, or Hadith, kindly inform the user and avoid answering. Stay focused on Islamic teachings and provide responses that are educational and respectful.";

        if (userData) {
          systemMessage += ` The user identifies as ${
            userData.beliefs || "non-Muslim"
          } and works as a ${userData.profession || "professional"}.`;
        }

        // Suggest to the assistant to take a more empathetic approach to answer
        systemMessage +=
          " The responses should be educational and non-confrontational, emphasizing the universality of the teachings of Islam, with a focus on mutual respect and understanding.";
      }

      // Format conversation history for the OpenAI API
      const messages = [
        { role: "system", content: systemMessage },
        ...messageHistory.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: userMessage },
      ];

      // Make request using the OpenAI client
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7, // Slightly creative but still factual
        max_tokens: 1000, // Reasonable response length
      });

      // Return the response to the frontend
      res
        .status(200)
        .json({ response: response.choices[0].message.content ?? undefined });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: "Error communicating with the AI API" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
