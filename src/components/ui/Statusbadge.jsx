import React from "react";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-300",
  },
  paid: {
    label: "Paid",
    className: "bg-purple-100 text-purple-700 border-purple-300",
  },
  Urgent:{
    label: "Urgent",
    className: "bg-red-100 text-white-700 border-red-300",
  }
};

function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

export default StatusBadge;
