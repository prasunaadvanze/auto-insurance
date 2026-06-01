import { Shield, Lock, Award, HeartHandshake } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Shield, label: "A-rated carrier" },
  { icon: Lock, label: "256-bit encryption" },
  { icon: Award, label: "15+ years trusted" },
  { icon: HeartHandshake, label: "24/7 claims support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60 mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 p-3"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-slate-600">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
          <p>
            © {new Date().getFullYear()} GAINSCO Insurance · Demo application
            for illustration purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
