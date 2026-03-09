import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_URL } from "../../../utils/BaseUrl";

function Bdreport({ id }) {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("leads");
  const [monthFilter, setMonthFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // Pagination
  const [currentPageLeads, setCurrentPageLeads] = useState(1);
  const [currentPageStatus, setCurrentPageStatus] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data
  const fetchData = async () => {
    try {
      if (!id) return;
    const response = await axios.get(`${base_URL}lead/report/${id}`, {
  withCredentials: true
});
      setData(response.data.data || {});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const assignedLeads = data.assignedLeads || [];
  const statusLeads = data.userStatusLeads || [];
  const totalStatus = data.totalStatusCounts || {};

  // Flatten assigned leads for filtering
  const allAssignedLeads = assignedLeads.flatMap((group) => group.leads);

  const filterLeads = (leads) =>
    leads.filter((lead) => {
      const matchMonth = monthFilter
        ? new Date(
            lead.assignedAt || lead.statusRecord?.[0]?.changedAt
          ).getMonth() + 1 === Number(monthFilter)
        : true;
      const matchText = searchText
        ? lead.fields?.Name?.toLowerCase().includes(searchText.toLowerCase()) ||
          lead.fields?.Contact?.toString().includes(searchText)
        : true;
      return matchMonth && matchText;
    });

  const filteredAssignedLeads = filterLeads(allAssignedLeads);
  const filteredStatusLeads = filterLeads(statusLeads);

  // Pagination calculation
  const paginate = (leads, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return leads.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPagesLeads = Math.ceil(filteredAssignedLeads.length / itemsPerPage);
  const totalPagesStatus = Math.ceil(filteredStatusLeads.length / itemsPerPage);

  const displayedLeads = paginate(filteredAssignedLeads, currentPageLeads);
  const displayedStatus = paginate(filteredStatusLeads, currentPageStatus);
 
  return (
    <div className="p-6 space-y-6">

      {/* ================= TAB BUTTONS ================= */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("leads")}
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "leads" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All Leads {allAssignedLeads.length}
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "status" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Status Report
        </button>
      </div>

      {/* ================= FILTER INPUTS ================= */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <label className="font-semibold">Filter Month:</label>
        <input
          type="month"
          className="border p-2 rounded"
          onChange={(e) =>
            setMonthFilter(new Date(e.target.value).getMonth() + 1)
          }
        />
        <label className="font-semibold">Search Name/Contact:</label>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded flex-1"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPageLeads(1);
            setCurrentPageStatus(1);
          }}
        />
        <label className="font-semibold">Items per page:</label>
        <select
          className="border p-2 rounded"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPageLeads(1);
            setCurrentPageStatus(1);
          }}
        >
          {[5, 10, 15, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* ================= ALL LEADS TAB ================= */}
      {activeTab === "leads" && (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">S.No</th>
                <th className="border p-2 text-left">Lead Name</th>
                <th className="border p-2 text-left">Contact</th>
                <th className="border p-2 text-left">Assigned Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeads.map((lead, index) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="border p-2">{(currentPageLeads - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{lead.fields?.Name}</td>
                  <td className="border p-2">{lead.fields?.Contact}</td>
                  <td className="border p-2">
                    {new Date(lead.assignedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {displayedLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-2 text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPagesLeads > 1 && (
            <div className="flex justify-between mt-3">
              <button
                disabled={currentPageLeads === 1}
                onClick={() => setCurrentPageLeads((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPageLeads} of {totalPagesLeads}
              </span>
              <button
                disabled={currentPageLeads === totalPagesLeads}
                onClick={() => setCurrentPageLeads((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= STATUS REPORT TAB ================= */}
      {activeTab === "status" && (
        <div className="space-y-4">
          {/* Total Status Summary */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded text-center font-semibold">
              Confirmed: {totalStatus?.Confirmed || 0}
            </div>
            <div className="bg-blue-100 p-3 rounded text-center font-semibold">
              Interested: {totalStatus?.Interested || 0}
            </div>
            <div className="bg-red-100 p-3 rounded text-center font-semibold">
              Dump: {totalStatus?.Dump || 0}
            </div>
            <div className="bg-yellow-100 p-3 rounded text-center font-semibold">
              Not Connected: {totalStatus?.["Not Connected"] || 0}
            </div>
          </div>

          {/* Status Leads Table */}
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">S.No</th>
                <th className="border p-2 text-left">Lead Name</th>
                <th className="border p-2 text-left">Contact</th>
                <th className="border p-2 text-left">Status Timeline</th>
              </tr>
            </thead>
            <tbody>
              {displayedStatus.map((lead, index) => (
                <tr key={lead._id} className="align-top hover:bg-gray-50">
                  <td className="border p-2">{(currentPageStatus - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{lead.fields?.Name}</td>
                  <td className="border p-2">{lead.fields?.Contact}</td>
                  <td className="border p-2 space-y-1">
                    {lead.statusRecord.map((sr) => (
                      <div key={sr._id} className="text-xs bg-gray-100 p-2 rounded">
                        <span className="font-semibold">{sr.roleId?.role}</span>{" "}
                        - {sr.userId?.name} →{" "}
                        <span className="font-bold">{sr.status}</span> -{" "}
                        <span className="text-gray-500 text-xs">
                          {new Date(sr.changedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
              {displayedStatus.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-2 text-gray-500">
                    No status records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPagesStatus > 1 && (
            <div className="flex justify-between mt-3">
              <button
                disabled={currentPageStatus === 1}
                onClick={() => setCurrentPageStatus((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPageStatus} of {totalPagesStatus}
              </span>
              <button
                disabled={currentPageStatus === totalPagesStatus}
                onClick={() => setCurrentPageStatus((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bdreport;