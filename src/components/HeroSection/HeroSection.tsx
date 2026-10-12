import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden"
    >
      {/* Background decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Trusted Loan Consultants
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Dream Home <br />
            <span className="text-cyan-300">Starts with the</span> <br />
            Right Loan
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Fast approvals, low interest rates, and expert guidance for Home
            Loans, Personal Loans, Business Loans & more. We make financing
            simple.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="bg-cyan-400 text-blue-900 font-bold px-8 py-4 rounded-full text-base hover:bg-cyan-300 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              Apply for a Loan
              <ArrowRight size={18} />
            </a>
            <a
              href="#services"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white hover:text-blue-800 transition-colors"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { value: "5000+", label: "Loans Processed" },
              { value: "98%", label: "Approval Rate" },
              { value: "10+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-cyan-300">
                  {stat.value}
                </p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card Visual */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <h3 className="text-white font-bold text-xl mb-6">
              Quick Loan Check
            </h3>
            <div className="flex flex-col gap-4">
              <select className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-4 py-3 text-sm placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <option value="" className="text-gray-800">
                  Select Loan Type
                </option>
                <option value="home" className="text-gray-800">
                  Home Loan
                </option>
                <option value="personal" className="text-gray-800">
                  Personal Loan
                </option>
                <option value="business" className="text-gray-800">
                  Business Loan
                </option>
                <option value="vehicle" className="text-gray-800">
                  Vehicle Loan
                </option>
                <option value="lap" className="text-gray-800">
                  Loan Against Property
                </option>
              </select>
              <input
                type="tel"
                placeholder="Your Mobile Number"
                className="w-full bg-white/10 border border-white/30 text-white placeholder-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <a
                href="#contact"
                className="bg-cyan-400 text-blue-900 font-bold px-6 py-3 rounded-xl text-sm text-center hover:bg-cyan-300 transition-colors"
              >
                Get Free Consultation
              </a>
            </div>
            <p className="text-blue-200 text-xs text-center mt-4">
              No hidden charges · Fast response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
