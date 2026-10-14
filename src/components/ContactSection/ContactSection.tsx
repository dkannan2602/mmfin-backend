"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { contactAPI, settingsAPI } from "@/lib/api";

const loanTypes = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Vehicle Loan",
  "Loan Against Property",
  "Education Loan",
];

interface FormState {
  name: string;
  mobile: string;
  loanType: string;
  message: string;
}

interface MessageState {
  type: 'success' | 'error' | null;
  message: string;
}

interface ContactInfo {
  officeAddress: string;
  phone: string;
  email: string;
  businessHours: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    loanType: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    officeAddress: '123, Anna Salai, Chennai – 600 002, Tamil Nadu',
    phone: '+91 98765 43210',
    email: 'info@realfinance.in',
    businessHours: 'Mon – Sat: 9:00 AM – 7:00 PM'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState<MessageState>({
    type: null,
    message: ""
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setContactInfo(response.data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoanTypeSelect = (loanType: string) => {
    setForm({ ...form, loanType });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await contactAPI.submit({
        name: form.name,
        mobile: form.mobile,
        loanType: form.loanType,
        message: form.message,
      });

      if (response.data.success) {
        setMessageState({
          type: 'success',
          message: response.data.message
        });
        setShowModal(true);
        setForm({
          name: "",
          mobile: "",
          loanType: "",
          message: "",
        });
        
        // Auto-close modal after 5 seconds
        setTimeout(() => {
          setShowModal(false);
          setMessageState({ type: null, message: "" });
        }, 5000);
      }
    } catch (error: any) {
      setMessageState({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit enquiry. Please try again.'
      });
      setShowModal(true);
      
      // Auto-close error modal after 4 seconds
      setTimeout(() => {
        setShowModal(false);
        setMessageState({ type: null, message: "" });
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions? Our team is here to help. Fill the form or reach out directly.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left — Contact Info Card */}
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 text-white">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-10">Contact Information</h3>
            
            <div className="space-y-8">
              {/* Office Address */}
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">Office Address</h4>
                  <p className="text-blue-100 text-sm">
                    {contactInfo.officeAddress}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">Phone</h4>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="text-blue-100 text-sm hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">Email</h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-100 text-sm hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">Business Hours</h4>
                  <p className="text-blue-100 text-sm">
                    {contactInfo.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                Request a Free Consultation
              </h3>

              {/* Full Name & Mobile Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mobile"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    disabled={loading}
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    pattern="[0-9+\s]{10,15}"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Loan Type */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="loanType"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      disabled={loading}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                      aria-label="Loan type"
                    >
                      {form.loanType || "Select loan type"}
                      <ChevronDown size={16} className="ml-2 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                    <DropdownMenuItem
                      onClick={() => handleLoanTypeSelect("")}
                      className="text-gray-700 cursor-pointer text-sm"
                    >
                      Select loan type
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {loanTypes.map((loanType) => (
                      <DropdownMenuItem
                        key={loanType}
                        onClick={() => handleLoanTypeSelect(loanType)}
                        className="text-gray-700 cursor-pointer flex items-center justify-between text-sm"
                      >
                        {loanType}
                        {form.loanType === loanType && (
                          <span className="text-blue-600 font-semibold">✓</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  disabled={loading}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements…"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Enquiry →</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 ${
            messageState.type === 'success' ? 'scale-100' : 'scale-100'
          }`}>
            {messageState.type === 'success' ? (
              <>
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                    <div className="relative bg-green-50 p-4 rounded-full">
                      <CheckCircle2 size={48} className="text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Success Title */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  Thank You!
                </h3>

                {/* Success Message */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {messageState.message || "Your enquiry has been submitted successfully. Our team will contact you shortly."}
                </p>

                {/* Success Details */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-700 text-sm text-center font-medium">
                    ✓ We've received your enquiry
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setMessageState({ type: null, message: "" });
                  }}
                  className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Got it
                </button>
              </>
            ) : (
              <>
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
                    <div className="relative bg-red-50 p-4 rounded-full">
                      <AlertCircle size={48} className="text-red-600" />
                    </div>
                  </div>
                </div>

                {/* Error Title */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  Oops!
                </h3>

                {/* Error Message */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {messageState.message || "Something went wrong. Please try again later."}
                </p>

                {/* Error Details */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 text-sm text-center font-medium">
                    ✗ Please check your details and try again
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setMessageState({ type: null, message: "" });
                  }}
                  className="w-full bg-red-600 text-white font-semibold py-2.5 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
