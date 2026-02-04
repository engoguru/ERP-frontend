import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { createLeave, viewLeave } from "../../../redux/slice/employee/leaveSlice";
import { Trash2, Edit, Eye } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";

function LeavesApply() {
  const dispatch = useDispatch();
  
  const { leaves: allLeaveData, loading, error } = useSelector(
    (state) => state?.reducer?.leaves
  );

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(viewLeave({ page, limit }));
  }, [dispatch, page, limit]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLeave(formData))
    setFormData({ fromDate: "", toDate: "", leaveType: "", reason: "" });
    setShowModal(false);
  };

  // Pagination helpers
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    if (allLeaveData?.total && page * limit < allLeaveData.total) setPage((prev) => prev + 1);
  };

  // Action Handlers
  const handleEdit = (leaveId) => {
    console.log("Edit leave:", leaveId);
    // TODO: open modal with prefilled data
  };

  const handleDelete = (leaveId) => {
    console.log("Delete leave:", leaveId);
    // TODO: dispatch deleteLeave
  };

  const handleView = (leaveId) => {
    console.log("View leave:", leaveId);
    // TODO: open details modal or navigate to details page
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Apply Leave</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-left">Total Day</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : allLeaveData?.data?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">
                    No leaves found
                  </td>
                </tr>
              ) : (
                allLeaveData?.data?.map((leave) => (
                  <tr key={leave._id} className="border-t">
                    <td className="p-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                    <td className="p-3">{leave.leaveType}</td>
                    <td className="p-3">{leave.totalday?.totalPaid + leave.totalday?.totalUnpaid}</td>
                    <td className="p-3">{leave.reason}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Reject"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleView(leave._id)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <Link to={`/company/LeaveDetail/${leave._id}`}
                        onClick={() => handleEdit(leave._id)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(leave._id)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil((allLeaveData?.total || 0) / limit)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page * limit >= (allLeaveData?.total || 0)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {showModal && (
    <div className="fixed inset-0 [background-color:rgba(0,0,0,0.678)] flex items-center justify-center z-50">


            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Apply Leave</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Short Leave">Short Leave</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Round Mark">Round Mark</option>
                </select>

                <textarea
                  name="reason"
                  placeholder="Reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}

export default LeavesApply;
