'use client';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919986000100";
  const message = encodeURIComponent("Hello, I need assistance regarding local issues/schemes.");

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* 1. The Chat Box (Visible when toggled) */}
      {isOpen && (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 w-[320px] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#000080] p-6 text-white relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 hover:bg-white/10 p-1 rounded-full"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-bold mb-1 uppercase tracking-tight">Support Team</h3>
            <p className="text-blue-100 text-xs">Ravi Sir's Office is online</p>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Namaste! If you have any issues or need help with Government Schemes, chat with our team on WhatsApp now.
            </p>
            <a 
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#20ba59] transition-colors shadow-lg active:scale-95"
            >
              <MessageCircle size={20} fill="white" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* 2. The Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#000080] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        {/* Pulse Animation */}
        {!isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#000080] opacity-20"></span>
        )}
        
        {isOpen ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" />}
        
        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-20 whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            Any issues? Chat now
          </span>
        )}
      </button>
    </div>
  );
}