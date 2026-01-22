import React from "react";
import { ClipboardCheck } from "lucide-react";

function LeavesProfile({ balanceLeave }) {
  if (!balanceLeave?.numberOfLeaves) {
    return <p className="text-gray-500">No leave data available.</p>;
  }

  const { paidLeave, shortLeave, halfDay, roundMark } = balanceLeave.numberOfLeaves;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Paid Leaves" value={paidLeave} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Short Leaves" value={shortLeave} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Half Day Leaves" value={halfDay} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Round Mark Leaves" value={roundMark} icon={<ClipboardCheck size={18} />} />
    </div>
  );
}

/* Reusable StatCard component for this module */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-3">
    {icon && <div className="text-emerald-600">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-emerald-600">{value ?? 0}</p>
    </div>
  </div>
);

export default LeavesProfile;
