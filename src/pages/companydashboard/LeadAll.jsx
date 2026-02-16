// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
// import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { companyConfiguresView } from "../../redux/slice/companySlice";
// import { fetchLeads } from "../../redux/slice/leadSlice";
// import { employeeDetails } from "../../redux/slice/employee/loginSlice";

// function LeadAll() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const { companyConfigureViewData } = useSelector(
//     (state) => state?.reducer?.company
//   );

//   const { leadAll = [], loading, error } = useSelector(
//     (state) => state.reducer.lead
//   );





//   // Grab state
//   const { employeeData, initialized } = useSelector(
//     (state) => state.reducer.login
//   );

//   // Fetch employee details only if not initialized
//   useEffect(() => {
//     if (!initialized) {
//       dispatch(employeeDetails());
//     }
//   }, [dispatch, initialized]);

//   const permissionArray = employeeData?.permissionArray

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");

//   // fetch config + leads
//   useEffect(() => {
//     dispatch(companyConfiguresView());
//     dispatch(fetchLeads());
//   }, [dispatch]);

//   // dynamic lead form schema
//   const leadSchema = companyConfigureViewData?.data?.leadForm || [];

//   // get status field if any (case insensitive)
//   const statusField = leadSchema.find(
//     (f) =>
//       f.fieldKey?.toLowerCase() === "status" ||
//       f.label?.toLowerCase() === "status"
//   );

//   // filter logic
//   const filteredLeads = leadAll.filter((lead) => {
//     const fieldValues = lead.fields || {};

//     // search across all configured fields
//     const matchesSearch =
//       search === "" ||
//       leadSchema.some((field) => {
//         const val = (fieldValues[field.fieldKey] ?? "").toString();
//         return val.toLowerCase().includes(search.toLowerCase());
//       });

//     // status dropdown filter
//     const matchesStatus = statusFilter
//       ? fieldValues[statusField?.fieldKey] === statusFilter
//       : true;

//     // date filter based on createdAt
//     const matchesDate = dateFilter
//       ? new Date(lead.createdAt).toISOString().split("T")[0] === dateFilter
//       : true;

//     return matchesSearch && matchesStatus && matchesDate;
//   });
//   // console.log(leadAll,"ppy")
//   // UI
//   const isAdmin = employeeData?.role === "Admin";
//   return (
//     <CompanyLayout>
//       <div className="mx-auto w-full p-6 space-y-2">

//         {/* HEADER */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">All Leads</h2>
//           {(isAdmin || permissionArray.includes("ldCreate")) && (
//             <button
//               onClick={() => navigate("/company/lead-form")}
//               className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
//             >
//               <Plus size={16} /> Create New Lead
//             </button>
//           )}

//           {/* <button
//             onClick={() => navigate("/company/lead-form")}
//             className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
//           >
//             <Plus size={16} /> Create New Lead
//           </button> */}
//         </div>

//         {/* FILTERS */}
//         <div className="grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow md:grid-cols-4">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search across all fields"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm"
//             />
//           </div>

//           {/* STATUS DROPDOWN */}
//           {statusField && (
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="rounded-lg border px-3 py-2 text-sm"
//             >
//               <option value="">All {statusField.label}</option>
//               {statusField.options?.map((opt, idx) => (
//                 <option key={idx} value={opt}>
//                   {opt}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* DATE FILTER */}
//           <input
//             type="date"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="rounded-lg border px-3 py-2 text-sm"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto rounded-xl bg-white shadow">
//           <table className="w-full border-collapse text-sm text-gray-700">
//             <thead className="bg-gray-50 text-left">
//               <tr>
//                 {/* dynamic headers */}
//                 {leadSchema?.map((field) => (
//                   <th key={field.fieldKey} className="px-4 py-3">
//                     {field.label}
//                   </th>
//                 ))}
//                 <th className="px-4 py-3">Source</th>
//                 <th className="px-4 py-3">Created</th>
//                 <th className="px-2 py-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLeads?.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={leadSchema?.length + 2}
//                     className="px-4 py-6 text-center text-gray-400"
//                   >
//                     No leads found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredLeads?.map((lead) => {
//                   const fieldValues = lead.fields || {};
//                   return (
//                     <tr key={lead._id} className="border-t hover:bg-gray-50">
//                       {leadSchema?.map((field) => (
//                         <td key={field.fieldKey} className="px-4 py-4 text-start text-xs font-medium">
//                           {fieldValues[field.fieldKey] ?? "-"}
//                         </td>
//                       ))}

