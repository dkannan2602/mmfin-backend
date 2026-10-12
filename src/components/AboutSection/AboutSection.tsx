import { Building2, Zap, Shield, Headphones, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Visual */}
          <div className="flex-1 relative flex justify-center">
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-linear-to-br from-blue-700 to-cyan-400 flex items-center justify-center shadow-2xl">
              <div className="text-center text-white px-8">
                <div className="text-7xl mb-4">🏡</div>
                <p className="text-2xl font-bold">10+ Years</p>
                <p className="text-blue-100 text-sm mt-1">
                  Serving customers with trust
                </p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={24} className="text-cyan-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">RBI Approved</p>
                <p className="text-gray-500 text-xs">Trusted Partners</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-6 leading-tight">
              We Help You Secure the <br />
              <span className="text-blue-700">Best Loan Deals</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              RealFinance is a leading loan consultancy firm helping individuals
              and businesses across Tamil Nadu get the right financial solutions.
              We work with top banks and NBFCs to get you the best interest
              rates with minimal paperwork and quick approvals.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Whether it&apos;s your first home, expanding your business, or
              funding a vehicle — we guide you every step of the way with
              transparent processes and zero hidden charges.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Building2, title: "20+ Bank Partners" },
                { icon: Zap, title: "Fast Approvals" },
                { icon: Shield, title: "Secure & Trusted" },
                { icon: Headphones, title: "24/7 Support" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <item.icon size={20} className="text-blue-700" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
