"use client";

import { useState } from "react";
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
import { contactAPI } from "@/lib/api";

const loanTypes = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Vehicle Loan",
  "Loan Against Property",
  "Education Loan",
];

const WHATSAPP_NUMBER = "919876543210"; // Replace with actual number
const PHONE_NUMBER = "+91 98765 43210"; // Replace with actual number

interface FormState {
  name: string;
  email: string;
  mobile: string;
  loanType: string;
  message: string;
}

interface MessageState {
  type: 'success' | 'error' | null;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    mobile: "",
    loanType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState<MessageState>({
    type: null,
    message: ""
  });

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
    setMessageState({ type: null, message: "" });

    try {
      const response = await contactAPI.submit({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        loanType: form.loanType,
        message: form.message,
      });

      if (response.data.success) {
        setMessageState({
          type: 'success',
          message: response.data.message
        });
        setSubmitted(true);
        // Reset form after 2 seconds
        setTimeout(() => {
          setForm({
            name: "",
            email: "",
            mobile: "",
            loanType: "",
            message: "",
          });
          setSubmitted(false);
          setMessageState({ type: null, message: "" });
        }, 3000);
      }
    } catch (error: any) {
      setMessageState({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit enquiry. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in a ${form.loanType || "loan"}. My name is ${form.name || "Customer"}, mobile: ${form.mobile || "N/A"}.`
  );

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-widest">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Get in Touch with Our Experts
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Fill the form below and our team will reach out within 30 minutes
            during business hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — Contact Info + Quick Buttons */}
          <div className="lg:w-2/5 flex flex-col gap-6">
            {/* Info Card */}
            <div className="bg-blue-700 rounded-2xl p-8 text-white">
              <h3 className="font-bold text-xl mb-6">Contact Information</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Office Address</p>
                    <p className="text-blue-200 text-sm mt-1">
                      123, Anna Salai, Chennai – 600 002, Tamil Nadu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                      className="text-cyan-300 text-sm mt-1 hover:underline"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a
                      href="mailto:info@realfinance.in"
                      className="text-cyan-300 text-sm mt-1 hover:underline"
                    >
                      info@realfinance.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Business Hours</p>
                    <p className="text-blue-200 text-sm mt-1">
                      Mon – Sat: 9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-4">
              {/* Buttons removed - now floating widget at bottom-right */}
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            {/* Success/Error Messages */}
            {messageState.type && (
              <div className={`mb-6 flex items-start gap-3 p-4 rounded-lg border-2 ${
                messageState.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {messageState.type === 'success' ? (
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={20} className="flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-sm">
                    {messageState.type === 'success' ? 'Success!' : 'Error!'}
                  </p>
                  <p className="text-sm mt-1">{messageState.message}</p>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <CheckCircle2 size={56} className="text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Thank You!
                </h3>
                <p className="text-gray-500 max-w-sm">
                  We&apos;ve received your enquiry. Our loan expert will contact
                  you within 30 minutes.
                </p>
                <button
                  onClick={() => {
                    setForm({
                      name: "",
                      email: "",
                      mobile: "",
                      loanType: "",
                      message: "",
                    });
                    setSubmitted(false);
                    setMessageState({ type: null, message: "" });
                  }}
                  className="mt-4 bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-gray-900 font-bold text-xl mb-1">
                  Request a Free Consultation
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-gray-700 text-sm font-medium"
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
                    placeholder="Enter your full name"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled={loading}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mobile"
                    className="text-gray-700 text-sm font-medium"
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
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="loanType"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Loan Type <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        disabled={loading}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                        aria-label="Loan type"
                      >
                        {form.loanType || "Select loan type"}
                        <ChevronDown size={16} className="ml-2 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-200 rounded-xl" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                      <DropdownMenuItem
                        onClick={() => handleLoanTypeSelect("")}
                        className="text-gray-700 cursor-pointer"
                      >
                        Select loan type
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {loanTypes.map((loanType) => (
                        <DropdownMenuItem
                          key={loanType}
                          onClick={() => handleLoanTypeSelect(loanType)}
                          className="text-gray-700 cursor-pointer flex items-center justify-between"
                        >
                          {loanType}
                          {form.loanType === loanType && (
                            <span className="text-blue-700 font-semibold">✓</span>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    disabled={loading}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements…"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors mt-1 text-base disabled:bg-blue-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Enquiry →</>
                  )}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By submitting, you agree to be contacted by our team. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
