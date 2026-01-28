import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Calendar, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewAttendance } from "../../../redux/slice/employee/attendanceSlice";

/* ================= UTIL ================= */
const calculateHours = (inTime, outTime) => {
  if (!inTime || !outTime || inTime === "-" || outTime === "-") return "-";

  const [inH, inM] = inTime.split(":").map(Number);
  const [outH, outM] = outTime.split(":").map(Number);

  const inMinutes = inH * 60 + inM;
  const outMinutes = outH * 60 + outM;

  if (outMinutes <= inMinutes) return "-";

  return ((outMinutes - inMinutes) / 60).toFixed(2);
};

function AttendanceHistory() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState(null);

  const { attendanceSummary = [], loading } = useSelector(
    (state) => state.reducer.attendance
  );

  /* ================= FETCH ATTENDANCE ================= */
  useEffect(() => {
    const year = selectedMonth
      ? selectedMonth.split("-")[0]
      : new Date().getFullYear();

    dispatch(viewAttendance({ employeeId, year }));
  }, [dispatch, employeeId, selectedMonth]);

  /* ================= VIEW MONTH ================= */
  const handleViewMonth = (monthYear) => {
    const data = attendanceSummary.find((m) => m.monthYear === monthYear);
    setActiveMonth(data || null);
    setModalOpen(true);
  };

  return (
    <CompanyLayout pageTitle="Attendance History">
      <div className="mx-auto max-w-6xl p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Employee Attendance History
          </h2>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* MONTH SUMMARY TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Company WD</th>
                <th className="px-4 py-3">Employee WD</th>
                <th className="px-4 py-3">Fixed Off</th>
                <th className="px-4 py-3">Fest Off</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center">Loading...</td>
                </tr>
              ) : attendanceSummary.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    No attendance data
                  </td>
                </tr>
              ) : (
                attendanceSummary.map((m) => (
                  <tr key={m.monthYear} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{m.monthYear}</td>
                    <td className="px-4 py-3">{m.totalCompanyWorkingDays}</td>
                    <td className="px-4 py-3">{m.totalEmployeeWorkingDays}</td>
                    <td className="px-4 py-3">{m.totalFixedOff}</td>
                    <td className="px-4 py-3">{m.totalFestOff}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewMonth(m.monthYear)}
                        className="bg-emerald-600 text-white px-3 py-1 rounded-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {modalOpen && activeMonth && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white max-w-4xl w-full rounded-xl p-5 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar size={20} />
                {activeMonth.monthYear}
              </h3>

              {/* SUMMARY */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div>Paid: <b>{activeMonth.totalPaidLeaves || 0}</b></div>
                <div>Unpaid: <b>{activeMonth.totalUnpaidLeaves || 0}</b></div>
                <div>Half Day: <b>{activeMonth.totalHalfDays || 0}</b></div>
                <div>Round: <b>{activeMonth.roundMark || 0}</b></div>
              </div>

              {/* DAY TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-1">Date</th>
                      <th className="px-4 py-1">In</th>
                      <th className="px-4 py-1">Out</th>
                      <th className="px-4 py-1">Hours</th>
                      <th className="px-4 py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMonth.attendance.map((d, i) => {
                      const hours = calculateHours(d.inTime, d.outTime);
                      return (
                        <tr key={i} className="border-t hover:bg-red-400">
                          <td className="px-4 py-1">
                            {new Date(d.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-1">{d.inTime || "-"}</td>
                          <td className="px-4 py-1">{d.outTime || "-"}</td>
                          <td
                            className={`px-4 py-1 font-medium ${hours !== "-" && hours < 8.5
                                ? "text-red-600"
                                : ""
                              }`}
                          >
                            {hours}
                          </td>
                          <td className=" font-semibold "> <span className="bg-green-600  px-3 py-0.5 text-white">{d.status}</span></td>
                        </tr>
                      );
                    })}
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
