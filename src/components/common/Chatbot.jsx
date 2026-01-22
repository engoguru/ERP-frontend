import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your CA Services assistant. How can I help you today?",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      { id: messages.length + 1, type: "user", content: message },
      {
        id: messages.length + 2,
        type: "bot",
        content:
          "Thanks for your message! Our team will assist you shortly. In the meantime, you can browse our services or check the FAQ section.",
      },
    ]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[hsl(168_76%_42%)] text-white shadow-lg shadow-[hsl(168_76%_42%)]/25 hover:shadow-xl hover:shadow-[hsl(168_76%_42%)]/30 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 0 } : { scale: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-10 right-6 z-100 w-[340px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-5xl border border-gray-300 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[hsl(168_76%_42%)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(168_76%_42%)]/50 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">CA Assistant</h3>
                  <p className="text-xs text-white/70">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-1 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium text-start ${
                      msg.type === "user"
                        ? "bg-[hsl(168_76%_42%)] text-white rounded-br-md"
                        : "bg-gray-200 text-gray-700 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(168_76%_42%)]"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-[hsl(168_76%_42%)] hover:bg-green-700 text-white rounded-full p-2 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
