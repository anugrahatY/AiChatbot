import { useState } from "react";
import ReactMarkdown from "react-markdown";
export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hii <3",
    },
  ]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");

    try {
      const res = await fetch(
        "https://aichatbot-632m.onrender.com/api/v1/ai/getresponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: userPrompt,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.data,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }
  };

  return (
  <div
    data-theme="valentine"
    className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col"
  >
    <div className="navbar bg-pink-500 text-white shadow-lg">
      <div
  className="mx-auto text-3xl text-white drop-shadow-lg"
  style={{ fontFamily: "'Dancing Script', cursive" }}
>
  My Girlfriend
</div>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat ${
            msg.role === "user" ? "chat-end" : "chat-start"
          }`}
        >
          <div
            className={`chat-bubble ${
              msg.role === "user"
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-700 border border-pink-300"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-pink-300 bg-white/70 backdrop-blur-sm p-4">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-pink-700 font-semibold">
          💌 Send a message
        </legend>

        <div className="flex gap-3">
          <input
            type="text"
            className="input flex-1 border-pink-300 focus:outline-none focus:border-pink-500"
            placeholder="Type something sweet..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            className="btn bg-pink-500 hover:bg-pink-600 text-white border-none"
            onClick={sendMessage}
          >
            💕 Send
          </button>
        </div>
      </fieldset>
    </div>
  </div>
);
}