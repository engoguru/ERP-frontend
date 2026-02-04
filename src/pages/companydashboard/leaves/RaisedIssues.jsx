import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { createIssue, viewIssue, updateIssue } from "../../../redux/slice/employee/issueSlice";
import { Eye } from "lucide-react";

function RaisedIssues() {
  const dispatch = useDispatch();
  const { issues, loading } = useSelector((state) => state?.reducer?.issueData);

  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  /* FETCH ISSUES */
  useEffect(() => {
    dispatch(viewIssue());
  }, [dispatch]);

  /* CREATE ISSUE */
  const handleCreate = async (e) => {
    e.preventDefault();
    await dispatch(createIssue(formData));
    setFormData({ title: "", description: "" });
    setShowCreate(false);
    dispatch(viewIssue());
  };

  /* UPDATE STATUS */
  const handleStatusUpdate = async (id) => {
    await dispatch(updateIssue({ id, data: { status } }));
    setStatus("");
    setShowView(false);
    // Re-fetch issues after update
  dispatch(viewIssue());
  };

  const statusBadge = {
    Pending: "bg-yellow-100 text-yellow-700",
    Resolve: "bg-green-100 text-green-700",
  };

  return (
    <CompanyLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Raised Issues
          </h2>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Raise Issue
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Submitted By</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {issues?.map((issue) => (
                <tr key={issue._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{issue.title}</td>
                  <td className="p-4">{issue.submittedBy?.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[issue.status]}`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setStatus(issue.status);
                        setShowView(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && issues?.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <Modal title="Raise Issue" onClose={() => setShowCreate(false)}>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Issue Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
                rows={4}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* VIEW MODAL */}
        {showView && selectedIssue && (
          <Modal title="Issue Details" onClose={() => setShowView(false)}>
            <div className="space-y-4">
              <Info label="Title" value={selectedIssue.title} />
              <Info label="Description" value={selectedIssue.description} />
              <Info label="Submitted By" value={selectedIssue.submittedBy?.name} />

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolve">Resolve</option>
                </select>
              </div>

              <button
                disabled={status === selectedIssue.status}
                onClick={() => handleStatusUpdate(selectedIssue._id)}
                className={`w-full py-2 rounded-lg font-semibold
                  ${
                    status === selectedIssue.status
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
              >
                Update Status
              </button>
            </div>
          </Modal>
        )}
      </div>
    </CompanyLayout>
  );
}

/* REUSABLE COMPONENTS */
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      {children}
    </div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default RaisedIssues;
