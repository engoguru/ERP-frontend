import React from "react";
import {
  Shield,
  Info,
  Database,
  Lock,
  Share2,
  RefreshCcw,
  Mail,
  Activity,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const sections = [
  {
    icon: <Info className="w-4 h-4 text-[#0F6E56]" />,
    title: "Introduction",
    full: true,
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        This Privacy Policy explains how{" "}
        <span className="font-medium text-gray-700">ERP Services</span> collects,
        uses, and protects your personal information when you use our platform or
        engage with our team.
      </p>
    ),
  },
  {
    icon: <Database className="w-4 h-4 text-[#0F6E56]" />,
    title: "Information we collect",
    content: (
      <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
        <li>Name, email address, phone number</li>
        <li>Business and service-related details</li>
        <li>Technical data like IP address and browser type</li>
      </ul>
    ),
  },
  {
    icon: <Activity className="w-4 h-4 text-[#0F6E56]" />,
    title: "How we use your information",
    content: (
      <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
        <li>Deliver professional services</li>
        <li>Respond to inquiries and support requests</li>
        <li>Improve website performance</li>
        <li>Meet legal and regulatory requirements</li>
      </ul>
    ),
  },
  {
    icon: <Lock className="w-4 h-4 text-[#0F6E56]" />,
    title: "Data security",
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        We apply industry-standard security measures to protect your personal
        information from unauthorized access, disclosure, or misuse.
      </p>
    ),
  },
  {
    icon: <Share2 className="w-4 h-4 text-[#0F6E56]" />,
    title: "Information sharing",
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        We never sell your data. Information may be shared only when legally
        required or strictly necessary to deliver our services.
      </p>
    ),
  },
  {
    icon: <Shield className="w-4 h-4 text-[#0F6E56]" />,
    title: "Cookies",
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        Cookies help us analyze site traffic and improve usability. You can
        disable cookies at any time through your browser settings.
      </p>
    ),
  },
  {
    icon: <RefreshCcw className="w-4 h-4 text-[#0F6E56]" />,
    title: "Policy updates",
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        This policy may be updated periodically. Any changes will be reflected
        on this page with the latest revision date.
      </p>
    ),
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
        full ? "col-span-2 sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <IconBox>{icon}</IconBox>
        <h2 className="text-sm font-medium text-gray-800">{title}</h2>
      </div>
      <div className="border-t border-gray-100" />
      {content}
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 min-w-[48px] rounded-xl bg-[#E1F5EE] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0F6E56]" />
            </div>
            <div>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] mb-2">
                Legal
              </span>
              <h1 className="text-xl font-semibold text-gray-800 mb-1">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are committed to protecting your personal data and respecting
                your privacy. This document explains what we collect, how we use
                it, and your rights.
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
                For any questions about this Privacy Policy, reach out to our
                team directly.
              </p>
              <span className="inline-block text-sm font-medium text-[#0F6E56] bg-[#E1F5EE] px-3 py-1.5 rounded-lg w-fit">
                support@caservices.com
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

export default PrivacyPolicy;