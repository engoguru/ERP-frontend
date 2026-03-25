import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView, getDepartment, getRole } from "../../redux/slice/companySlice";
import { fetchOneLead, updateLead } from "../../redux/slice/leadSlice";
import { viewEmployees } from "../../redux/slice/employee/employeeCreateSlice";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";

function LeadUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const location = useLocation();
  const params = useParams();
  const leadId = params.id;

  const queryParams = new URLSearchParams(location.search);
  const previousPage = queryParams.get("page") || 1;
  const limit = queryParams.get("limit") || 10; // fallback to 1

  const { companyConfigureViewData } = useSelector(state => state.reducer.company);
  const leadSchema = companyConfigureViewData?.data?.leadForm || [];

  const { leadDetail, loading } = useSelector(state => state.reducer.lead);
  const { employeeList = [] } = useSelector(state => state.reducer.employee);
  const { initialized, employeeData } = useSelector(state => state.reducer.login);

  const [formData, setFormData] = useState({});
  const [followUps, setFollowUps] = useState([]);
  const [nextFollowUpDate, setnextFollowUpDate] = useState()
  const [assignments, setAssignments] = useState([]);
  const [roleID, setRoleId] = useState()
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [departmentName, setDepartmentName] = useState("");
  // OnConfirmed modal states
  const [contact, setContact] = useState({});
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [unpaidAmount, setUnpaidAmount] = useState("");
  const [nameOfService, setNameOfService] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  // const [date, setDate] = useState("");
  const [statusRecord, setStatusRecord] = useState([])
  const permissionArray = employeeData?.permissionArray;
  const isAdmin = employeeData?.role === "Admin";
  const { viewAllRole } = useSelector((state) => state.reducer.company);
  const { viewAllDepartment } = useSelector((state) => state.reducer.company);
  useEffect(() => {
    if (employeeData?.permissionArray?.includes("ldprocessor")) {
      dispatch(getDepartment());
    }
  }, [employeeData])

  useEffect(() => {
    if (employeeData?.permissionArray?.includes("ldprocessor")) {
      dispatch(getRole(departmentName));
    }

    if (employeeData?.permissionArray?.includes("ldassign") || isAdmin) {
      dispatch(getRole("Business Development"));
    }

    if (/manager/i.test(employeeData?.role)) {
      dispatch(getRole(employeeData?.department));
    }
  }, [dispatch, employeeData, departmentName, isAdmin]);

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

  // const handleFieldChange = (key, value) => {
  //   setFormData(prev => ({ ...prev, [key]: value }));
  //   alert("Are you Confirm ?")
  //   if (key === "status" && value === "Confirmed") setOpenModal(true);
  // };
  // const handleFieldChange = (key, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [key]: value
  //   }));
  //   // console.log(key, value, "oo")
  //   // Only track status changes
  //   if (key === "status" && employeeData?.roleID && employeeData?.id) {
  //     const newStatusEntry = {
  //       roleId: employeeData.roleID,
  //       userId: employeeData.id,
  //       status: value,
  //       changedAt: new Date()
  //     };

  //     //  
  //     if (value === "Confirmed") {
  //       setStatusRecord(prev => {
  //         const updated = [...(prev || []), newStatusEntry];
  //         setTimeout(() => setOpenModal(true), 50); // modal opens after state is set
  //         return updated;
  //       });
  //     } else {
  //       setStatusRecord(prev => [...(prev || []), newStatusEntry]);
  //     }
  //     if (value === "Confirmed") {
  //       setOpenModal(true); // show modal for Confirmed
  //     }
  //   }
  // };
  const handleFieldChange = (key, value) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value };
      console.log("Updated data:", updated);
      return updated;
    });
    console.log(key, value, formData, "opop")
    if (key === "status" && employeeData?.roleID && employeeData?.id) {
      const newStatusEntry = {
        roleId: employeeData.roleID,
        userId: employeeData.id,
        status: value,
        changedAt: new Date()
      };

      setStatusRecord(prev => [...(prev || []), newStatusEntry]);
    }
  };
  useEffect(() => {
    const lastStatus = statusRecord?.[statusRecord.length - 1];

    if (lastStatus?.status === "Confirmed") {
      setOpenModal(true);
    }
  }, [statusRecord]);
  // const handleAddFollowUp = () => {
  //   if (!followUpMessage) return alert("Enter follow-up message!");
  //   setFollowUps(prev => [
  //     ...prev,
  //     {
  //       addedBy: {
  //         // _id: employeeData?.id,
  //         _id: employeeData?.roleID,
  //         name: employeeData?.name,
  //         employeeCode: employeeData?.employeeCode,
  //       },
  //       date: new Date().toISOString(),
  //       messageContent: followUpMessage,
  //     },
  //   ]);
  //   setFollowUpMessage("");
  // };


  const handleAddFollowUp = () => {
    if (!followUpMessage) return alert("Enter follow-up message!");
    if (!nextFollowUpDate) return alert("Select next follow-up date!");
    const hasPending = followUps.some(fu => fu.status === "pending");

    if (hasPending) {
      return alert("Please complete the existing pending follow-up first.");
    }
    setFollowUps(prev => [
      ...prev,
      {
        addedBy: {
          _id: employeeData?.roleID,
          name: employeeData?.name,
          employeeCode: employeeData?.employeeCode,
        },
        date: new Date().toISOString(), // created date
        nextFollowUpDate: new Date(nextFollowUpDate).toISOString(), // due date
        messageContent: followUpMessage,
        status: "pending", // important
      },
    ]);

    setFollowUpMessage("");
    setnextFollowUpDate("");
  };

  const handleCompleteFollowUp = (index) => {
    setFollowUps(prev =>
      prev.map((fu, i) =>
        i === index
          ? {
            ...fu,
            status: "completed",
            completedAt: new Date().toISOString(),
          }
          : fu
      )
    );
  };
  const handleAddAssignment = () => {
    if (!selectedEmployee) return alert("Select a role!");

    // Find employee whose roleID matches the selected role
    const employee = employeeList.find(e => e.roleID === selectedEmployee);
    if (!employee) return alert("No employee found for this role!");

    // Add to assignments state
    setAssignments(prev => [
      ...prev,
      {
        assignedBy: employeeData?.id, // logged-in user ID
        assignedTo: employee._id,      // employee ID
        assignedAt: new Date().toISOString(),
      },
    ]);
    setRoleId(selectedEmployee)

    // Clear selection
    setSelectedEmployee("");
  };

  const handleRemoveAssignment = employeeId => {
    setAssignments(prev => prev.filter(a => a.assignedTo?._id !== employeeId));
  };
  // console.log(companyConfigureViewData,"kll")
  const handleSubmit = async () => {
    // console.log(formData,"pp")
    try {
      const payload = {
        fields: formData,
        statusRecord: statusRecord, // separate array
        followUp: followUps.map(fu => ({ ...fu, addedBy: employeeData?.id })),
        whoAssignedwho: assignments,
        roleID: roleID,
      };

      // console.log(payload, "opterrerfgerffer")
      await dispatch(updateLead({ id, data: payload })).unwrap();
      alert("Lead updated successfully!");
      // navigate(0);
      // Go back to the list on the same page
      // navigate(`/users/edit/${id}?page=${page}&limit=${limit}`);
      navigate(`/company/leadall?page=${previousPage}&limit=${limit}`);
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
  // console.log(viewAllRole, "kj")
  return (
    <CompanyLayout >
      <div className="max-w-5xl border-2 border-gray-500 mx-auto px-6 py-0 my-4 rounded-lg shadow-xl/30 space-y-2">
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
                  disabled={!isAdmin}
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
                {(isAdmin || permissionArray.includes("ldprocessor")) && (
                  <span className="text-xs ps-2 font-bold text-red-500 cursor-pointer" onClick={() => setOpenModal(true)}>
                    Add New</span>)}
              </h2>
              <span className="text-sm text-gray-500">
                Total: {leadDetail?.OnConfirmed?.length || 0}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs text-left text-gray-700 border border-gray-400 border-collapse">

                {/* Table Head */}
                <thead className="bg-gray-200 text-xs tracking-wider text-gray-700">
                  <tr>


                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Service</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Description</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Total</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Paid</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Unpaid</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Contact</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Date</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Added By</th>
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Docs</th>
                    {(isAdmin || /manager/i.test(employeeData?.role)) && (<th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Status</th>)}
                    <th className="border-2 border-gray-600 text-gray-900 px-2 py-1">Total Time</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {leadDetail?.OnConfirmed?.map((item) => {

                    const lastStatus = item?.status?.at(-1)?.label;

                    return (
                      <tr key={item._id} className="hover:bg-gray-300 transition">

                        <td className="border border-gray-500 px-2 py-1 font-medium text-gray-800">
                          {item.nameOfService}
                        </td>

                        <td className="border border-gray-500 px-2 py-1 font-medium text-gray-800">
                          {item.description}
                        </td>

                        <td className="border border-gray-500 px-2 py-1 font-semibold">
                          ₹ {item.totalAmount}
                        </td>

                        <td className="border border-gray-500 px-2 py-1 text-green-600 font-medium">
                          ₹ {item.paidAmount}
                        </td>

                        <td className="border border-gray-500 px-2 py-1 text-red-500 font-medium">
                          ₹ {item.unpaidAmount}
                        </td>

                        <td className="border border-gray-500 px-2 py-1">
                          <div className="flex flex-col text-xs">
                            <span>{item.contact?.name}</span>
                            <span className="text-xs text-gray-500">
                              {item.contact?.phone}
                            </span>
                          </div>
                        </td>

                        <td className="border border-gray-500 px-2 py-1">
                          {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                        </td>

                        <td className="border border-gray-500 px-2 py-1">
                          {item.addedBy?.name || "-"}
                        </td>

                        {/* Files */}
                        <td className="border border-gray-500 px-2 py-1">
                          <div className="flex gap-1 flex-wrap">
                            {[...(item.files || []), ...(item.OnConfirmedFiles || [])]
                              ?.filter(file => file?.url)
                              ?.map((file) => (
                                <img
                                  key={file._id}
                                  src={file.url}
                                  alt="file"
                                  className="w-11 h-11 object-cover rounded border cursor-pointer hover:scale-110 transition"
                                  onClick={() => window.open(file.url, "_blank")}
                                />
                              ))}
                          </div>
                        </td>

                        {/* Status */}
                        {(isAdmin || /manager/i.test(employeeData?.role)) && (
                          <td className="border border-gray-500 px-2 py-1">
                            <select
                              value={lastStatus || ""}
                              onChange={async (e) => {
                                const newStatus = e.target.value;

                                const formPayload = {
                                  status: [
                                    ...(Array.isArray(item.status) ? item.status : []),
                                    {
                                      label: newStatus,
                                      addedBy: employeeData.id,
                                      date: new Date().toISOString(),
                                    },
                                  ],
                                };

                                try {
                                  await dispatch(
                                    updateLead({
                                      id,
                                      objId: item._id,
                                      data: formPayload,
                                    })
                                  ).unwrap();
                                } catch (err) {
                                  console.error("Failed to update lead:", err);
                                }
                              }}
                              className="border rounded px-1 py-1"
                            >
                              <option value="" disabled>
                                Update Status
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>)}

                        {/* Total Time */}
                        <td className="border border-gray-500 px-2 py-1 font-bold">
                          {lastStatus === "Completed"
                            ? `${item.totalTime} Days`
                            : lastStatus === "Ongoing"
                              ? "Processing.."
                              : lastStatus === "Pending"
                                ? "Not started"
                                : "-"}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* Assignments */}
        <div>
          <h3 className="font-semibold flex">Lead Assigned</h3>
          {(isAdmin || permissionArray.includes("ldassign")) && (
            <div className="flex items-center gap-2 my-2">
              <select
                value={selectedEmployee} // use existing state
                onChange={e => setSelectedEmployee(e.target.value)}
                className="border rounded px-2 py-1 w-72"
              >
                <option value="">Select Role...</option>
                {viewAllRole?.roles
                  .filter(role => role.assign === true)
                  .map(role => (
                    <option key={role._id} value={role._id}>
                      {role.role}
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
          {(permissionArray.includes("ldprocessor")) && (
            <>
              <p label="Select Department" className="flex items-center gap-2 my-2" >
                <select
                  className="input border rounded px-2 py-1 w-72"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                >
                  <option value="">-- Select Department --</option>
                  {viewAllDepartment?.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </p>

              {departmentName && (
                <div className="flex items-center gap-2 my-2">
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="border rounded px-2 py-1 w-72"
                  >
                    <option value="">Select Manager...</option>

                    {viewAllRole?.roles
                      ?.filter(
                        (role) =>
                          role.assign &&
                          /Manager/i.test(role.role)
                      )
                      .map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.role}
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
            </>
          )}
          {(/manager/i.test(employeeData?.role)) && (
            <>
              <div className="flex items-center gap-2 my-2">
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="border rounded px-2 py-1 w-72"
                >
                  <option value="">Select Manager...</option>

                  {viewAllRole?.roles
                    ?.filter(
                      (role) =>
                        role.assign &&
                        !/Manager/i.test(role.role)
                    )
                    .map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.role}
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
            </>
          )}
          {assignments?.length === 0 && <p className="text-gray-500">No assignments</p>}
          {assignments?.map((a, i) => (
            <div key={i} className="flex gap-4 border-b py-1">
              <p className="px-4">
                <span className="text-xs font-medium">{a?.assignedBy?.name}</span>
                <span className="font-bold px-5 text-xs"> : </span>
                <span className="font-semibold text-xs">
                  {a.assignedTo?.name} -  {a.assignedTo?.role}
                </span>
              </p>
              <p className="px-4 text-xs font-medium">{new Date(a?.assignedAt).toLocaleString()}</p>
              {(isAdmin || permissionArray.includes("ldassign")) && (
                <button
                  onClick={() => handleRemoveAssignment(a?.assignedTo._id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Follow-Ups */}
        {(isAdmin || permissionArray.includes("ldfollowUp")) && (
          <div>
            <h3 className="font-semibold">Follow-Ups</h3>
            {/* {(isAdmin || permissionArray.includes("ldEdit")) && (
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
          )} */}

            <div className="flex items-center gap-2 my-2">
              <input
                type="text"
                value={followUpMessage}
                onChange={e => setFollowUpMessage(e.target.value)}
                placeholder="Add next follow-up message"
                className="border rounded px-2 py-1 flex-1"
              />

              <input
                type="date"
                value={nextFollowUpDate || ""}
                min={new Date().toISOString().split("T")[0]}   // prevents past dates
                onChange={e => setnextFollowUpDate(e.target.value)}
                className="border rounded px-2 py-1"
              />

              <button
                onClick={handleAddFollowUp}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>


            {followUps.length === 0 && <p className="text-gray-500">No follow-ups yet.</p>}
            {/* {followUps.map((fu, i) => (
            <div key={i} className="flex gap-4 border-b py-1">
              <p className="text-xs font-medium">
                {fu.addedBy?.name || "Unknown"} - {fu.addedBy?.employeeCode || ""}
              </p>
              <p className="px-4 text-xs font-medium">{fu.messageContent}</p>
              <p className="px-4 text-xs font-medium">{new Date(fu.date).toLocaleString()}</p>
               <p className="px-4 text-xs font-medium">{new Date(fu.nextFollowUpDate).toLocaleString()}</p>
              <p
                className={`px-4 text-xs font-medium ${fu.status === "pending"
                    ? "text-red-600"
                    : fu.status === "completed"
                      ? "text-green-600"
                      : ""
                  }`}
              >
                {fu.status}
              </p>
               <p className="px-4 text-xs font-medium">{new Date(fu.completedAt).toLocaleString()}</p>
              {fu.status === "pending" && (
                <button
                  onClick={() => handleCompleteFollowUp(i)}
                  className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))} */}
            <table className="min-w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1 text-left">Added By</th>
                  {/* <th className="border px-2 py-1 text-left">Employee Code</th> */}
                  <th className="border px-2 py-1 text-left">Message</th>
                  <th className="border px-2 py-1 text-left">Date</th>
                  <th className="border px-2 py-1 text-left">Next Follow-Up</th>
                  <th className="border px-2 py-1 text-left">Status</th>
                  <th className="border px-2 py-1 text-left">Completed At</th>
                  <th className="border px-2 py-1 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((fu, i) => (
                  <tr key={i} className="border-b">
                    <td className="border px-2 py-1">{fu.addedBy?.name || "Unknown"}</td>
                    {/* <td className="border px-2 py-1">{fu.addedBy?.employeeCode || ""}</td> */}
                    <td className="border px-2 text-start py-1 font-medium">{fu.messageContent}</td>
                    <td className="border px-2 py-1">{new Date(fu.date).toLocaleString()}</td>
                    <td className="border px-2 py-1">
                      {fu.nextFollowUpDate ? new Date(fu.nextFollowUpDate).toLocaleDateString() : "-"}
                    </td>
                    <td
                      className={`border px-2 py-1 font-medium ${fu.status === "pending"
                        ? "text-red-600"
                        : fu.status === "completed"
                          ? "text-green-600"
                          : ""
                        }`}
                    >
                      {fu.status}
                    </td>
                    <td className="border px-2 py-1">
                      {fu.completedAt ? new Date(fu.completedAt).toLocaleString() : "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {fu.status === "pending" && (
                        <button
                          onClick={() => handleCompleteFollowUp(i)}
                          className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
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
                  if (!files || files.length === 0) {
                    alert("Please upload at least one file");
                    return;
                  }
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
                  // ✅ Correct way to send array
                  formPayload.append("statusRecord", JSON.stringify(statusRecord));
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
                <label className="block text-sm font-medium text-red-00">
                  Files <span className="text-red-800">*</span>
                </label>
                <input type="file" required multiple onChange={e => setFiles(Array.from(e.target.files))} className="border rounded px-2 py-1 w-full" />
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
