import React from "react";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface ChatProps {
  serviceId: string;
  onBack: () => void;
}

export function Chat({ serviceId, onBack }: ChatProps) {
  const [message, setMessage] = React.useState("");

  // Simplified mock data - minimal example
  const messages = [
    {
      id: "1",
      sender: "company",
      text: "Olá! Vamos começar?",
      time: "10:30",
    },
    {
      id: "2",
      sender: "me",
      text: "Sim, já estou analisando os requisitos.",
      time: "10:32",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Send message logic here
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-medium text-gray-900">Tech Solutions</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.sender === "me"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-indigo-200" : "text-gray-500"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex-shrink-0"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}