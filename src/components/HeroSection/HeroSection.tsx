"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { quickAPI } from "@/lib/api";

export default function HeroSection() {
  const [selectedLoan, setSelectedLoan] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{type:'success'|'error', msg:string}|null>(null);

  const loanTypes = [
    "Home Loan",
    "Personal Loan",
    "Business Loan",
    "Vehicle Loan",
    "Loan Against Property",
    "Education Loan",
  ];

  // Auto-dismiss toast after 4000ms
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async () => {
    // Validate both fields are filled
    if (!selectedLoan || !mobileNumber) {
      setToast({ type: 'error', msg: 'Please select a loan type and enter your mobile number.' });
      return;
    }

    // Validate mobile format
    if (!/^[0-9+\s]{10,15}$/.test(mobileNumber.trim())) {
      setToast({ type: 'error', msg: 'Please enter a valid 10-15 digit mobile number.' });
      return;
    }

    setSubmitting(true);
    try {
      await quickAPI.submit({
        loanType: selectedLoan,
        mobileNumber: mobileNumber.trim(),
      });
      setToast({ type: 'success', msg: 'Thank you! Our team will contact you soon.' });
      setSelectedLoan('');
      setMobileNumber('');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Submission failed. Please try again.';
      setToast({ type: 'error', msg: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Trusted Loan Consultants
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Dream Home <br />
              <span className="text-cyan-300">Starts with the</span> <br />
              Right Loan
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Fast approvals, low interest rates, and expert guidance for Home
              Loans, Personal Loans, Business Loans & more. We make financing
              simple.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mb-8">
              {[
                { value: "5000+", label: "Loans Processed" },
                { value: "98%", label: "Approval Rate" },
                { value: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold text-cyan-300">
                    {stat.value}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Quick Loan Check Form Card */}
          <div className="w-full lg:w-1/2 lg:max-w-md">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-gray-900 font-bold text-2xl mb-6">
                Quick Loan Check
              </h3>
              <div className="flex flex-col gap-4">
                {/* Loan Type Dropdown */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Loan Type
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors flex items-center justify-between">
                        {selectedLoan || "Select Loan Type"}
                        <ChevronDown size={16} className="ml-2 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                      {loanTypes.map((loanType) => (
                        <DropdownMenuItem
                          key={loanType}
                          onClick={() => setSelectedLoan(loanType)}
                          className="text-gray-900 cursor-pointer flex items-center justify-between"
                        >
                          {loanType}
                          {selectedLoan === loanType && (
                            <span className="text-blue-600">✓</span>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-blue-600 text-white font-bold px-6 py-4 rounded-xl text-base text-center hover:bg-blue-700 transition-colors mt-2 w-full disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Get Free Consultation'}
                </button>

                {/* Toast UI */}
                {toast && (
                  <div className={`text-sm text-center px-3 py-2 rounded-lg ${
                    toast.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {toast.msg}
                  </div>
                )}
              </div>

              {/* Footer Text */}
              <p className="text-gray-600 text-xs text-center mt-4">
                No hidden charges · Fast response · Instant approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
