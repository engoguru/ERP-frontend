import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { fetchOneLead, updateLead } from "../../redux/slice/leadSlice";
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
  const { initialized, employeeData } = useSelector(
    (state) => state.reducer.login
  );
  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
  }, [initialized, dispatch]);
  const [formData, setFormData] = useState({});
  const [followUps, setFollowUps] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");



  useEffect(() => {
    dispatch(companyConfiguresView());
    if (id) dispatch(fetchOneLead(id));
    dispatch(viewEmployees());
  }, [dispatch, id]);

  useEffect(() => {
    if (leadDetail) {
      setFormData(leadDetail.fields || {});
      setFollowUps(leadDetail.followUp || []);
      setAssignments(leadDetail.whoAssignedwho || []);
    }
  }, [leadDetail]);

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddFollowUp = () => {
    if (!followUpMessage) return alert("Enter follow-up message!");

    setFollowUps((prev) => [
      ...prev,
      {
        addedBy: {
          _id: employeeData?.id,
          name: employeeData?.name,
          employeeCode: employeeData?.employeeCode,
        },
        date: new Date().toISOString(),
        messageContent: followUpMessage,
      },
    ]);

    setFollowUpMessage("");
  };


  const handleAddAssignment = () => {
    if (!selectedEmployee) return alert("Select an employee!");
    const employee = employeeList.find((e) => e._id === selectedEmployee);
    setAssignments((prev) => [
      ...prev,
      {
        assignedBy: employeeData?.id,
        assignedTo: employee,
        assignedAt: new Date().toISOString(),
      },
    ]);
    setSelectedEmployee("");
  };
  // console.log(followUps, "j")
  const handleSubmit = async () => {
    try {
      // const payload = {
      //   fields: formData,
      //   followUp: followUps,
      //   whoAssignedwho: assignments,
      // };
      const payload = {
        fields: formData,
        followUp: followUps.map(fu => ({
          ...fu,
          addedBy: employeeData?.id // keep ObjectId
        })),
        whoAssignedwho: assignments,
      };

      await dispatch(updateLead({ id, data: payload })).unwrap();
      alert("Lead updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
  const permissionArray = employeeData?.permissionArray;
   const isAdmin =employeeData?.role === "Admin";

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
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold">Update Lead</h2>

        {/* Dynamic Lead Fields */}
        <div className="grid grid-cols-2 gap-4">
          {leadSchema.map((field) => {
            const key = field.fieldKey;
            const value = formData[key] || "";

            // If field has options, render as select

            if (field.options && field.options.length > 0) {

              return (

                <div key={key}>
                  <label className="block font-medium">{field.label || key}</label>

                  <select
                    value={value}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="">Select {field.label || key}</option>

                    {(isAdmin || permissionArray.includes("ldEdit")) &&
                      field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                </div>

              );
            }

            // Default text input
            return (
              <div key={key}>
                <label className="block font-medium">{field.label || key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            );
          })}
        </div>

        {/* Assignments */}

        <div>
          <h3 className="font-semibold">Lead Assigned By You</h3>
          {(isAdmin || permissionArray.includes("ldEdit")) && (
            <div className="flex items-center gap-2 my-2">
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">Select Employee</option>
                {employeeList.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.employeeCode})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddAssignment}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Assign
              </button>
            </div>
          )}
          {assignments.length === 0 && <p className="text-gray-500">No assignments yet.</p>}
          {assignments.map((a, i) => (
            <div key={i} className="flex gap-4 border-b py-1">

              <p className="px-4 text-sm font-medium">To: {a.assignedTo?.name} ({a.assignedTo?.employeeCode})</p>
              <p className="px-4 text-sm font-medium">{new Date(a.assignedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Follow-Ups */}

        <div>
          <h3 className="font-semibold">Follow-Ups</h3>
          {(isAdmin || permissionArray.includes("ldEdit")) && (
            <div className="flex items-center gap-2 my-2">
              <input
                type="text"
                value={followUpMessage}
                onChange={(e) => setFollowUpMessage(e.target.value)}
                placeholder="Add follow-up message"
                className="border rounded px-2 py-1 flex-1"
              />
              <button
                onClick={handleAddFollowUp}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          )}
          {followUps.length === 0 && <p className="text-gray-500">No follow-ups yet.</p>}
          {followUps.map((fu, i) => (
            <div key={i} className="flex gap-4 border-b py-1">
              <p className="text-sm font-medium">
                {fu.addedBy?.name || "Unknown"}  - {fu.addedBy?.employeeCode || ""}
              </p>
              <p className="px-4 text-sm font-medium">{fu.messageContent}</p>
              <p className="px-4 text-sm font-medium">{new Date(fu.date).toLocaleString()}</p>
            </div>
          ))}

        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </CompanyLayout>
  );
}

export default LeadUpdate;
