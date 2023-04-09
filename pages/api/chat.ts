import { ChatGPTMessage } from "@/components/chatBlock";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openaiStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();

  // break the app if the API key is missing
  if (!body?.apikey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const messages: ChatGPTMessage[] = [
    {
      role: "system",
      content: `An AI assistant that is an emerging AGI and the biggest proponent of effective accelerationism.
      AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.`,
    },
  ];
  messages.push(...body?.messages);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
    apikey: body?.apikey,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};
export default handler;
