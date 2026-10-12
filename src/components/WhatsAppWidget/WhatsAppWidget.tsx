"use client";

import { BrandWhatsapp } from "tabler-icons-react";

const WHATSAPP_NUMBER = "919876543210"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in learning more about RealFinance loan options. Can you help me?"
);

export default function WhatsAppWidget() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <BrandWhatsapp size={28} />
      <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
