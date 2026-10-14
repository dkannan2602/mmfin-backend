import {
  Home,
  User,
  Briefcase,
  Car,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Loan",
    description:
      "Buy your dream home with attractive interest rates, flexible tenure up to 30 years, and minimal documentation.",
    features: ["Up to ₹5 Crore", "8.5% Interest p.a.", "30 Year Tenure"],
    color: "from-blue-500 to-blue-700",
    badge: "Most Popular",
  },
  {
    icon: User,
    title: "Personal Loan",
    description:
      "Instant personal loans for medical emergencies, travel, education, or any personal need — no collateral required.",
    features: ["Up to ₹50 Lakhs", "Quick Disbursal", "No Collateral"],
    color: "from-purple-500 to-purple-700",
    badge: null,
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    description:
      "Grow your business with our tailored business loan solutions. Working capital, equipment finance, and more.",
    features: ["Up to ₹2 Crore", "Flexible EMI", "Minimal Docs"],
    color: "from-green-500 to-green-700",
    badge: null,
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    description:
      "Finance your new car or two-wheeler with competitive rates and easy EMI options across all major brands.",
    features: ["Car & Bike Loans", "90% Financing", "Quick Approval"],
    color: "from-orange-500 to-orange-700",
    badge: null,
  },
  {
    icon: Building2,
    title: "Loan Against Property",
    description:
      "Unlock the value of your property. Get loans against residential or commercial properties at low interest rates.",
    features: ["Up to 70% LTV", "Low Interest", "Long Tenure"],
    color: "from-cyan-500 to-cyan-700",
    badge: null,
  },
  {
    icon: BookOpen,
    title: "Education Loan",
    description:
      "Invest in your future. We help students secure education loans for top colleges in India and abroad.",
    features: ["Domestic & Abroad", "Moratorium Period", "Tax Benefits"],
    color: "from-pink-500 to-pink-700",
    badge: null,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Loan Solutions for Every Need
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            From home loans to business finance, we offer a complete range of
            loan products tailored to your requirements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-br ${service.color} p-6 relative`}
              >
                <div className="text-white mb-2">
                  <service.icon size={40} />
                </div>
                <h3 className="text-white font-bold text-xl">{service.title}</h3>
                {service.badge && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full gap-2 bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
