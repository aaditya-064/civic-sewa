import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Initialize chat with a welcome message
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "bot",
        time: new Date(),
      },
    ]);
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem("chatSession");
    if (savedSession) {
      const { id, messages: savedMessages } = JSON.parse(savedSession);
      setSessionId(id);
      setMessages(
        savedMessages.map((msg) => ({
          ...msg,
          time: new Date(msg.time),
        }))
      );
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        "chatSession",
        JSON.stringify({
          id: sessionId,
          messages,
        })
      );
    }
  }, [messages, sessionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/hook/webhook`,
        {
          queryText: input,
          sessionId: sessionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update session ID if it's a new conversation
      if (res.data.sessionId && !sessionId) {
        setSessionId(res.data.sessionId);
      }

      const botMsg = {
        text: res.data.response,
        sender: "bot",
        time: new Date(),
        intent: res.data.intent,
        parameters: res.data.parameters,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat API Error:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Sorry, I'm having trouble connecting right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          time: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "bot",
        time: new Date(),
      },
    ]);
    setSessionId(null);
    localStorage.removeItem("chatSession");
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
        <button
          onClick={clearChat}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear Chat
        </button>
      </div>
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
              <div
                className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                  msg.isError
                    ? "bg-red-50 text-red-600"
                    : msg.sender === "user"
                    ? "bg-blue-50"
                    : "bg-gray-100"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400">
                  {formatTime(msg.time)}
                </span>
                {msg.intent && (
                  <span className="text-xs text-blue-500 block">
                    Intent: {msg.intent}
                  </span>
                )}
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
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="animate-pulse">Typing</div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex mt-2 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            loading || !input.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
