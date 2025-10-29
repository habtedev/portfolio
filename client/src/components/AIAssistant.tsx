"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Sparkles,
  Code,
  Briefcase,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import Markdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi there! I’m **Habtamu’s AI Consultant**.\n\nI can help you with:\n- 💻 Web design & development\n- 💰 Project pricing & planning\n- ⚙️ Technical stack advice\n\nWhat would you like to discuss today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();

  const quickQuestions = [
    { icon: Code, text: "What's your web development stack?" },
    { icon: Briefcase, text: "Can you build an e-commerce app?" },
    { icon: MessageCircle, text: "Explain your project workflow." },
    { icon: Phone, text: "How can I start a project with you?" },
  ];

  // ✅ Auto-scroll when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Listen for open/toggle/ESC events
  useEffect(() => {
    const open = () => setIsOpen(true);
    const toggle = () => setIsOpen((prev) => !prev);
    const closeOnEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);

    window.addEventListener("open-ai-assistant", open as EventListener);
    window.addEventListener("toggle-ai-assistant", toggle as EventListener);
    window.addEventListener("keydown", closeOnEsc as EventListener);

    return () => {
      window.removeEventListener("open-ai-assistant", open as EventListener);
      window.removeEventListener("toggle-ai-assistant", toggle as EventListener);
      window.removeEventListener("keydown", closeOnEsc as EventListener);
    };
  }, []);

  // ✅ Focus textarea when open
  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 150);
  }, [isOpen]);

  // ✅ Simulated AI response (calls backend /api/chat and shows a typing animation)
  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);

    // small debounce so UI feels natural
    await new Promise((r) => setTimeout(r, 400));

    try {
      const res = await fetch("http://localhost:8500/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error(`chat API error ${res.status}`);

      const data = await res.json();
      const reply = (data && data.reply) || "Sorry, I couldn't generate a response.";

      // Gradual "typing" effect for the reply
      const words = String(reply).split(" ");
      let displayed = "";
      for (const word of words) {
        displayed += word + " ";
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { ...prev[prev.length - 1], content: displayed },
        ]);
        // speed up a bit for longer replies
        await new Promise((r) => setTimeout(r, 20));
      }
    } catch (error) {
      console.error("AIAssistant: chat request failed", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], content: "⚠️ Network error — please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ Handle user message send
  const handleSend = async (msg?: string) => {
    const text = msg || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    const typingMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInput("");
    await simulateResponse(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-assistant-title"
        >
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Container */}
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl mx-4"
          >
            <Card className="h-[80vh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border border-white/10 shadow-2xl flex flex-col text-white rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Bot className="text-primary bg-white/10 p-2 rounded-full h-10 w-10" />
                  <h1 id="ai-assistant-title" className="text-xl font-semibold">
                    Habtamu’s <span className="text-primary">AI Consultant</span>
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "bg-white/10 border border-white/10 text-gray-200"
                      }`}
                    >
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-2 flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Questions */}
              <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/10">
                {quickQuestions.map((q) => (
                  <Button
                    key={q.text}
                    size="sm"
                    variant="secondary"
                    className="bg-white/10 text-gray-200 hover:bg-white/20 transition-all"
                    onClick={() => handleSend(q.text)}
                  >
                    <q.icon className="w-3.5 h-3.5 mr-1" />
                    {q.text}
                  </Button>
                ))}
              </div>

              {/* Input Field */}
              <div className="p-3 border-t border-white/10 bg-black/20 flex space-x-2">
                <Textarea
                  ref={(el) => (textareaRef.current = el)}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me about services, pricing, or tech..."
                  className="flex-1 resize-none bg-white/10 text-white placeholder:text-gray-400 border-white/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Send size={16} />
                </Button>
              </div>
            </Card>

            {/* Footer */}
            <div className="text-xs text-gray-400 text-center mt-3">
              Powered by <Sparkles className="inline-block w-3 h-3 text-primary" />{" "}
              Habtamu’s AI
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
