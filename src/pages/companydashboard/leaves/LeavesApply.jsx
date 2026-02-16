import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeave,
  viewLeave,
  updateLeave,
  viewOneLeave,
} from "../../../redux/slice/employee/leaveSlice";
import { Trash2, Edit, Eye } from "lucide-react";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";

function LeavesApply() {
  const dispatch = useDispatch();

  const { leaves: allLeaveData, leavesOne, loading, error } = useSelector(
    (state) => state?.reducer?.leaves
  );

  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Apply Leave form
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
  });

  // Edit form
  const [editData, setEditData] = useState({
    _id: "",
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
    status: "",
    totalday: {},
  });

  // Fetch employee
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  // Fetch leaves
  useEffect(() => {
    dispatch(viewLeave({ page, limit }));
  }, [dispatch, page, limit]);

  // Prefill edit modal
  useEffect(() => {
    if (leavesOne?.data) {
      const data = leavesOne.data;
      setEditData({
        _id: data._id,
        fromDate: data.fromDate?.split("T")[0],
        toDate: data.toDate?.split("T")[0],
        leaveType: data.leaveType,
        reason: data.reason,
        status: data.status,
        totalday: data.totalday,
      });
    }
  }, [leavesOne]);

  // Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLeave(formData));
    setFormData({ fromDate: "", toDate: "", leaveType: "", reason: "" });
    setShowModal(false);
  };

  const handleEditOpen = (leaveId) => {
    dispatch(viewOneLeave(leaveId));
    setShowEditModal(true);
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await dispatch(updateLeave({ id: editData._id, status: editData.status })).unwrap();
    // Only after update succeeds, refresh the table
    dispatch(viewLeave({ page, limit }));
    setShowEditModal(false);
  } catch (error) {
    console.error("Update failed:", error);
  }
};


  const handleDelete = (leaveId) => {
    console.log("Delete leave:", leaveId);
    // TODO: dispatch deleteLeave
  };

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    if (allLeaveData?.total && page * limit < allLeaveData.total)
      setPage((prev) => prev + 1);
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-semibold">Apply Leave</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </div>

        {/* Leave Table */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                 <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                {(employeeData?.role === "Admin" || employeeData?.role === "HR") && (
                  <th className="p-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-red-500">{error}</td>
                </tr>
              ) : allLeaveData?.data?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-3 text-center">No leaves found</td>
                </tr>
              ) : (
                allLeaveData?.data?.map((leave) => (
                  <tr key={leave._id} className="border-t text-start text-xs font-medium">
                         <td className="p-3 ">{leave?.approvedBy?.name}</td>
                    <td className="p-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                    <td className="p-3">{leave.leaveType}</td>
                    <td className="p-3">{leave.totalday?.totalPaid + leave.totalday?.totalUnpaid}</td>
                    <td className="p-3">{leave.reason}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Reject"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    {(employeeData?.role === "Admin" || employeeData?.role === "HR") && (
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEditOpen(leave._id)}
                          className="p-1 hover:bg-gray-200 rounded bg-yellow-100 text-yellow-700"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(leave._id)}
                          className="p-1 hover:bg-gray-200 rounded bg-red-100 text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded bg-blue-100 text-blue-700"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    )}
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

        {/* Apply Leave Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Apply Leave</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                <select name="leaveType" value={formData.leaveType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                  <option value="">Select Leave Type</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Short Leave">Short Leave</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Round Mark">Round Mark</option>
                </select>
                <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Leave Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Update Leave Status</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="date" value={editData.fromDate} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
                <input type="date" value={editData.toDate} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
                <input type="text" value={editData.leaveType} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
                <textarea value={editData.reason} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
                <input type="text" value={editData.totalday?.totalPaid + editData.totalday?.totalUnpaid} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />

                {/* Only editable field */}
                <select name="status" value={editData.status} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Reject">Reject</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
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
