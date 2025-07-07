export interface ChatCompletionMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function callOpenAIWithHistory(systemPrompt: string, messages: ChatCompletionMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("OpenAI API key not found in environment variables");
    return "API key not configured. Please set VITE_OPENAI_API_KEY in your .env.local file.";
  }

  const allMessages: ChatCompletionMessage[] = [
    {
      role: "system",
      content: systemPrompt
    },
    ...messages
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: allMessages,
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0]?.message?.content || "No response from AI";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

// Backward compatibility function
export async function callOpenAI(systemPrompt: string, userMessage: string): Promise<string> {
  return callOpenAIWithHistory(systemPrompt, [{ role: "user", content: userMessage }]);
}