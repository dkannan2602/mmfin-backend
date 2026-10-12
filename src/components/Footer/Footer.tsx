"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Home Loan", href: "#services" },
    { label: "Personal Loan", href: "#services" },
    { label: "Business Loan", href: "#services" },
    { label: "Vehicle Loan", href: "#services" },
    { label: "Loan Against Property", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "How It Works", href: "#" },
    { label: "Why Choose Us", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#contact" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RE</span>
              </div>
              <span className="text-white font-bold text-xl">RealFinance</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for all loan requirements. We connect
              customers with the best lenders across India.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <social.icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} RealFinance. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Designed & developed for our customers
          </p>
        </div>
      </div>
    </footer>
  );
}
