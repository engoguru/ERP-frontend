import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { X, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewEmployeesProfile } from "../../../redux/slice/employee/employeeCreateSlice";

function PayrollHistory() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthFilter, setMonthFilter] = useState("");

  const { employeeProfile: employee, loading, error } = useSelector(
    (state) => state.reducer.employee
  );

  useEffect(() => {
    if (employeeId) {
      dispatch(viewEmployeesProfile(employeeId));
    }
  }, [dispatch, employeeId]);

  // Sample payroll data (replace with API later)
  const payrollHistory = [
    {
      month: "February 2026",
      payoutDate: "2026-02-28T00:00:00.000Z",
      netSalary: 47000,
      grossSalary: 52000,
      deductions: 5000,
      transfers: [
        { type: "Bank Transfer", amount: 47000, date: "2026-02-28T00:00:00.000Z" }
      ],
      leaves: [{ type: "Paid Leave", days: 0 }],
    },
    {
      month: "January 2026",
      payoutDate: "2026-01-31T00:00:00.000Z",
      netSalary: 45000,
      grossSalary: 50000,
      deductions: 5000,
      transfers: [
        { type: "Bank Transfer", amount: 45000, date: "2026-01-31T00:00:00.000Z" }
      ],
      leaves: [
        { type: "Paid Leave", days: 2 },
        { type: "Short Leave", days: 1 },
      ],
    },
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const filteredPayroll = monthFilter
    ? payrollHistory.filter((p) =>
        p.month.toLowerCase().includes(monthFilter.toLowerCase())
      )
    : payrollHistory;

  if (loading) {
    return (
      <CompanyLayout pageTitle="Payroll History">
        <p className="text-center py-10">Loading...</p>
      </CompanyLayout>
    );
  }
console.log(employee,"p")
  if (error) {
    return (
      <CompanyLayout pageTitle="Payroll History">
        <p className="text-center py-10 text-red-500">{error}</p>
      </CompanyLayout>
    );
  }

  if (!employee) return null;

  return (
    <CompanyLayout pageTitle="Payroll History">
      {/* ===== Employee Info ===== */}
      <div className="flex items-center gap-4 bg-white rounded-xl shadow p-6 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border">
          <img
            src={employee.profilePic.url || "/default-avatar.png"}
            alt={employee.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-500">Code: {employee.employeeCode}</p>
          <p className="text-gray-500">
            {employee.role} • {employee.department}
          </p>
        </div>

        <Link
          to={`/company/employe/profile/${employee._id}`}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          <Eye size={16} />
          View Profile
        </Link>
      </div>

      {/* ===== Filter ===== */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by month (e.g. January)"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm w-64"
        />
      </div>

      {/* ===== Payroll Table ===== */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Payout Date</th>
              <th className="px-4 py-3">Gross</th>
              <th className="px-4 py-3">Net</th>
              <th className="px-4 py-3">Deductions</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayroll.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No payroll history found
                </td>
              </tr>
            ) : (
              filteredPayroll.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedMonth(item)}
                >
                  <td className="px-4 py-3 font-medium">{item.month}</td>
                  <td className="px-4 py-3">{formatDate(item.payoutDate)}</td>
                  <td className="px-4 py-3">₹{item.grossSalary}</td>
                  <td className="px-4 py-3">₹{item.netSalary}</td>
                  <td className="px-4 py-3">₹{item.deductions}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMonth(item);
                      }}
                      className="text-emerald-600 font-medium"
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

      {/* ===== Modal ===== */}
      {selectedMonth && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedMonth(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {selectedMonth.month} Details
            </h3>

            <h4 className="font-semibold mb-2">Transactions</h4>
            <table className="w-full text-sm mb-4 border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonth.transfers.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2">{t.type}</td>
                    <td className="px-3 py-2">₹{t.amount}</td>
                    <td className="px-3 py-2">{formatDate(t.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="font-semibold mb-2">Leaves</h4>
            <ul className="list-disc list-inside text-sm">
              {selectedMonth.leaves.map((l, i) => (
                <li key={i}>
                  {l.type}: {l.days} day(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
}

export default PayrollHistory;
