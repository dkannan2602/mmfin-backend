"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Home,
  User,
  Briefcase,
  Car,
  Building2,
} from "lucide-react";

interface LoanType {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number }>;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  baseRate: number;
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
    baseRate: 8.5,
  },
  {
    id: "personal",
    name: "Personal Loan",
    icon: User,
    minAmount: 25000,
    maxAmount: 5000000,
    minTenure: 1,
    maxTenure: 7,
    baseRate: 10.99,
  },
  {
    id: "business",
    name: "Business Loan",
    icon: Briefcase,
    minAmount: 50000,
    maxAmount: 20000000,
    minTenure: 1,
    maxTenure: 10,
    baseRate: 9.99,
  },
  {
    id: "vehicle",
    name: "Vehicle Loan",
    icon: Car,
    minAmount: 50000,
    maxAmount: 2500000,
    minTenure: 1,
    maxTenure: 8,
    baseRate: 8.99,
  },
  {
    id: "property",
    name: "Loan Against Property",
    icon: Building2,
    minAmount: 100000,
    maxAmount: 10000000,
    minTenure: 1,
    maxTenure: 15,
    baseRate: 8.49,
  },
];

// Function to calculate dynamic interest rate based on loan amount and tenure
const calculateDynamicRate = (
  baseRate: number,
  loanAmount: number,
  maxAmount: number,
  tenure: number,
  maxTenure: number
): number => {
  let adjustedRate = baseRate;

  // Adjustment based on loan amount (lower amount = higher rate)
  const amountPercentage = loanAmount / maxAmount;
  if (amountPercentage < 0.3) {
    adjustedRate += 0.5; // +0.5% for smaller loans
  } else if (amountPercentage < 0.6) {
    adjustedRate += 0.25; // +0.25% for medium loans
  }
  // else no additional adjustment for larger loans

  // Adjustment based on tenure (longer tenure = higher rate)
  const tenurePercentage = tenure / maxTenure;
  if (tenurePercentage > 0.75) {
    adjustedRate += 0.3; // +0.3% for longer tenure
  } else if (tenurePercentage > 0.5) {
    adjustedRate += 0.15; // +0.15% for medium tenure
  }
  // else no additional adjustment for shorter tenure

  return Math.round(adjustedRate * 100) / 100; // Round to 2 decimals
};

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
  const [selectedLoanId, setSelectedLoanId] = useState<string>("home");
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [tenure, setTenure] = useState(5);

  const selectedLoan = loanTypes.find((l) => l.id === selectedLoanId)!;

  // Calculate dynamic interest rate based on amount, tenure, and loan type
  const interestRate = useMemo(() => {
    return calculateDynamicRate(
      selectedLoan.baseRate,
      loanAmount,
      selectedLoan.maxAmount,
      tenure,
      selectedLoan.maxTenure
    );
  }, [selectedLoan, loanAmount, tenure]);

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayable = emi * tenure * 12;
  const interestAmount = totalPayable - loanAmount;

  const handleLoanChange = useCallback((loanId: string) => {
    setSelectedLoanId(loanId);
    const loan = loanTypes.find((l) => l.id === loanId);
    if (loan) {
      // Reset sliders to middle values within new loan's range
      setLoanAmount(Math.round((loan.minAmount + loan.maxAmount) / 2));
      setTenure(Math.round((loan.minTenure + loan.maxTenure) / 2));
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Loan Type Radio Buttons */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Select Loan Type
              </label>
              <div className="space-y-3">
                {loanTypes.map((loan) => {
                  const LoanIcon = loan.icon;
                  return (
                    <label
                      key={loan.id}
                      className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                      style={{
                        borderColor:
                          selectedLoanId === loan.id ? "#2563eb" : undefined,
                        backgroundColor:
                          selectedLoanId === loan.id ? "#eff6ff" : undefined,
                      }}
                    >
                      <input
                        type="radio"
                        name="loan-type"
                        value={loan.id}
                        checked={selectedLoanId === loan.id}
                        onChange={() => handleLoanChange(loan.id)}
                        className="w-4 h-4 text-blue-700 cursor-pointer accent-blue-700"
                      />
                      <LoanIcon
                        size={20}
                        className="text-blue-700 ml-3 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-900 font-medium flex-1">
                        {loan.name}
                      </span>
                    </label>
                  );
                })}
              </div>
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

            {/* Interest Rate Display (Dynamic) */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Interest Rate (Adjusted)
                </span>
                <span className="text-lg font-bold text-blue-700">
                  {interestRate}% p.a.
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Based on {selectedLoan.name} (Base: {selectedLoan.baseRate}%)
              </p>
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
