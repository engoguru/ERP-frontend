import React, { useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Calendar, X } from "lucide-react";

function AttendanceHistory() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [monthSummary, setMonthSummary] = useState({});

  // Sample month-wise data
  const attendanceData = [
    {
      month: "2026-01",
      summary: {
        totalWorkingDays: 20,
        absent: 2,
        fixedOff: 4,
        event: 1,
        paidLeave: 1,
        unpaidLeave: 1,
        roundMark: 0,
        halfDay: 1,
      },
      records: [
        { date: "2026-01-01", inTime: "09:00", outTime: "17:00", hours: 8, status: "Present" },
        { date: "2026-01-02", inTime: "09:15", outTime: "17:00", hours: 7.75, status: "Present" },
        { date: "2026-01-03", inTime: "-", outTime: "-", hours: 0, status: "Absent" },
        { date: "2026-01-04", inTime: "09:05", outTime: "17:10", hours: 8.08, status: "Present" },
        { date: "2026-01-05", inTime: "09:00", outTime: "14:00", hours: 5, status: "Half-Day" },
        { date: "2026-01-06", inTime: "-", outTime: "-", hours: 0, status: "Event" },
      ],
    },
    {
      month: "2025-12",
      summary: {
        totalWorkingDays: 18,
        absent: 1,
        fixedOff: 4,
        event: 0,
        paidLeave: 0,
        unpaidLeave: 1,
        roundMark: 0,
        halfDay: 0,
      },
      records: [
        { date: "2025-12-28", inTime: "09:00", outTime: "17:00", hours: 8, status: "Present" },
        { date: "2025-12-29", inTime: "-", outTime: "-", hours: 0, status: "Absent" },
      ],
    },
  ];

  const handleViewMonth = (month) => {
    const monthData = attendanceData.find((m) => m.month === month);
    if (monthData) {
      setAttendanceDetails(monthData.records);
      setMonthSummary(monthData.summary);
    } else {
      setAttendanceDetails([]);
      setMonthSummary({});
    }
    setModalOpen(true);
  };

  return (
    <CompanyLayout pageTitle="Attendance History">
      <div className="mx-auto max-w-6xl p-6 space-y-6">

        {/* ===== Month Filter / View Button ===== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Employee Attendance History</h2>

          <div className="flex gap-2 items-center">
            <label className="text-gray-600 font-medium">Select Month:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={() => handleViewMonth(selectedMonth)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              View
            </button>
          </div>
        </div>

        {/* ===== Month-wise Table ===== */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Working Days</th>
                <th className="px-4 py-3">Absent</th>
                <th className="px-4 py-3">Fixed Off</th>
                <th className="px-4 py-3">Event Days</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((month) => (
                <tr key={month.month} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{month.month}</td>
                  <td className="px-4 py-3">{month.summary.totalWorkingDays}</td>
                  <td className="px-4 py-3">{month.summary.absent}</td>
                  <td className="px-4 py-3">{month.summary.fixedOff}</td>
                  <td className="px-4 py-3">{month.summary.event}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewMonth(month.month)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Modal for Day-wise Details ===== */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-full max-w-4xl rounded-xl p-6 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              {/* Top Summary */}
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={20} /> Attendance Details
              </h3>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-700">
                <div>Total Absent: <span className="font-semibold">{monthSummary.absent}</span></div>
                <div>Paid Leave: <span className="font-semibold">{monthSummary.paidLeave}</span></div>
                <div>Unpaid Leave: <span className="font-semibold">{monthSummary.unpaidLeave}</span></div>
                <div>Half Day: <span className="font-semibold">{monthSummary.halfDay}</span></div>
                <div>Round Mark: <span className="font-semibold">{monthSummary.roundMark}</span></div>
                <div>Event Days: <span className="font-semibold">{monthSummary.event}</span></div>
              </div>

              {/* Day-wise Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm text-gray-700">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">In Time</th>
                      <th className="px-4 py-3">Out Time</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Hours Worked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceDetails.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                          No data for this month
                        </td>
                      </tr>
                    ) : (
                      attendanceDetails.map((day, idx) => (
                        <tr key={idx} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3">{day.date}</td>
                          <td className="px-4 py-3">{day.inTime}</td>
                          <td className="px-4 py-3">{day.outTime}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                day.status === "Present"
                                  ? "bg-green-100 text-green-800"
                                  : day.status === "Half-Day"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : day.status === "Event"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {day.status}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 font-medium ${
                              day.hours < 8.5 && day.status === "Present"
                                ? "text-red-600"
                                : "text-gray-800"
                            }`}
                          >
                            {day.hours}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}

export default AttendanceHistory;
