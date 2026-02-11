import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { Eye, Edit, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";
import { companyConfiguresView, companyDetailData } from "../../redux/slice/companySlice";

function EmployeeAll() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // Local state for search and filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const { employeeList, loading, error } = useSelector(
    (state) => state.reducer.employee
  );
  const { companyConfigureViewData } = useSelector((state) => state?.reducer?.company);


  useEffect(() => {
    dispatch(companyConfiguresView());
    // companyConfiguresView
  }, [dispatch]);
  // Prefill with existing leadForm data

  useEffect(() => {
    dispatch(viewEmployees())
  }, []);
  // Fetch company data

  // Grab state
  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  console.log(companyConfigureViewData, departmentFilter, "hg")
  const permissionArray = employeeData?.permissionArray
  const isAdmin = employeeData?.role === "Admin";
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
          {(isAdmin || permissionArray.includes("empCreate")) && (<button
            onClick={() => navigate("/company/employe/create")}
            className="flex items-center text-md gap-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={15} /> Add Employee
          </button>)}


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

          <div className="flex gap-4 text-sm font-bold">

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="" className="font-semibold">All Departments</option>
              {companyConfigureViewData?.data?.roles.map((dept) => (
                <option key={dept._id} value={dept.department}>{dept.department}</option>
              ))}

            </select>

            {departmentFilter && (
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All Roles</option>

                {companyConfigureViewData?.data?.roles
                  ?.find((dept) => dept.department === departmentFilter)
                  ?.roles?.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
              </select>
            )}




          </div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-center py-4">Loading employees...</p>}
        {error && <p className="text-center py-4 text-red-500">{error}</p>}

        {/* Employee Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full  border-collapse text-start">
              <thead>
                <tr className="bg-blue-500 text-white ">
                  {/* <th className="px-4 py-2">Name</th> */}
                  <th className="px-2 text-start py-2">Name</th>
                  <th className="px-2 text-start py-2">Emp Code</th>
                  <th className="px-2 text-start py-2">Department</th>
                  <th className="px-2 text-start py-2">Role</th>
                  <th className="px-2 text-start py-2">Email</th>
                  <th className="px-2 text-start py-2">Contact</th>
                  <th className="px-2 text-start py-2">Status</th>
                  <th className="px-2 text-start py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="border-b hover:bg-gray-50">
                      <td className="px-2 py-2 text-xs font-medium">{emp.name}</td>
                      <td className="px-2 py-2 text-xs font-medium">{emp.employeeCode}</td>
                      <td className="px-2 py-2 text-xs font-medium">{emp.department}</td>
                      <td className="px-2 py-2 text-xs font-medium" >{emp.role}</td>
                      <td className="px-2 py-2 text-xs font-medium">{emp.employeeEmail?.email}</td>
                      <td className="px-2 py-2 text-xs font-medium">{emp.employeeContact?.contact}</td>
                      <td className="px-2 py-2 text-xs font-medium">{emp.status}</td>
                      <td className="px-4 py-2 flex gap-2">
                        {(isAdmin || permissionArray.includes("empCreate")) && (<button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                          <Link to={`/company/employe/profile/${emp._id}`}>
                            <Eye size={18} />
                          </Link>
                        </button>)}
                        {(isAdmin || permissionArray.includes("empEdit")) && (
                          <Link to={`/company/employe/edit/${emp._id}`} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">

                            <Edit size={18} />

                          </Link>)}


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
