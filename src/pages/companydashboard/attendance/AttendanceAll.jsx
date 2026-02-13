import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";

function AttendanceAll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Redux state
  const { employeeList, loading } = useSelector(
    (state) => state.reducer.employee
  );
  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
  }, [dispatch, initialized]);

  useEffect(() => {
    dispatch(viewEmployees());
  }, [dispatch]);

  const permissionArray = employeeData?.permissionArray || [];
  const isAdmin = employeeData?.role === "Admin";

  // Filter employees based on search input
  const filteredEmployees = employeeList?.filter((emp) =>
    [emp.name, emp.employeeCode, emp.status, emp.department, emp.role]
      .some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
  ) || [];

  return (
    <CompanyLayout pageTitle="Attendance Records">
      <div className="mx-auto max-w-6xl p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Employees Attendance</h2>
        </div>

        {/* Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
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

        {/* Employees Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 text-start">Emp Code</th>
                <th className="px-4 py-3 text-start">Name</th>
                <th className="px-4 py-3 text-start">Status</th>
                <th className="px-4 py-3 text-start">Department</th>
                <th className="px-4 py-3 text-start">Role</th>
                <th className="px-4 py-3 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50 text-start">
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
                        {(isAdmin || permissionArray.includes("atnView")) && (
                          <Link
                            to={`/company/attendance/history/${emp._id}`}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <Eye size={16} />
                          </Link>
                        )}
                        {(isAdmin || permissionArray.includes("atnEdit")) && (
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                          </button>
                        )}
                        {(isAdmin || permissionArray.includes("atnDelete")) && (
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        )}
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
