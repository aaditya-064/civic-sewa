import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user", time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await axios.post(
        "https://civic-sewa.onrender.com/api/v1/hook/webhook",
        {
          text: input,
        }
      );

      const botMsg = {
        text: res.data.response,
        sender: "bot",
        time: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error getting response",
          sender: "bot",
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-xl rounded-xl bg-white h-[600px] flex flex-col">
      <h2 className="text-xl font-semibold mb-2">AI Chat Assistant</h2>
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-end space-x-2">
              {msg.sender === "bot" && (
                <img
                  src="/bot.png"
                  className="w-8 h-8 rounded-full"
                  alt="Bot"
                />
              )}
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm max-w-xs">
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400">
                  {formatTime(msg.time)}
                </span>
              </div>
              {msg.sender === "user" && (
                <img
                  src="/user.png"
                  className="w-8 h-8 rounded-full"
                  alt="You"
                />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 text-sm animate-pulse">Typing...</div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex mt-2 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
