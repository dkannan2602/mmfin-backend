"use client";

import { useState, useCallback } from "react";
import {
  Home,
  User,
  Briefcase,
  Car,
  Building2,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LoanType {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number }>;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
}

const loanTypes: LoanType[] = [
  {
    id: "home",
    name: "Home Loan",
    icon: Home,
    minAmount: 100000,
    maxAmount: 50000000,
    minTenure: 1,
    maxTenure: 30,
    minRate: 7.5,
    maxRate: 10.5,
    defaultRate: 8.5,
  },
  {
    id: "personal",
    name: "Personal Loan",
    icon: User,
    minAmount: 25000,
    maxAmount: 5000000,
    minTenure: 1,
    maxTenure: 7,
    minRate: 9.99,
    maxRate: 14.99,
    defaultRate: 10.99,
  },
  {
    id: "business",
    name: "Business Loan",
    icon: Briefcase,
    minAmount: 50000,
    maxAmount: 20000000,
    minTenure: 1,
    maxTenure: 10,
    minRate: 8.99,
    maxRate: 12.99,
    defaultRate: 9.99,
  },
  {
    id: "vehicle",
    name: "Vehicle Loan",
    icon: Car,
    minAmount: 50000,
    maxAmount: 2500000,
    minTenure: 1,
    maxTenure: 8,
    minRate: 7.99,
    maxRate: 10.99,
    defaultRate: 8.99,
  },
  {
    id: "property",
    name: "Loan Against Property",
    icon: Building2,
    minAmount: 100000,
    maxAmount: 10000000,
    minTenure: 1,
    maxTenure: 15,
    minRate: 7.49,
    maxRate: 9.99,
    defaultRate: 8.49,
  },
];

const calculateEMI = (principal: number, rate: number, tenure: number) => {
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  
  if (monthlyRate === 0) {
    return Math.round(principal / months);
  }
  
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(emi);
};

export default function EMICalculator() {
  const [selectedLoan, setSelectedLoan] = useState<LoanType>(loanTypes[0]);
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(selectedLoan.defaultRate);

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayable = emi * tenure * 12;
  const interestAmount = totalPayable - loanAmount;

  const handleLoanChange = useCallback((loanId: string) => {
    const loan = loanTypes.find((l) => l.id === loanId);
    if (loan) {
      setSelectedLoan(loan);
      // Reset sliders to middle values within new loan's range
      setLoanAmount(
        Math.round((loan.minAmount + loan.maxAmount) / 2)
      );
      setTenure(
        Math.round((loan.minTenure + loan.maxTenure) / 2)
      );
      setInterestRate(loan.defaultRate);
    }
  }, []);

  const CurrentIcon = selectedLoan.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-widest">
            Financial Planning
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            EMI Calculator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Calculate your monthly EMI based on loan amount, tenure, and interest rate.
            Plan your finances with ease.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-0">
          {/* Left: Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
          {/* Loan Type Selector - Form Field */}
          <div className="mb-8 relative z-40">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Loan Type <span className="text-red-500">*</span>
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-left text-gray-900 font-medium flex items-center justify-between hover:border-blue-400 active:border-blue-600 transition-colors focus:outline-none focus:border-blue-600"
                >
                  <div className="flex items-center gap-3">
                    <CurrentIcon size={20} className="text-blue-700" />
                    <span>{selectedLoan.name}</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {loanTypes.map((loan) => {
                  const LoanIcon = loan.icon;
                  return (
                    <DropdownMenuItem
                      key={loan.id}
                      onClick={() => handleLoanChange(loan.id)}
                    >
                      <LoanIcon size={18} className="text-blue-700 flex-shrink-0" />
                      <span>{loan.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

            {/* Loan Amount Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Loan Amount
                </label>
                <span className="text-lg font-bold text-blue-700">
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={selectedLoan.minAmount}
                max={selectedLoan.maxAmount}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>
                  ₹ {selectedLoan.minAmount.toLocaleString("en-IN")}
                </span>
                <span>
                  ₹ {selectedLoan.maxAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Loan Tenure
                </label>
                <span className="text-lg font-bold text-blue-700">
                  {tenure} {tenure === 1 ? "year" : "years"}
                </span>
              </div>
              <input
                type="range"
                min={selectedLoan.minTenure}
                max={selectedLoan.maxTenure}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{selectedLoan.minTenure} year</span>
                <span>{selectedLoan.maxTenure} years</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Interest Rate
                </label>
                <span className="text-lg font-bold text-blue-700">
                  {interestRate.toFixed(2)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={selectedLoan.minRate}
                max={selectedLoan.maxRate}
                value={interestRate}
                step={0.01}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{selectedLoan.minRate.toFixed(2)}%</span>
                <span>{selectedLoan.maxRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Right: Result Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
            {/* Monthly EMI */}
            <div className="mb-8">
              <p className="text-sm font-medium text-blue-100 mb-2">
                Your Monthly EMI will be
              </p>
              <div className="text-5xl font-bold mb-1">
                ₹ {emi.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-blue-100">
                *Interest rate is subject to change based on RBI guidelines
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 pt-6 border-t border-blue-400">
              <div className="flex justify-between items-center">
                <span className="text-blue-100 font-medium">Amount Payable</span>
                <span className="text-lg font-bold">
                  ₹ {totalPayable.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100 font-medium">Interest Amount</span>
                <span className="text-lg font-bold">
                  ₹ {interestAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-400">
                <span className="text-blue-100 font-medium">Principal Amount</span>
                <span className="text-lg font-bold">
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Apply Now Button */}
            <button className="w-full mt-8 bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md">
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
