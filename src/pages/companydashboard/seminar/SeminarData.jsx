import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import axios from "axios";

function SeminarData() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50); // default 50 items per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber = page, pageLimit = limit) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ngoguru.info/api/id/seminarData?status=Confirmed&source=mumbai%20seminar&page=${pageNumber}&limit=${pageLimit}`
      );
      setData(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages || 1);
      setPage(res.data.pagination.page || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const handleDuesDone = (item) => {
    console.log("Dues Done for:", item);
    // call API here
  };

  const handleGenerateCard = (item) => {
    console.log("Generate Card for:", item);
    // call API here
  };

  return (
    <CompanyLayout>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Seminar Data</h2>

        {/* ===== Items per page selector ===== */}
        <div className="flex items-center justify-between mb-2">
          <div>
            Show{" "}
            <select
              className="border rounded px-2 py-1"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1); // reset to first page
              }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>{" "}
            entries
          </div>
          <div className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>
        </div>

        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">City</th>
                <th className="border px-3 py-2">Service</th>
                <th className="border px-3 py-2">Total</th>
                <th className="border px-3 py-2 text-green-600">Paid</th>
                <th className="border px-3 py-2 text-red-600">Unpaid</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((lead) => {
                  const f = lead.fields || {};
                  const oc = lead.OnConfirmed?.[0] || {}; // ONLY index 0

                  return (
                    <tr key={lead._id} className="text-center">
                      <td className="border px-3 py-2">{f.Name}</td>
                      <td className="border px-3 py-2">{f.Contact}</td>
                      <td className="border px-3 py-2">{f.city}</td>
                      <td className="border px-3 py-2">{oc.nameOfService || "-"}</td>
                      <td className="border px-3 py-2">{oc.totalAmount || 0}</td>
                      <td className="border px-3 py-2 text-green-600 font-semibold">
                        {oc.paidAmount || 0}
                      </td>
                      <td className="border px-3 py-2 text-red-600 font-semibold">
                        {oc.unpaidAmount || 0}
                      </td>
                      <td className="border px-3 py-2 flex gap-2 justify-center">
                        <button
                          onClick={() => handleDuesDone(lead)}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Dues Done
                        </button>
                        <button
                          onClick={() => handleGenerateCard(lead)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Generate Card
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Pagination Controls ===== */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default SeminarData;