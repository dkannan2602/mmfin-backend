"use client";

import { BrandWhatsapp } from "tabler-icons-react";

const WHATSAPP_NUMBER = "919876543210"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in learning more about RealFinance loan options. Can you help me?"
);

export default function WhatsAppWidget() {
  return (
    <>
      {/* Wave Animation Styles */}
      <style>{`
        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .wave-ring {
          position: absolute;
          width: 64px;
          height: 64px;
          border: 2px solid #22c55e;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .wave-ring:nth-child(1) {
          animation: wave 2s ease-out infinite;
          animation-delay: 0s;
        }

        .wave-ring:nth-child(2) {
          animation: wave 2s ease-out infinite;
          animation-delay: 0.7s;
        }

        .whatsapp-float {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-40 group">
        {/* Wave animation rings */}
        <div className="absolute inset-0 w-16 h-16 rounded-full">
          <div className="wave-ring" />
          <div className="wave-ring" />
        </div>

        {/* Main button with icon */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 whatsapp-float"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <BrandWhatsapp size={28} stroke="2" />
        </a>

        {/* Tooltip */}
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          Chat with us
        </span>
      </div>
    </>
  );
}
