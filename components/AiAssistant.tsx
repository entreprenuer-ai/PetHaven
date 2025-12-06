import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { chatWithPetAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m your PetHaven AI assistant. Looking for a puppy or need advice on food?', timestamp: Date.now() }
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

    // Format history for Gemini SDK
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithPetAssistant(history, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="bg-white pointer-events-auto rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px] transition-all duration-300 transform origin-bottom-right">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Pet Assistant AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-teal-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about pets..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-teal-500 transition"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 disabled:opacity-50 transition shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 group"
      >
        <MessageCircle size={24} />
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-medium">Chat with AI</span>}
      </button>
    </div>
  );
};

export default AiAssistant;
