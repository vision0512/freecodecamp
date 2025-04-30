import OpenAI from 'openai';
import { CHATBOT_CONFIG } from '../config/chatbot';

class ChatbotService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: CHATBOT_CONFIG.API_KEY,
      dangerouslyAllowBrowser: true // Only for development
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: CHATBOT_CONFIG.MODEL,
        messages: [{ role: 'user', content: message }],
        max_tokens: CHATBOT_CONFIG.MAX_TOKENS,
        temperature: CHATBOT_CONFIG.TEMPERATURE,
      });

      return response.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
}

export const chatbotService = new ChatbotService();