import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { Plus, Search, Edit, Trash2, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { bulkAssign, fetchLeads } from "../../redux/slice/leadSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";

function LeadAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [page, setPage] = useState(1);

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const itemsPerPage = 10;

  // ---------------- INIT ----------------
  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());

    dispatch(viewEmployees())

    dispatch(companyConfiguresView());
  }, [dispatch, initialized]);

  // ---------------- SEARCH DEBOUNCE ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

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
      })
    );
  }, [dispatch, page, debouncedSearch, statusFilter, dateFilter, assignedFilter]);

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
      prev.includes(id)
        ? prev.filter((leadId) => leadId !== id)
        : [...prev, id]
    );
  };

  const handleAssignSubmit = () => {
    console.log("Selected Employee:", selectedEmployee, "Selected Leads:", selectedLeads);

    if (!selectedEmployee) return alert("Please select an employee");
    if (selectedLeads.length === 0) return alert("Please select at least one lead");

    const employee = employeeList.find(
      (e) => `${e.name} (${e.employeeCode})` === selectedEmployee
    );

    if (!employee) return alert("Invalid employee selected");

    dispatch(
      bulkAssign({
        leadIds: selectedLeads,
        assignedTo: employee._id,
      })
    );

    // Reset selection
    setSelectedLeads([]);
    setSelectedEmployee("");
    setAssignedFilter("");
    alert("Assigned Done!")
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("");
    setDateFilter("");
    setAssignedFilter("");
    setPage(1);
  };

  // ---------------- UI ----------------
  // console.log(employeeList)
  return (
    <CompanyLayout>
      <div className="mx-auto w-full p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Leads</h2>

          {(isAdmin || permissionArray.includes("ldCreate")) && (
            <button
              onClick={() => navigate("/company/lead-form")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              <Plus size={16} />
              Create Lead
            </button>
          )}
        </div>

        {/* ASSIGN SECTION (ONLY UNASSIGNED MODE) */}
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
                  <option
                    key={emp._id}
                    value={`${emp.name} (${emp.employeeCode})`}
                  />
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded shadow">
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

          {statusField && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Status</option>
              {statusField.options?.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {(isAdmin || permissionArray.includes("ldAssign")) && (
            <select
              value={assignedFilter}
              onChange={(e) => {
                setAssignedFilter(e.target.value);
                setSelectedLeads([]);
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
            onChange={(e) => setDateFilter(e.target.value)}
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
          <table className="w-full text-left text-sm">
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
                        index + 1
                      )}
                    </td>

                    {leadSchema.map((field) => (
                      <td key={field.fieldKey} className="px-2 text-left py-3 text-xs font-medium">
                        {lead.fields?.[field.fieldKey] ?? "-"}
                      </td>
                    ))}
                     <td className="px-4 py-3 text-left text-xs font-medium">{lead.source}</td>
                    <td className="px-4 py-3 text-left text-xs font-medium">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {(isAdmin || permissionArray.includes("ldEdit")) && (
                        <Link
                          to={`/company/lead/update/${lead._id}`}
                          className="text-green-600"
                        >
                          <Edit size={16} />
                        </Link>
                      )}
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

export default LeadAll;
