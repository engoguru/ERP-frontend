import React from "react";
import {
  CheckCircle,
  Shield,
  User,
  AlertTriangle,
  RefreshCcw,
  Mail,
  FileText,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const sections = [
  {
    icon: <CheckCircle className="w-4 h-4 text-[#0F6E56]" />,
    title: "Acceptance of terms",
    content:
      "By using this website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.",
  },
  {
    icon: <Shield className="w-4 h-4 text-[#0F6E56]" />,
    title: "Use of the website",
    content:
      "You agree to use this website only for lawful purposes and not to violate the rights of others.",
  },
  {
    icon: <User className="w-4 h-4 text-[#0F6E56]" />,
    title: "User accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account and all activities that occur under it.",
  },
  {
    icon: <AlertTriangle className="w-4 h-4 text-[#0F6E56]" />,
    title: "Limitation of liability",
    content:
      "We are not responsible for any damages arising from the use of our website or services.",
  },
  {
    icon: <RefreshCcw className="w-4 h-4 text-[#0F6E56]" />,
    title: "Changes to terms",
    content:
      "We may update these Terms and Conditions at any time without prior notice. Continued use of our services constitutes acceptance.",
  },
];

function IconBox({ children }) {
  return (
    <div className="w-9 h-9 min-w-[36px] rounded-lg bg-[#E1F5EE] flex items-center justify-center">
      {children}
    </div>
  );
}

function Card({ icon, title, content, full }) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-3 ${
        full ? "col-span-1 sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <IconBox>{icon}</IconBox>
        <h2 className="text-sm font-medium text-gray-800">{title}</h2>
      </div>
      <div className="border-t border-gray-100" />
      <p className="text-sm text-gray-500 leading-relaxed">{content}</p>
    </div>
  );
}

function TermCondition() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 min-w-[48px] rounded-xl bg-[#E1F5EE] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0F6E56]" />
            </div>
            <div>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] mb-2">
                Legal
              </span>
              <h1 className="text-xl font-semibold text-gray-800 mb-1">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please read these terms carefully before using our services. By
                accessing our platform, you agree to be bound by the following
                conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {sections.map((s) => (
              <Card key={s.title} {...s} />
            ))}

            {/* Contact — full width */}
            <div className="col-span-1 sm:col-span-2 bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <IconBox>
                  <Mail className="w-4 h-4 text-[#0F6E56]" />
                </IconBox>
                <h2 className="text-sm font-medium text-gray-800">Contact us</h2>
              </div>
              <div className="border-t border-gray-100" />
              <p className="text-sm text-gray-500">
                If you have any questions about these Terms &amp; Conditions,
                feel free to reach out to our team.
              </p>
              <span className="inline-block text-sm font-medium text-[#0F6E56] bg-[#E1F5EE] px-3 py-1.5 rounded-lg w-fit">
                support@yourcompany.com
              </span>
            </div>

          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Last updated · 2025 · ERP Services
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default TermCondition;