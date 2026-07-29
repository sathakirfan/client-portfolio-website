'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { aiKnowledgeBase } from '@/lib/data';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIAssistantBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am Mohamed Safthar\'s AI Assistant. Ask me anything about his warehouse experience, 100+ driver fleet dispatch, visa status, or technical credentials.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate response from AI Knowledge Base
    setTimeout(() => {
      let botResponse = 'Thank you for your question. Mohamed Safthar is immediately available in Dubai, UAE for Warehouse Operations & In-Charge leadership positions. Contact him directly at +971 52 388 9542.';

      const lower = userText.toLowerCase();

      if (lower.includes('experience') || lower.includes('company') || lower.includes('work')) {
        botResponse = aiKnowledgeBase.experience;
      } else if (lower.includes('shipment') || lower.includes('bank') || lower.includes('document') || lower.includes('daily')) {
        botResponse = aiKnowledgeBase.shipments;
      } else if (lower.includes('driver') || lower.includes('fleet') || lower.includes('courier')) {
        botResponse = aiKnowledgeBase.fleet;
      } else if (lower.includes('skill') || lower.includes('excel') || lower.includes('wms') || lower.includes('system')) {
        botResponse = aiKnowledgeBase.skills;
      } else if (lower.includes('visa') || lower.includes('passport') || lower.includes('available') || lower.includes('joining')) {
        botResponse = aiKnowledgeBase.visa;
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('whatsapp')) {
        botResponse = aiKnowledgeBase.contact;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white shadow-2xl flex items-center justify-center border border-[#F8D66D] dark:border-[#4F8CFF]"
        title="Chat with Mohamed Safthar AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 stroke-[2.5]" />}
      </motion.button>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-sm sm:max-w-md h-[500px] saas-card flex flex-col overflow-hidden bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] shadow-2xl"
          >
            {/* Chat Header */}
            <div className="p-4 bg-[#FFFDF7] dark:bg-[#0A1025] border-b border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                    SAFTHAR AI ASSISTANT
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  </h4>
                  <p className="text-[10px] font-mono text-[#555555] dark:text-[#CBD5E1]">Dubai Warehouse Knowledge Base</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#555555] hover:text-[#1A1A1A] dark:text-[#CBD5E1] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFFFFF] dark:bg-[#050816]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#F5C242] text-[#1A1A1A] font-bold dark:bg-[#3B82F6] dark:text-white rounded-br-none'
                        : 'bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] font-mono opacity-60 mt-1 block text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#FFFDF7] dark:bg-[#0A1025] border-t border-[#F2E6C9] dark:border-[#283454] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, fleet, visa..."
                className="flex-1 saas-input px-3.5 text-xs"
              />
              <button
                type="submit"
                className="saas-button-luxury h-10 px-3 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
