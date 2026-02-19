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

  const { companyConfigureViewData } = useSelector(state => state.reducer.company);
  const leadSchema = companyConfigureViewData?.data?.leadForm || [];

  const { leadDetail, loading } = useSelector(state => state.reducer.lead);
  const { employeeList = [] } = useSelector(state => state.reducer.employee);
  const { initialized, employeeData } = useSelector(state => state.reducer.login);

  const [formData, setFormData] = useState({});
  const [followUps, setFollowUps] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // OnConfirmed modal states
  const [contact, setContact] = useState({});
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [unpaidAmount, setUnpaidAmount] = useState("");
  const [nameOfService, setNameOfService] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  // const [date, setDate] = useState("");

  const permissionArray = employeeData?.permissionArray;
  const isAdmin = employeeData?.role === "Admin";

  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
    dispatch(companyConfiguresView());
    if (id) dispatch(fetchOneLead(id));
    dispatch(viewEmployees());
  }, [initialized, dispatch, id]);

  useEffect(() => {
    if (leadDetail) {
      setFormData(leadDetail.fields || {});
      setFollowUps(leadDetail.followUp || []);
      setAssignments(leadDetail.whoAssignedwho || []);
    }
  }, [leadDetail]);

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (key === "status" && value === "Confirmed") setOpenModal(true);
  };

  const handleAddFollowUp = () => {
    if (!followUpMessage) return alert("Enter follow-up message!");
    setFollowUps(prev => [
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
    const employee = employeeList.find(
      e => `${e.name} (${e.employeeCode})` === selectedEmployee
    );
    if (!employee) return alert("Invalid employee selected!");
    setAssignments(prev => [
      ...prev,
      { assignedBy: employeeData?.id, assignedTo: employee, assignedAt: new Date().toISOString() },
    ]);
    setSelectedEmployee("");
  };

  const handleRemoveAssignment = employeeId => {
    setAssignments(prev => prev.filter(a => a.assignedTo?._id !== employeeId));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        fields: formData,
        followUp: followUps.map(fu => ({ ...fu, addedBy: employeeData?.id })),
        whoAssignedwho: assignments,
      };
      await dispatch(updateLead({ id, data: payload })).unwrap();
      alert("Lead updated successfully!");
      navigate(0);
    } catch (err) {
      console.error(err);
      alert("Update failed");
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
      <div className="max-w-5xl mx-auto px-6 py-0 space-y-2">
        <h2 className="text-2xl font-bold">Update Lead</h2>

        {/* Dynamic Fields */}
        <div className="grid grid-cols-2 ">
          {leadSchema.map(field => {
            const key = field.fieldKey;
            const value = formData[key] || "";
            if (field.options?.length > 0) {
              return (
                <div key={key}>
                  <label className="block font-medium">{field.label || key}</label>
                  <select
                    value={value}
                    onChange={e => handleFieldChange(key, e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    disabled={value === "Confirmed" && !isAdmin}
                  >
                    {value === "Confirmed" ? <option value="">{value}</option> : <option value="">Select {field.label || key}</option>}
                    {value !== "Confirmed" && (isAdmin || permissionArray.includes("ldEdit")) &&
                      field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              );
            }
            return (
              <div key={key} className="mx-3 my-1">
                <label className="block text-sm font-medium">{field.label || key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={e => handleFieldChange(key, e.target.value)}
                  className="w-full border text-xs font-semibold rounded px-2  py-1"
                  disabled
                />
              </div>
            );
          })}
        </div>

        {leadDetail?.fields?.status === "Confirmed" && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-6">

            {/* Heading */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-md  font-semibold text-gray-800">
                Confirmed Services 
                 {(isAdmin || permissionArray.includes("ldAssign")) && (
                 <span className="text-xs ps-2 font-bold text-red-500 cursor-pointer" onClick={() => setOpenModal(true)}>
                  Add New</span>)}
              </h2>
              <span className="text-sm text-gray-500">
                Total: {leadDetail?.OnConfirmed?.length || 0}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-400">
              <table className="min-w-full text-xs text-left text-gray-700">

                {/* Table Head */}
                <thead className="bg-gray-100 text-xs  tracking-wider text-gray-600 border-b border-gray-600">
                  <tr>
                    <th className="px-2 py-2">Service</th>
                    <th className="px-2 py-2">Description</th>
                    <th className="px-2 py-2">Total</th>
                    <th className="px-2 py-2">Paid</th>
                    <th className="px-2 py-2">Unpaid</th>
                    <th className="px-2 py-2">Contact</th>
                    <th className="px-2 py-2">Date</th>
                    <th className="px-2 py-2">Added By</th>
                    <th className="px-2 py-2">Docs</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {leadDetail?.OnConfirmed?.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition border-b border-gray-300 shadow-lg">

                      <td className="px-2 py-2 font-medium text-gray-800">
                        {item.nameOfService}
                      </td>

                      <td className="px-2 py-2 text-gray-600">
                        {item.description}
                      </td>

                      <td className="px-2 py-2 text-gray-800 font-semibold">
                        ₹ {item.totalAmount}
                      </td>

                      <td className="px-2 py-2 text-green-600 font-medium">
                        ₹ {item.paidAmount}
                      </td>

                      <td className="px-2 py-2 text-red-500 font-medium">
                        ₹ {item.unpaidAmount}
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex flex-col">
                          <span>{item.contact?.name}</span>
                          <span className="text-xs text-gray-500">
                            {item.contact?.phone}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        {new Date(item.date).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-3">
                        {item.addedBy?.name || "-"}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex gap-2 flex-wrap">
                          {[...(item.files || []), ...(item.OnConfirmedFiles || [])]
                            ?.filter(file => file.url)
                            ?.map((file) => (
                              <img
                                key={file._id}
                                src={file.url}
                                alt="file"
                                className="w-14 h-14 object-cover rounded border cursor-pointer hover:scale-105 transition"
                                onClick={() => window.open(file.url, "_blank")}
                              />
                            ))}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments */}
        <div>
          <h3 className="font-semibold">Lead Assigned</h3>
          {(isAdmin || permissionArray.includes("ldassign")) && (
            <div className="flex items-center gap-2 my-2">
              <input
                list="employees"
                value={selectedEmployee}
                onChange={e => setSelectedEmployee(e.target.value)}
                placeholder="Type Employee Name.."
                className="border rounded px-2 py-1 w-72"
              />
              <datalist id="employees">
                {employeeList.map(emp => (
                  <option key={emp._id} value={`${emp.name} (${emp.employeeCode})`} />
                ))}
              </datalist>
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
              <p className="px-4">
                <span className="text-xs font-medium">{a.assignedBy.name}</span>
                <span className="font-bold px-5 text-xs"> : </span>
                <span className="font-semibold text-xs">
                  {a.assignedTo?.name} ({a.assignedTo?.employeeCode})
                </span>
              </p>
              <p className="px-4 text-xs font-medium">{new Date(a.assignedAt).toLocaleString()}</p>
              {(isAdmin || permissionArray.includes("ldassign")) && (
                <button
                  onClick={() => handleRemoveAssignment(a.assignedTo._id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
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
                onChange={e => setFollowUpMessage(e.target.value)}
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
              <p className="text-xs font-medium">
                {fu.addedBy?.name || "Unknown"} - {fu.addedBy?.employeeCode || ""}
              </p>
              <p className="px-4 text-xs font-medium">{fu.messageContent}</p>
              <p className="px-4 text-xs font-medium">{new Date(fu.date).toLocaleString()}</p>
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

      {/* OnConfirmed Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Lead Details</h3>
            <form
              onSubmit={async e => {
                e.preventDefault();

                try {
                  const formPayload = new FormData();

                  // OnConfirmed fields
                  formPayload.append("OnConfirmed[contact]", JSON.stringify(contact));
                  formPayload.append("OnConfirmed[totalAmount]", totalAmount);
                  formPayload.append("OnConfirmed[paidAmount]", paidAmount);
                  formPayload.append("OnConfirmed[unpaidAmount]", unpaidAmount);
                  formPayload.append("OnConfirmed[nameOfService]", nameOfService);
                  formPayload.append("OnConfirmed[description]", description);
                  formPayload.append("OnConfirmed[addedBy]", employeeData?.id);
                  // formPayload.append("OnConfirmed[date]", date);

                  // Files
                  files.forEach(file => formPayload.append("OnConfirmedFiles", file));

                  // Other fields + auto-update status
                  formPayload.append("fields", JSON.stringify({ ...formData, status: "Confirmed" }));

                  await dispatch(updateLead({ id, data: formPayload })).unwrap();
                  await dispatch(employeeDetails())
                  alert("Lead confirmed successfully!");

                  setOpenModal(false);

                  // Reset modal fields
                  setContact({});
                  setTotalAmount(""); setPaidAmount(""); setUnpaidAmount("");
                  setNameOfService(""); setDescription(""); setFiles([]);

                } catch (err) {
                  console.error(err);
                  alert("Failed to confirm lead");
                }
              }}
            >
              {/* Contact */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input type="text" value={contact?.name || ""} onChange={e => setContact(prev => ({ ...prev, name: e.target.value }))} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input type="email" value={contact?.email || ""} onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))} className="border rounded px-2 py-1 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input type="text" value={contact?.phone || ""} onChange={e => setContact(prev => ({ ...prev, phone: e.target.value }))} className="border rounded px-2 py-1 w-full" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Paid</label>
                    <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)} className="border rounded px-2 py-1 w-full" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Unpaid</label>
                    <input type="number" value={unpaidAmount} onChange={e => setUnpaidAmount(e.target.value)} className="border rounded px-2 py-1 w-full" />
                  </div>
                </div>
              </div>

              {/* Total Amount + Service */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium">Total Amount</label>
                  <input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Name of Service</label>
                  <input type="text" value={nameOfService} onChange={e => setNameOfService(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="border rounded px-2 py-1 w-full" />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Files</label>
                <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files))} className="border rounded px-2 py-1 w-full" />
                <small className="text-gray-200">Files will be uploaded</small>
              </div>


              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setOpenModal(false)} className="px-3 py-1 rounded border">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </CompanyLayout>
  );
}

export default LeadUpdate;
