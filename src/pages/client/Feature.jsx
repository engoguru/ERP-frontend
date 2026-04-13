import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";

function Feature() {
  const features = [
    {
      title: "Fast Performance",
      desc: "Optimized for speed and smooth user experience across all devices.",
    },
    {
      title: "Modern UI",
      desc: "Clean and responsive design built with modern UI principles.",
    },
    {
      title: "Secure System",
      desc: "Your data is protected with industry-standard security practices.",
    },
    {
      title: "Easy Integration",
      desc: "Easily integrate with your existing workflow and tools.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#063f2cf2] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-10 opaacity-80">
          Powerful Features Built for You
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-60">
          Everything you need to build fast, scalable, and modern applications
          in one place.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 bg-gradient-to-r from-yellow-900 to-blue-600 rounded-2xl shadow hover:shadow-lg transition duration-300 border"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b py-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4 opacity-90">Ready to get started... ?</h2>
        <p className="text-gray-600 mb-6 opacity-70">
          Build something amazing with these features today.
        </p>
        <Link to={"/contact"} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition opacity-80">
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Feature;