//                       {/* createdAt */}
//                       <td className="px-4 py-3">
//                        {lead?.source}
//                       </td>
//                       <td className="px-4 py-3">
//                         {new Date(lead.createdAt).toLocaleDateString()}
//                       </td>

//                       {/*ACTION*/}
//                       <td className="px-2 py-3 text-center">
//                         <div className="flex justify-center gap-1">
//                           {(isAdmin || permissionArray.includes("ldView")) && (
//                             <button className="text-blue-600 hover:text-blue-700">
//                               <Eye size={16} />
//                             </button>
//                           )}

//                           {(isAdmin || permissionArray.includes("ldEdit")) && (
//                             <button className="text-green-600 hover:text-green-700">
//                               <Link to={`/company/lead/update/${lead._id}`}>
//                                 <Edit size={16} />
//                               </Link>
//                             </button>
//                           )}

//                           {(isAdmin || permissionArray.includes("ldDelete")) && (
//                             <button className="text-red-600 hover:text-red-700">
//                               <Trash2 size={16} />
//                             </button>
//                           )}


//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </CompanyLayout>
//   );
// }

// export default LeadAll;




import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { fetchLeads } from "../../redux/slice/leadSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";

function LeadAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { companyConfigureViewData } = useSelector(
    (state) => state?.reducer?.company
  );

  const {
    leadAll = [],
    loading,
    totalPages = 1,
    page: currentPage = 1,
  } = useSelector((state) => state.reducer.lead);

  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  const permissionArray = employeeData?.permissionArray || [];
  const isAdmin = employeeData?.role === "Admin";

  // ---------------- STATES ----------------
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // ---------------- INIT ----------------
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    dispatch(companyConfiguresView());
  }, [dispatch]);

  // ---------------- DEBOUNCE SEARCH ----------------
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
      })
    );
  }, [dispatch, page, debouncedSearch, statusFilter, dateFilter]);

  // ---------------- SCHEMA ----------------
  const leadSchema = companyConfigureViewData?.data?.leadForm || [];

  const statusField = leadSchema.find(
    (f) =>
      f.fieldKey?.toLowerCase() === "status" ||
      f.label?.toLowerCase() === "status"
  );

  // ---------------- RESET FILTERS ----------------
  const handleReset = () => {
    setSearch("");
    setStatusFilter("");
    setDateFilter("");
    setPage(1);
  };

  return (
    <CompanyLayout>
      <div className="mx-auto w-full p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Leads</h2>

          {(isAdmin || permissionArray.includes("ldCreate")) && (
            <button
              onClick={() => navigate("/company/lead-form")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              Create New Lead
            </button>
          )}
        </div>

        {/* FILTER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* STATUS */}
          {statusField && (
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">All {statusField.label}</option>
              {statusField.options?.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {/* DATE */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border px-3 py-2 text-sm"
          />

          {/* RESET */}
          <button
            onClick={handleReset}
            className="rounded-lg border bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-left">
              <tr>
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
                  <td
                    colSpan={leadSchema.length + 3}
                    className="text-center py-6 text-gray-400"
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : leadAll.length === 0 ? (
                <tr>
                  <td
                    colSpan={leadSchema.length + 3}
                    className="text-center py-6 text-gray-400"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                leadAll.map((lead) => {
                  const fieldValues = lead.fields || {};

                  return (
                    <tr
                      key={lead._id}
                      className="border-t hover:bg-gray-50 font-medium"
                    >
                      {leadSchema.map((field) => (
                        <td
                          key={field.fieldKey}
                          className="px-4 py-3 text-xs"
                        >
                          {fieldValues[field.fieldKey] ?? "-"}
                        </td>
                      ))}

                      <td className="px-4 py-3">{lead.source}</td>
                      <td className="px-4 py-3">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-3">
                          {(isAdmin ||
                            permissionArray.includes("ldView")) && (
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                          )}

                          {(isAdmin ||
                            permissionArray.includes("ldEdit")) && (
                            <Link
                              to={`/company/lead/update/${lead._id}`}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Edit size={16} />
                            </Link>
                          )}

                          {(isAdmin ||
                            permissionArray.includes("ldDelete")) && (
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default LeadAll;
