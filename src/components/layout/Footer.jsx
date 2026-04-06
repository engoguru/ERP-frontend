// import { Link } from "react-router-dom";
// import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#0f1f3a] w-full text-white">
//       <div className="max-w-[1280px] mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

//           {/* Company Info */}
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-xl bg-[hsl(168_76%_42%)] flex items-center justify-center">
//                 <span className="text-xl font-bold text-white">ERP</span>
//               </div>
//               <span className="text-xl font-bold text-white">HR Solutions</span>
//             </Link>

//             <p className="text-sm text-gray-300">
//               Simplify employee management, payroll, attendance, tasks, and performance – all in one intelligent ERP platform.
//             </p>

//             <div className="flex gap-3">
//               {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="p-2 rounded-lg bg-white/10 hover:bg-green-500 hover:text-white transition-colors"
//                 >
//                   <Icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Features */}
//           <div>
//             <h4 className="font-semibold text-lg mb-4 text-white">Features</h4>
//             <ul className="space-y-3 text-sm text-gray-300">
//               {[
//                 "Verify YOurSelf",
//                 "Attendance & Leaves",
//                 "Payroll Automation",
//                 "Task Management",
//                 "Performance Reviews"
//               ].map((feature) => (
//                 <li key={feature}>
//                   <Link
//                     to="/company/verify"
//                     className="hover:text-green-400 transition-colors"
//                   >
//                     {feature}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-3 text-sm text-gray-300">
//               {[
//                 { name: "Dashboard", path: "/dashboard" },
//                 { name: "Pricing", path: "/pricing" },
//                 { name: "Contact", path: "/contact" },
//                 { name: "Privacy Policy", path: "/privacy-policy" },
//                 { name: "Terms of Service", path: "/terms" },
//               ].map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="hover:text-green-400 transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
//             <ul className="space-y-4 text-sm text-gray-300">
//               <li className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-[hsl(168_76%_42%)] mt-0.5" />
//                 <span>123 ERP Street, Laxmi Nagar, Delhi 110092</span>
//               </li>
//               <li className="flex items-center gap-3">  
//                 <Phone className="w-5 h-5 text-[hsl(168_76%_42%)]" />
//                 <span>+91 99104 01351</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-[hsl(168_76%_42%)]" />
//                 <span>support@erpsolutions.com</span>
//               </li>
//             </ul>     
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
//           © {new Date().getFullYear()} ERP Solutions. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] w-full text-white relative overflow-hidden">

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60" />

      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-10 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand Column ── */}
          <div className="space-y-5 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <span className="text-sm font-extrabold text-white tracking-tight">ERP</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                HR Solutions
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Simplify employee management, payroll, attendance, tasks, and performance – all in one intelligent ERP platform.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 pt-1">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Features ── */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-5">
              Features
            </h4>
            <ul className="space-y-3">
              {[
                "Verify Yourself",
                "Attendance & Leaves",
                "Payroll Automation",
                "Task Management",
                "Performance Reviews",
              ].map((feature) => (
                <li key={feature}>
                  <Link
                    to="/company/verify"
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {feature}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
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
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-400 leading-relaxed">
                  123 ERP Street, Laxmi Nagar,<br />Delhi 110092
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <a href="tel:+919910401351" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +91 99104 01351
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <a href="mailto:support@erpsolutions.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  support@erpsolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Newsletter Strip ── */}
        <div className="mt-14 rounded-2xl bg-white/5 border border-white/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Stay in the loop</p>
            <p className="text-xs text-slate-400 mt-0.5">Get product updates & HR tips directly to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 sm:w-56 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            <button className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition duration-150 shrink-0">
              Subscribe <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ERP Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span className="opacity-30">·</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span className="opacity-30">·</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;