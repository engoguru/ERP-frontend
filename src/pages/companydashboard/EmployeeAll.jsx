import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { Eye, Edit, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";

function EmployeeAll() {
  const disptach = useDispatch()
  const navigate = useNavigate();

  // Local state for search and filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const { employeeList, loading, error } = useSelector(
    (state) => state.reducer.employee
  );

  useEffect(() => {
    disptach(viewEmployees())
  }, []);

  // Filter employees based on search, role, and department
  const filteredEmployees = employeeList.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeEmail?.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter ? emp.role === roleFilter : true;
    const matchesDept = departmentFilter ? emp.department === departmentFilter : true;

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <CompanyLayout pageTitle={"All Employees"}>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold"></h2>

          {/* Add Employee Button */}
          <button
            onClick={() => navigate("/company/employe/create")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name, code, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />

          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-center py-4">Loading employees...</p>}
        {error && <p className="text-center py-4 text-red-500">{error}</p>}

        {/* Employee Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Emp Code</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{emp.name}</td>
                      <td className="px-4 py-2">{emp.employeeCode}</td>
                      <td className="px-4 py-2">{emp.department}</td>
                      <td className="px-4 py-2">{emp.role}</td>
                      <td className="px-4 py-2">{emp.employeeEmail?.email}</td>
                      <td className="px-4 py-2">{emp.employeeContact?.contact}</td>
                      <td className="px-4 py-2 capitalize">{emp.status}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                           <Link to={`/company/employe/profile/${emp._id}`}>
                          <Eye size={18} />
                                   </Link>
                        </button>
                        <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                         
                            <Edit size={18} />
                 
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}

export default EmployeeAll;
