import React, { useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { CreditCard, Calendar, User, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";

function PayrollHistory() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthFilter, setMonthFilter] = useState("");

  // Sample employee info
  const employee = {
    id: "696b8040d55b7f619f918bf6",
    name: "John Doe",
    employeeCode: "EMP0001",
    department: "Finance",
    role: "Accountant",
    profilePic: "/default-avatar.png",
  };

  // Sample payroll history (latest first)
  const payrollHistory = [
    {
      month: "February 2026",
      payoutDate: "2026-02-28",
      netSalary: 47000,
      grossSalary: 52000,
      deductions: 5000,
      transfers: [{ type: "Bank Transfer", amount: 47000, date: "2026-02-28" }],
      leaves: [{ type: "Paid Leave", days: 0 }],
    },
    {
      month: "January 2026",
      payoutDate: "2026-01-31",
      netSalary: 45000,
      grossSalary: 50000,
      deductions: 5000,
      transfers: [
        { type: "Bank Transfer", amount: 45000, date: "2026-01-31" },
      ],
      leaves: [
        { type: "Paid Leave", days: 2 },
        { type: "Short Leave", days: 1 },
      ],
    },
  ];

  // Filter payroll by month if selected
  const filteredPayroll = monthFilter
    ? payrollHistory.filter((p) =>
        p.month.toLowerCase().includes(monthFilter.toLowerCase())
      )
    : payrollHistory;

  return (
    <CompanyLayout pageTitle="Payroll History">
      {/* ===== Employee Info ===== */}
      <div className="flex items-center gap-4 bg-white rounded-xl shadow p-6 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={employee.profilePic}
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

        {/* View Profile Button */}
        <Link
          to={`/company/employe/profile/${employee.id}`}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium"
        >
          <Eye size={16} /> View Profile
        </Link>
      </div>

      {/* ===== Month Filter ===== */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Filter by month (e.g., February)"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ===== Payroll Table ===== */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Payout Date</th>
              <th className="px-4 py-3">Gross Salary</th>
              <th className="px-4 py-3">Net Salary</th>
              <th className="px-4 py-3">Deductions</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayroll.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
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
                  <td className="px-4 py-3">{item.payoutDate}</td>
                  <td className="px-4 py-3">{item.grossSalary}</td>
                  <td className="px-4 py-3">{item.netSalary}</td>
                  <td className="px-4 py-3">{item.deductions}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Modal for Selected Month ===== */}
      {selectedMonth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedMonth(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedMonth.month} Details</h3>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Transactions</h4>
              <table className="w-full text-sm text-left border border-gray-200 rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 border-b">Type</th>
                    <th className="px-3 py-2 border-b">Amount</th>
                    <th className="px-3 py-2 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMonth.transfers.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b">{t.type}</td>
                      <td className="px-3 py-2 border-b">{t.amount}</td>
                      <td className="px-3 py-2 border-b">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Leaves</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {selectedMonth.leaves.map((l, i) => (
                  <li key={i}>
                    {l.type}: {l.days} day(s)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
}

export default PayrollHistory;
