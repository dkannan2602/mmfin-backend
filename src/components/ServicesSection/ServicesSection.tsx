import {
  Home,
  User,
  Briefcase,
  Car,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Loan",
    description:
      "Buy your dream home with attractive interest rates, flexible tenure up to 30 years, and minimal documentation.",
    features: ["Up to ₹5 Crore", "8.5% Interest p.a.", "30 Year Tenure"],
    image: "/Image/services/home.jpg",
    badge: "Most Popular",
  },
  {
    icon: User,
    title: "Personal Loan",
    description:
      "Instant personal loans for medical emergencies, travel, education, or any personal need — no collateral required.",
    features: ["Up to ₹50 Lakhs", "Quick Disbursal", "No Collateral"],
    image: "/Image/services/personal.jpg",
    badge: null,
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    description:
      "Grow your business with our tailored business loan solutions. Working capital, equipment finance, and more.",
    features: ["Up to ₹2 Crore", "Flexible EMI", "Minimal Docs"],
    image: "/Image/services/business.jpg",
    badge: null,
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    description:
      "Finance your new car or two-wheeler with competitive rates and easy EMI options across all major brands.",
    features: ["Car & Bike Loans", "90% Financing", "Quick Approval"],
    image: "/Image/services/vehicle.jpg",
    badge: null,
  },
  {
    icon: Building2,
    title: "Loan Against Property",
    description:
      "Unlock the value of your property. Get loans against residential or commercial properties at low interest rates.",
    features: ["Up to 70% LTV", "Low Interest", "Long Tenure"],
    image: "/Image/services/property.jpg",
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
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group border-2 border-gray-200"
            >
              {/* Card Image */}
              <div
                className="relative h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 overflow-hidden"
                style={{
                  backgroundImage: `url("${service.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {service.badge && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full z-20">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Title with Underline */}
                <h3 className="text-lg font-bold text-blue-900 mb-4 underline">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features as Styled Points */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-blue-500 text-sm font-medium p-2 bg-blue-100 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
