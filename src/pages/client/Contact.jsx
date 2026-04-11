import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const topics = [
  "General inquiry",
  "ERP consulting",
  "Support",
  "Get a quote",
  "Partnership",
];

const contactInfo = [
  {
    icon: <Phone className="w-3.5 h-3.5 text-[#0F6E56]" />,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: <Mail className="w-3.5 h-3.5 text-[#0F6E56]" />,
    label: "Email",
    value: "support@caservices.com",
  },
  {
    icon: <MapPin className="w-3.5 h-3.5 text-[#0F6E56]" />,
    label: "Office",
    value: "New Delhi, India",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 am – 6:00 pm" },
  { day: "Saturday", time: "10:00 am – 2:00 pm" },
  { day: "Sunday", time: "Closed" },
];

function IconBox({ children, size = "sm" }) {
  const dim = size === "lg" ? "w-12 h-12 min-w-[48px]" : "w-8 h-8 min-w-[32px]";
  return (
    <div
      className={`${dim} rounded-lg bg-[#E1F5EE] flex items-center justify-center`}
    >
      {children}
    </div>
  );
}

function Contact() {
  const [activeTopic, setActiveTopic] = useState("General inquiry");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ topic: activeTopic, ...form });
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-green-100 to-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[oklch(0.84_0.04_115.91_/_0.32)] border border-gray-300 rounded-xl p-6">
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#E1F5EE] text-[#085041] mb-4">
              Get in touch
            </span>
            <div className="flex items-start gap-4 rounded-xl">
              <IconBox size="lg">
                <MessageCircle className="w-5 h-5 text-[#0F6E56]" />
              </IconBox>
              <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                  Contact us
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                  Have a question, need a quote, or want to explore how ERP
                  Services can help your business? Fill out the form or reach us
                  directly — our team typically responds within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-3 items-start">

            {/* Left — Info */}
            <div className="flex flex-col gap-3">

              {/* Contact details */}
              <div className="bg-white border border-gray-400 rounded-xl p-5">
                <h3 className="text-sm border-b border-gray-400 py-2 font-medium text-gray-800 mb-4">
                  Reach us directly
                </h3>
                <div className="flex flex-col gap-3">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <IconBox>{item.icon}</IconBox>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-left text-gray-400">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-4 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#085041] bg-[#E1F5EE] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                    Available · Mon–Fri, 9am–6pm IST
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white  border border-gray-400 rounded-xl p-5">
                <h3 className="text-sm border-b border-gray-400 py-2 font-medium text-gray-800 mb-4">
                  Business hours
                </h3>
                <div className="flex flex-col gap-0">
                  {hours.map((h, i) => (
                    <div
                      key={h.day}
                      className={`flex justify-between text-xs py-2.5 ${
                        i < hours.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <span className="text-gray-500">{h.day}</span>
                      <span className="font-medium text-gray-800">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-white  border border-gray-400 rounded-xl p-5">
                <h3 className="text-sm border-b border-gray-400 py-2 font-semibold text-gray-800 mb-2">
                  Follow us
                </h3>
                <p className="text-xs font-medium text-gray-600 leading-relaxed mb-3">
                  Stay updated with news, tips, and service updates.
                </p>
                <div className="flex gap-2">
                  {[
                    <Linkedin className="w-3.5 h-3.5 text-green-800" />,
                    <Twitter className="w-3.5 h-3.5 text-green-800" />,
                    <Instagram className="w-3.5 h-3.5 text-green-800" />,
                  ].map((icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white  border border-gray-400 rounded-xl p-6">
              <h3 className="text-sm border-b border-gray-400 py-2 font-medium text-gray-800 mb-5">
                Send us a message
              </h3>

              {/* Topic selector */}
              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  What can we help you with?
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTopic(t)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        activeTopic === t
                          ? "bg-[#E1F5EE] border-[#5DCAA5] text-[#085041]"
                          : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name row */} 
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      First name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Last name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Phone number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                    />
                  </div>
                </div>

                {/* Company + Size */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Company size
                    </label>
                    <select
                      name="companySize"
                      value={form.companySize}
                      onChange={handleChange}
                      className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 focus:outline-none focus:border-[#0F6E56]"
                    >
                      <option value="">Select size</option>
                      <option>1–10 employees</option>
                      <option>11–50 employees</option>
                      <option>51–200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief subject line"
                    className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about your needs or question..."
                    className="text-sm px-3 py-2 rounded-lg border border-gray-400 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#0F6E56] resize-none"
                  />
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#0F6E56] text-white text-sm font-medium hover:bg-[#085041] transition-colors"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>

          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            We respect your privacy · Your data will never be shared or sold
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;