

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { Plus, Search, Edit, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { bulkAssign, fetchLeads } from "../../redux/slice/leadSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";

function LeadAll() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page") || 1);
  const limit = queryParams.get("limit") || 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(limit)
  // ---------------- REDUX STATE ----------------
  const { companyConfigureViewData } = useSelector(
    (state) => state?.reducer?.company
  );

  const {
    leadAll = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.reducer.lead);

  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  const { employeeList = [] } = useSelector(
    (state) => state.reducer.employee
  );

  const permissionArray = employeeData?.permissionArray || [];
  const isAdmin = employeeData?.role === "Admin";

  // ---------------- LOCAL STATE ----------------
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [page, setPage] = useState(currentPage);

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // const itemsPerPage =10;
  // ---------------- SYNC PAGE WITH URL ----------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get("page") || 1);
    setPage(pageFromUrl);
  }, [location.search]);
  // ---------------- INIT ----------------
  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
    dispatch(viewEmployees());
    dispatch(companyConfiguresView());
  }, [dispatch, initialized]);

  // ---------------- SEARCH DEBOUNCE ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());

      // reset page when search changes
      if (search) {
        setPage(1);
        // navigate("/company/leadall?page=1", { replace: true });
      }

    }, 500);

    return () => clearTimeout(timer);
  }, [search, navigate]);

  // ---------------- FETCH LEADS ----------------
  useEffect(() => {
    dispatch(
      fetchLeads({
        page,
        itemsPerPage,
        search: debouncedSearch,
        status: statusFilter,
        date: dateFilter,
        assigned: assignedFilter,
        source: source
      })
    );
  }, [dispatch, page, debouncedSearch, statusFilter, dateFilter, assignedFilter, itemsPerPage, source]);
  useEffect(() => {
    navigate(`/company/leadall?page=${page}&search=${debouncedSearch}`, {
      replace: true,
    });
  }, [page, debouncedSearch, navigate]);
  // ---------------- SCHEMA ----------------
  const leadSchema = companyConfigureViewData?.data?.leadForm || [];
  const statusField = leadSchema.find(
    (f) =>
      f.fieldKey?.toLowerCase() === "status" ||
      f.label?.toLowerCase() === "status"
  );

  // ---------------- HANDLERS ----------------
  const toggleLeadSelection = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const handleAssignSubmit = () => {
    if (!selectedEmployee) return alert("Please select an employee");
    if (selectedLeads.length === 0) return alert("Please select at least one lead");

    const employee = employeeList.find(
      (e) => `${e.name} (${e.employeeCode})` === selectedEmployee
    );

    if (!employee) return alert("Invalid employee selected");
    // console.log(employee,"op")
    dispatch(
      bulkAssign({
        leadIds: selectedLeads,
        assignedTo: employee._id,
        roleID: employee.roleID

      })
    );

    setSelectedLeads([]);
    setSelectedEmployee("");
    setAssignedFilter("");
    alert("Assigned Done!");
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("");
    setDateFilter("");
    setAssignedFilter("");
    setPage(1);
  };

  // ---------------- PAGINATION LOGIC ----------------
  const getVisiblePages = () => {
    const pages = [];

    const current = Math.min(page, totalPages);

    if (totalPages <= 20) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(current - 2, 1);
      let end = Math.min(start + 4, totalPages);

      if (end - start < 4) start = Math.max(end - 4, 1);

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };
  const changePage = (newPage) => {
    setPage(newPage); // update state
    navigate(`/company/leadall?page=${newPage}&limit=${itemsPerPage}`, { replace: true }); // update URL
  };

  const handleEdit = (leadId) => {
    // Pass current page in query
    // console.log(leadId, "pp")
    navigate(`/company/lead/update/${leadId}?page=${page}&limit=${itemsPerPage}`);
  };
  // ---------------- UI ----------------
  const handleItemsChange = (value) => {

    setItemsPerPage(value);

    setPage(1);
    navigate(`/company/leadall?page=${page}&limit=${value}`);
    // navigate("/company/leadall?page=1&limit=${itemsPerPage}");

  };

  return (
    <CompanyLayout>
      <div className="mx-auto w-full p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-start gap-3 mb-4">
          {/* Header */}
          <h2 className="text-xl font-bold text-gray-800">All Leads</h2>

          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium text-md">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Optional Create Lead button */}
          {(isAdmin || permissionArray.includes("ldCreate")) && (
            <button
              onClick={() => navigate("/company/lead-form")}
              className="ml-auto flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
            >
              <Plus size={16} /> Create Lead
            </button>
          )}
        </div>

        {/* ASSIGN SECTION */}
        {assignedFilter === "unassigned" &&
          (isAdmin || permissionArray.includes("ldEdit")) && (
            <div className="flex items-center gap-3 bg-white p-4 rounded shadow">
              <input
                list="employees"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                placeholder="Select Employee..."
                className="border rounded px-3 py-2 w-72"
              />
              <datalist id="employees">
                {employeeList.map((emp) => (
                  <option key={emp._id} value={`${emp.name} (${emp.employeeCode})`} />
                ))}
              </datalist>

              <button
                onClick={handleAssignSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Assign Selected ({selectedLeads.length})
              </button>
            </div>
          )}

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 rounded shadow">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-[100%] border rounded py-2 pl-3 pr-3 text-sm"
            >meetingWebsite
              <option value="">Select Source</option>
              <option value="mumbai seminar">Mumbai Seminar</option>
              <option value="delhi seminar">Delhi Seminar</option>
              <option value="mahakumbh">Mahakumbh</option>
              <option value="Trust Registration">Trust Registration</option>
              <option value="meeting">Meeting</option>
              <option value="Website">Website</option>
            </select>
          </div>

          {statusField && (
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Status</option>
              <option value="other">Other</option>
              {statusField.options?.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {(isAdmin || permissionArray.includes("ldassign")) && (
            <select
              value={assignedFilter}
              onChange={(e) => {
                setAssignedFilter(e.target.value);
                setSelectedLeads([]);
                setPage(1);
              }}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Leads</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          )}

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded px-3 py-2 text-sm"
          />

          <button
            onClick={handleReset}
            className="border bg-gray-100 rounded px-3 py-2 text-sm"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-[100px] text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3">#</th>
                {leadSchema.map((field) => (
                  <th key={field.fieldKey} className="px-4 py-3">
                    {field.label}
                  </th>
                ))}
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="100%" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : (
                leadAll.map((lead, index) => (
                  <tr key={lead._id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-3">
                      {assignedFilter === "unassigned" ? (
                        <CheckCircle
                          onClick={() => toggleLeadSelection(lead._id)}
                          className={`cursor-pointer ${selectedLeads.includes(lead._id)
                            ? "text-green-600 fill-green-600"
                            : "text-gray-400"
                            }`}
                        />
                      ) : (
                        (page - 1) * itemsPerPage + index + 1
                      )}
                    </td>

                    {leadSchema.map((field) => (
                      <td
                        key={field.fieldKey}
                        className="px-2 text-left py-3 text-xs font-medium"
                      >
                        {lead.fields?.[field.fieldKey] ?? "-"}
                      </td>
                    ))}

                    <td className="px-4 py-3 text-left text-xs font-medium">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3 text-left text-xs font-medium">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {(isAdmin || permissionArray.includes("ldEdit")) && (
                        <button className="text-green-600" onClick={() => handleEdit(lead._id)}>     <Edit size={16} /></button>

                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => changePage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded border text-sm ${page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"
                }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {getVisiblePages().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`px-3 py-1 rounded text-sm ${page === pageNumber ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-50"
                    }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => changePage(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded border text-sm ${page === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </CompanyLayout >
  );
}

export default LeadAll;
