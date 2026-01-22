import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import heroBg from "../../assets/homebg.png";
// import FeatureCard from "../../components/ui/FeatureCard";
import FeatureCard from "../../components/ui/FeatureCard";
import Chatbot from "../../components/common/Chatbot";
import { motion } from "framer-motion";
import { Users, CalendarCheck, ClipboardList, Clock, Briefcase, BarChart2, Star } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Manage all employee profiles, roles, and departments effortlessly.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance & Leaves",
    description: "Track attendance, approve leaves, and monitor absences in real-time.",
  },
  {
    icon: ClipboardList,
    title: "Task Management",
    description: "Assign, track, and review employee tasks efficiently.",
  },
  {
    icon: Clock,
    title: "Payroll Automation",
    description: "Automate salary calculation, deductions, and payouts with precision.",
  },
  {
    icon: Briefcase,
    title: "HR Analytics",
    description: "Generate detailed reports and insights to make better HR decisions.",
  },
  {
    icon: BarChart2,
    title: "Performance Reviews",
    description: "Evaluate employee performance with easy-to-use review tools.",
  },
];

const stats = [
  { value: "500+", label: "Employees Managed" },
  { value: "200+", label: "Companies Served" },
  { value: "1M+", label: "Tasks Tracked" },
  { value: "99%", label: "HR Satisfaction" },
];

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "HR Manager",
    content:
      "This ERP platform transformed how we manage attendance, payroll, and employee data. Truly efficient and reliable.",
    rating: 5,
  },
  {
    name: "Anita Verma",
    role: "CEO",
    content:
      "From payroll to leave management, everything is seamless. The insights dashboard saves us hours every week.",
    rating: 5,
  },
  {
    name: "Karan Singh",
    role: "Operations Head",
    content:
      "Task assignment and monitoring is now completely hassle-free. The HR automation tools are top-notch.",
    rating: 5,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your HR <br />
              <span className="text-green-400">With Complete ERP Automation</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl">
              Payroll, attendance, leaves, tasks, and performance management – all in one platform for your company.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-green-400 hover:bg-green-500 rounded text-white font-semibold transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-green-400 rounded text-white hover:bg-green-400 hover:text-white transition"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 text-center"
          >
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-gray-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Core HR & ERP Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline all HR operations and empower your workforce with intelligent automation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white shadow-lg">
                <div className="flex gap-1 mb-4 justify-center">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-gray-700">"{t.content}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gray-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform HR?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Empower your HR team and streamline employee management like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-green-400 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border border-white rounded text-white hover:bg-white hover:text-green-400 transition"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </div>
  );
}

export default Home;
