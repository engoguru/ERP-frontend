import React from "react";
import {
  ShieldCheck,
  User,
  Database,
  Lock,
  Share2,
  Cookie,
  RefreshCcw,
  Mail,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-25 pb-5 bg-gradient-to-b from-green-50 to-white ">
       <div className=" max-w-5xl mx-auto px-4 bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <User className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-start">
                  Privacy Policy
                  </h1>
                  <p className="text-gray-600 leading-relaxed text-start">
                  We are committed to protecting your personal data and respecting
            your privacy.
                  </p>
                </div>
              </div>
            </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <User className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Introduction
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-start">
                    This Privacy Policy explains how <strong>CA Services</strong>{" "}
                    collects, uses, and protects your personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <Database className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Information We Collect
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 text-start">
                    <li>Name, email address, phone number</li>
                    <li>Business and service-related details</li>
                    <li>Technical data like IP address and browser type</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <ShieldCheck className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 text-start">
                    <li>Deliver professional services</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Improve website performance and user experience</li>
                    <li>Meet legal and regulatory requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <Lock className="w-6 h-6 text-[hsl(168_76%_42%)] " />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Data Security
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-start">
                    We apply industry-standard security measures to protect your
                    personal information from unauthorized access or misuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg text-start ">
                  <Share2 className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Information Sharing
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-start">
                    We never sell your data. Information may be shared only when
                    legally required or to deliver our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <Cookie className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Cookies
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-start">
                    Cookies help us analyze site traffic and improve usability.
                    You can disable cookies in your browser settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-start">
                  <RefreshCcw className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-start">
                    Policy Updates
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-start">
                    This policy may be updated periodically. Changes will be
                    reflected on this page.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <Mail className="w-6 h-6 text-[hsl(168_76%_42%)]" />
                </div>
                <div>
                  <h2 className="text-xl text-start font-semibold text-gray-800 mb-2">
                    Contact Us
                  </h2>
                  <p className="text-gray-600 text-start">
                    For questions about this Privacy Policy, contact us at:
                  </p>
                  <p className="mt-2 text-start font-medium text-gray-700">
                    support@caservices.com
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
