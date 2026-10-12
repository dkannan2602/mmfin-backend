const reasons = [
  {
    icon: "🤝",
    title: "Trusted Consultants",
    description:
      "Over 10 years of experience connecting customers with the best lenders. We are a name you can rely on.",
  },
  {
    icon: "⚡",
    title: "Fast Approvals",
    description:
      "Our streamlined process ensures loan approvals within 48–72 hours so you never miss an opportunity.",
  },
  {
    icon: "💰",
    title: "Best Interest Rates",
    description:
      "We negotiate on your behalf with 20+ bank partners to get you the most competitive rates in the market.",
  },
  {
    icon: "📋",
    title: "Minimal Documentation",
    description:
      "Simplified paperwork and digital document submission. We handle the complexity so you don't have to.",
  },
  {
    icon: "🎯",
    title: "Personalised Guidance",
    description:
      "Every customer is unique. Our experts study your profile and recommend the best loan product for you.",
  },
  {
    icon: "🔒",
    title: "100% Transparent",
    description:
      "No hidden charges. No surprises. Every step of the loan process is clearly explained to you upfront.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            The RealFinance Advantage
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-base">
            We don&apos;t just process loans — we build long-term relationships
            based on trust, transparency, and results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-cyan-400/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                {reason.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3">
                {reason.title}
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
