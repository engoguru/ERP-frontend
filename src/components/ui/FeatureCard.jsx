// src/components/ui/FeatureCard.jsx
import React from "react";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-green-100 text-green-500">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
