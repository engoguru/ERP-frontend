import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";
import { createIp } from "../../../redux/slice/employee/ipSlice";

function IPConfigure() {
  const dispatch = useDispatch();
  const { employeeList, loading, error } = useSelector(
    (state) => state.reducer.employee
  );

  const [formData, setFormData] = useState({
    employeeId: "",
    licenseId: "",
    ip: "",
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(viewEmployees());
  }, [dispatch]);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const selectedEmployee = employeeList.find((emp) => emp._id === employeeId);
    setFormData({
      employeeId,
      licenseId: selectedEmployee?.licenseId || "",
      ip: "",
    });
  };

  const handleIpChange = (e) => {
    setFormData((prev) => ({ ...prev, ip: e.target.value }));
  };

  const handleCopyIp = () => {
    if (!formData.ip) return;
    navigator.clipboard.writeText(formData.ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.licenseId || !formData.ip) {
      alert("Employee and IP are required");
      return;
    }
    dispatch(createIp(formData));
    setFormData({ employeeId: "", licenseId: "", ip: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Configure IP</h2>

      {loading && <p className="text-gray-500 mb-2">Loading employees...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Employee</label>
          <select
            value={formData.employeeId}
            onChange={handleEmployeeChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Employee</option>
            {employeeList?.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* IP input with copy button */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">IP Address</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter IPv4 from ipconfig"
              value={formData.ip}
              onChange={handleIpChange}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleCopyIp}
              className={`px-3 py-2 rounded text-white transition ${
                copied ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">Copy the IPv4 from your cmd (ipconfig)</p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded shadow transition"
        >
          Save IP
        </button>
      </form>
    </div>
  );
}

export default IPConfigure;
