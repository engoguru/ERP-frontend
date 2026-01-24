import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f1f3a] w-full text-white">
      <div className="max-w-[1280px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[hsl(168_76%_42%)] flex items-center justify-center">
                <span className="text-xl font-bold text-white">ERP</span>
              </div>
              <span className="text-xl font-bold text-white">HR Solutions</span>
            </Link>

            <p className="text-sm text-gray-300">
              Simplify employee management, payroll, attendance, tasks, and performance – all in one intelligent ERP platform.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-green-500 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Features</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "Verify YOurSelf",
                "Attendance & Leaves",
                "Payroll Automation",
                "Task Management",
                "Performance Reviews"
              ].map((feature) => (
                <li key={feature}>
                  <Link
                    to="/company/verify"
                    className="hover:text-green-400 transition-colors"
                  >
                    {feature}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                { name: "Dashboard", path: "/dashboard" },
                { name: "Pricing", path: "/pricing" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[hsl(168_76%_42%)] mt-0.5" />
                <span>123 ERP Street, Tech Park, Bangalore 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[hsl(168_76%_42%)]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[hsl(168_76%_42%)]" />
                <span>support@erpsolutions.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ERP Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
