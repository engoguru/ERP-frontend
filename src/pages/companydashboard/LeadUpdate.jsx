import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { fetchOneLead, updateLead } from "../../redux/slice/leadSlice";
import { Save, UserPlus, MessageSquare } from "lucide-react";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";

function LeadUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { companyConfigureViewData } = useSelector(
    (state) => state.reducer.company
  );
  const leadSchema = companyConfigureViewData?.data?.leadForm || [];

  const { leadDetail, loading, error } = useSelector(
    (state) => state.reducer.lead
  );

  const { employeeList = [] } = useSelector((state) => state.reducer.employee);
  const { initialized } = useSelector((state) => state.reducer.login);

// Grab state
  const { employeeData, } = useSelector(
    (state) => state.reducer.login
  );

  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  const permissionArray = employeeData?.permissionArray


  const [formData, setFormData] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    dispatch(companyConfiguresView());
    if (id) dispatch(fetchOneLead(id));
    dispatch(viewEmployees());
  }, [dispatch, id]);

  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    if (leadDetail) {
      setFormData(leadDetail.fields || {});
      setAssignments(leadDetail.whoAssignedwho || []);
      setFollowUps(leadDetail.followUp || []);
      setShowStatus(Boolean(leadDetail.fields?.status ?? true));
    }
  }, [leadDetail]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Assignment handlers
  const addAssignment = () => {
    setAssignments((prev) => [
      ...prev,
      {
        assignedBy:employeeData.id || "",
        assignedTo: "",
        assignedAt: new Date().toISOString(),
      },
    ]);
  };
  const updateAssignment = (idx, field, value) => {
    setAssignments((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a))
    );
  };
  const removeAssignment = (idx) => {
    setAssignments((prev) => prev.filter((_, i) => i !== idx));
  };

  // Follow-Up handlers
  const addFollowUp = () => {
    setFollowUps((prev) => [
      ...prev,
      {
        addedBy: employeeList[0]?._id || "",

        date: new Date().toISOString(),
        contentType: "string",
        messageContent: "",
      },
    ]);
  };
  const updateFollowUp = (idx, field, value) => {
    setFollowUps((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f))
    );
  };
  const removeFollowUp = (idx) => {
    setFollowUps((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fields: formData,
        whoAssignedwho: assignments,
        followUp: followUps,
      };
      await dispatch(updateLead({ id, data: payload })).unwrap();
      alert("Lead updated!");
      navigate(-1);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  if (loading || !leadDetail) {
    return (
      <CompanyLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500 text-lg">Loading lead...</p>
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Lead
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Toggle */}
          {leadSchema.some((f) => f.fieldKey.toLowerCase() === "status") && (
            <div className="flex items-center gap-2">
              <label className="font-medium">Show Status Field?</label>
              <input
                type="checkbox"
                checked={showStatus}
                onChange={() => setShowStatus((prev) => !prev)}
                className="accent-blue-600"
              />
            </div>
          )}

          {/* Schema Fields */}
          {leadSchema.map((field) => {
            if (field.fieldKey.toLowerCase() === "status" && !showStatus)
              return null;
            const value = formData[field.fieldKey] ?? "";
            return (
              <div key={field.fieldKey}>
                <label className="block font-medium mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    value={value}
                    onChange={(e) => handleChange(field.fieldKey, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={value}
                    onChange={(e) => handleChange(field.fieldKey, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                )}
              </div>
            );
          })}

          {/* Assignments */}
          {permissionArray.includes("ldassign") ? [  <div>
            <div className="flex items-center gap-2 mb-2">
              <UserPlus size={20} />
              <h3 className="text-lg font-semibold">Assignments</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 font-semibold border-b pb-1">
              <div>Assigned By</div>
              <div>Assigned To</div>
              <div>Date</div>
            </div>

            {assignments.map((a, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 mt-2">
                <input
                  type="text"
                  value={a.assignedBy || ""}
                  onChange={(e) => updateAssignment(i, "assignedBy", e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <select
                  value={a.assignedTo || ""}
                  onChange={(e) => updateAssignment(i, "assignedTo", e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select Employee</option>
                  {employeeList?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={a.assignedAt ? a.assignedAt.slice(0, 16) : ""}
                    onChange={(e) => updateAssignment(i, "assignedAt", e.target.value)}
                    className="border px-2 py-1 rounded flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeAssignment(i)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAssignment}
              className="mt-2 text-green-600 font-medium"
            >
              + Add Assignment
            </button>
          </div>]:[]}
         

          {/* Follow-Ups */}
            {permissionArray.includes("ldfollowUp") ? [  <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={20} />
              <h3 className="text-lg font-semibold">Follow Ups</h3>
            </div>

            <div className="grid grid-cols-4 gap-2 font-semibold border-b pb-1">
              <div>Employee ID</div>
              <div>Name</div>
              <div>Date</div>
              <div>Message</div>
            </div>

            {followUps.map((fu, i) => {
              // const emp = employeeList.find((e) => e._id === fu.addedBy) || {};
              return (
                <div key={i} className="grid grid-cols-4 gap-2 mt-2">
                  <div className="border-b">{fu.addedBy.employeeCode}</div>
                  <div className="border-b">{fu.addedBy.name || "Unknown"}</div>
                  <input
                    type="datetime-local"
                    value={fu.date ? fu.date.slice(0, 16) : ""}
                    onChange={(e) => updateFollowUp(i, "date", e.target.value)}
                    className="border-b px-2 py-1"
                  />
                  <div className="flex gap-2">
                   
                      <input
                        type="text"
                        value={fu.messageContent || ""}
                        onChange={(e) => updateFollowUp(i, "messageContent", e.target.value)}
                        className="border-b px-2 py-1 flex-1"
                      />
                 
                    <button
                      type="button"
                      onClick={() => removeFollowUp(i)}
                      className=" border-b text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={addFollowUp}
              className="mt-2 text-green-600 font-medium"
            >
              + Add Follow-Up
            </button>
          </div>
] : []}
        
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            <Save size={18} className="inline-block mr-1" />
            Update Lead
          </button>

          {error && <p className="text-red-600 text-center">Error: {error}</p>}
        </form>
      </div>
    </CompanyLayout>
  );
}

export default LeadUpdate;
