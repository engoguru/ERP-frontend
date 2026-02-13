import React from "react";
import { ClipboardCheck } from "lucide-react";

function LeavesProfile({ balanceLeave }) {
  if (!balanceLeave) {
    return <p className="text-gray-500">No leave data available.</p>;
  }

  const monthlyPolicy = balanceLeave?.monthlyPolicy;
  const weeklyOff = balanceLeave?.weeklyOff;

  return (
    <>
      {/* Weekly Off Section */}
      <div className="bg-white p-5 rounded-xl shadow-lg shadow-emerald-800/40 mb-6">
        <h3 className="text-md font-semibold border-b-2 border-emerald-800 text-gray-900 mb-2">
          Weekly Off - ({weeklyOff?.count ?? 0})
        </h3>

        <div className="flex flex-wrap gap-2">
          {weeklyOff?.days?.length > 0 ? (
            weeklyOff.days.map((day, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-emerald-900 text-white text-sm rounded-full"
              >
                {day}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No weekly offs assigned</p>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Paid Leaves"
          value={monthlyPolicy?.paidLeaveDays}
          icon={<ClipboardCheck size={18} />}
        />

        <StatCard
          title="Short Leaves"
          value={monthlyPolicy?.shortLeaveCount}
          icon={<ClipboardCheck size={18} />}
        />

        <StatCard
          title="Half Day Leaves"
          value={monthlyPolicy?.halfDayCount}
          icon={<ClipboardCheck size={18} />}
        />

        <StatCard
          title={`Round Mark Leaves (Grace: ${
            monthlyPolicy?.roundMarkMinutes ?? 0
          } mins)`}
          value={monthlyPolicy?.roundMarkCount}
          icon={<ClipboardCheck size={18} />}
        />
      </div>
    </>
  );
}

/* Reusable StatCard component */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl shadow-lg shadow-emerald-800/40 hover:shadow-md transition flex items-center gap-2">
    {icon && <div className="text-emerald-900">{icon}</div>}
    <div>
      <p className="text-xs font-medium text-gray-900">{title}</p>
      <p className="text-2xl font-bold text-emerald-900">{value ?? 0}</p>
    </div>
  </div>
);

export default LeavesProfile;
