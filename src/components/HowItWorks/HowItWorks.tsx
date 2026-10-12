const steps = [
  {
    step: "01",
    icon: "📝",
    title: "Fill the Application",
    description:
      "Complete our simple online form with your basic details and loan requirements. Takes less than 2 minutes.",
  },
  {
    step: "02",
    icon: "📞",
    title: "Expert Consultation",
    description:
      "Our loan expert contacts you, reviews your profile, and recommends the best loan options available for you.",
  },
  {
    step: "03",
    icon: "📄",
    title: "Document Submission",
    description:
      "Submit your documents digitally or at our office. We help you prepare and verify everything needed.",
  },
  {
    step: "04",
    icon: "✅",
    title: "Loan Approval",
    description:
      "We coordinate with the bank for fast processing. Most loans get approved within 48–72 working hours.",
  },
  {
    step: "05",
    icon: "💸",
    title: "Disbursement",
    description:
      "Once approved, the loan amount is directly disbursed to your account or the seller/vendor as required.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Get Your Loan in 5 Simple Steps
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            We&apos;ve simplified the loan process so you can focus on your
            goals, not the paperwork.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="w-20 h-20 rounded-full bg-blue-700 flex flex-col items-center justify-center shadow-lg mb-5 flex-shrink-0">
                  <span className="text-cyan-300 text-xs font-bold">
                    {step.step}
                  </span>
                  <span className="text-2xl leading-none">{step.icon}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="bg-blue-700 text-white font-bold px-10 py-4 rounded-full text-base hover:bg-blue-800 transition-colors shadow-lg inline-block"
          >
            Start Your Application →
          </a>
        </div>
      </div>
    </section>
  );
}
