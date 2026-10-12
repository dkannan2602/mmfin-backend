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
            opacity: 1;
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
            transform: scale(1.05);
          }
        }

        .wave-animation::before,
        .wave-animation::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid currentColor;
          border-radius: 50%;
          animation: wave 1.5s ease-out infinite;
        }

        .wave-animation::before {
          width: 100%;
          height: 100%;
          animation-delay: 0s;
        }

        .wave-animation::after {
          width: 100%;
          height: 100%;
          animation-delay: 0.5s;
        }

        .whatsapp-float {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Wave animation circles */}
        <div className="absolute inset-0 wave-animation text-green-500 opacity-75" />

        {/* Main button */}
        <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 whatsapp-float">
          <BrandWhatsapp size={32} stroke="2" />
        </div>

        {/* Tooltip */}
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          Chat with us
        </span>
      </a>
    </>
  );
}
