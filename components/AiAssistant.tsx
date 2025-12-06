import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, User } from 'lucide-react';
import { chatWithPetAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I\'m your personal PetHaven concierge. How can I assist you today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithPetAssistant(history, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl w-[360px] sm:w-[420px] mb-6 overflow-hidden border border-white/50 flex flex-col h-[650px] animate-float origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 p-6 text-white flex justify-between items-center relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Bot size={24} />
              </div>
              <div>
                <span className="font-serif font-bold text-lg block">Concierge</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium tracking-wide"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Active Now</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition relative z-10">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-[1.5rem] rounded-tr-none' 
                    : 'bg-white text-stone-700 border border-stone-100 rounded-[1.5rem] rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100 flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-stone-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-emerald-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:scale-95 transition-all shadow-lg active:scale-90"
            >
              <Send size={20} className={loading ? 'opacity-0' : 'opacity-100'} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2 group border-4 border-white ${
          isOpen ? 'bg-stone-800 rotate-90 scale-0 opacity-0' : 'bg-stone-900 text-white scale-100 opacity-100'
        }`}
      >
        <Sparkles size={28} />
      </button>
    </div>
  );
};

export default AiAssistant;