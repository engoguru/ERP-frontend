import React from "react";
import { File } from "lucide-react";

function AttendanceProfile({ shiftDetail }) {
  if (!shiftDetail) return <p className="text-gray-500">No attendance data found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Shift Name" value={shiftDetail.shiftName} icon={<File size={18} />} />
      <StatCard title="Start Time" value={shiftDetail.startTime} icon={<File size={18} />} />
      <StatCard title="End Time" value={shiftDetail.endTime} icon={<File size={18} />} />
    </div>
  );
}

/* StatCard component for consistency */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow-xl shadow-emerald-800/40 hover:shadow-md transition flex items-center gap-3">
    {icon && <div className="text-emerald-900">{icon}</div>}
    <div>
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xl font-bold text-emerald-900">{value ?? "—"}</p>
    </div>
  </div>
);

export default AttendanceProfile;
