import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Eye, Edit, Trash2, Search } from "lucide-react";

function AttendanceAll() {
  const navigate = useNavigate();

  // Sample static employee data
  const [employees] = useState([
    {
      id: "696b8040d55b7f619f918bf6",
      employeeCode: "EMP001",
      name: "John Doe",
      status: "Active",
      department: "Finance",
      role: "Accountant",
    },
    {
      id: "796b8040d55b7f619f918bf7",
      employeeCode: "EMP002",
      name: "Jane Smith",
      status: "Inactive",
      department: "HR",
      role: "Manager",
    },
    {
      id: "896b8040d55b7f619f918bf8",
      employeeCode: "EMP003",
      name: "Alice Johnson",
      status: "Active",
      department: "IT",
      role: "Developer",
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
    emp.status.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CompanyLayout pageTitle="Attendance Records">
      <div className="mx-auto max-w-6xl p-6">

        {/* ===== Header & Create Button ===== */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Employees Attendance</h2>
        </div>

        {/* ===== Filter/Search ===== */}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow md:grid-cols-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, emp code, status, dept, role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* ===== Employees Table ===== */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Emp Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{emp.employeeCode}</td>
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.role}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                        //   to={`/company/employe/profile/${emp.id}`}
                        to={`/company/attendance/history`}
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <Eye size={16} />
                        </Link>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default AttendanceAll;
