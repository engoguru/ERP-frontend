// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
// import { updateLeave, viewOneLeave } from "../../../redux/slice/employee/leaveSlice";

// function LeavesProfile() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { leavesOne, loading } = useSelector(
//     (state) => state.reducer.leaves
//   );

//   const leave = leavesOne?.data;
//   const currentStatus = leave?.status;

//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     if (id) dispatch(viewOneLeave(id));
//   }, [dispatch, id]);
// // 
//   useEffect(() => {
//     if (currentStatus) setStatus(currentStatus);
//   }, [currentStatus]);

//   const handleUpdate = async () => {
//     await dispatch(updateLeave({ id, status }));
//     setStatus("");
//     navigate(-1);
//   };

//   const statusStyles = {
//     Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
//     Approved: "bg-green-100 text-green-700 border-green-300",
//     Reject: "bg-red-100 text-red-700 border-red-300",
//   };

//   if (!leave) {
//     return <CompanyLayout>Loading leave details...</CompanyLayout>;
//   }

//   return (
//     <CompanyLayout>
//       <div className="max-w-4xl mx-auto mt-10">
//         {/* HEADER */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Leave Application
//               </h2>
//               <p className="text-gray-500 mt-1">
//                 Employee leave request details
//               </p>
//             </div>

//             <span
//               className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${statusStyles[currentStatus]}`}
//             >
//               {currentStatus}
//             </span>
//           </div>
//         </div>

//         {/* DETAILS CARD */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <Info label="Employee Name" value={leave?.employeeId?.name} />
//             <Info label="Leave Type" value={leave?.leaveType} />

//             <Info
//               label="From Date"
//               value={new Date(leave?.fromDate).toLocaleDateString()}
//             />
//             <Info
//               label="To Date"
//               value={new Date(leave?.toDate).toLocaleDateString()}
//             />

//             <Info
//               label="Paid Days"
//               value={leave?.totalday?.totalPaid}
//             />
//             <Info
//               label="Unpaid Days"
//               value={leave?.totalday?.totalUnpaid}
//             />

//             <div className="col-span-full">
//               <p className="text-gray-500 font-medium mb-1">Reason</p>
//               <div className="bg-gray-50 border rounded-lg p-4 text-gray-800">
//                 {leave?.reason}
//               </div>
//             </div>

//             {/* APPROVED BY (only if exists) */}
//             {leave?.approvedBy && (
//               <div className="col-span-full">
//                 <p className="text-gray-500 font-medium mb-1">
//                   Approved / Reviewed By
//                 </p>
//                 <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
//                   <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
//                     {leave?.approvedBy?.name?.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="text-gray-800 font-semibold">
//                       {leave?.approvedBy?.name}
//                     </p>
//                     <p className="text-sm text-green-700">
//                       HR / Admin
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ACTION BAR */}
//           <div className="mt-8 border-t pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="col-span-2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Reject">Reject</option>
//               </select>

//               <button
//                 onClick={handleUpdate}
//                 disabled={status === currentStatus || loading}
//                 className={`py-2 rounded-lg font-semibold transition
//                   ${
//                     status === currentStatus
//                       ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//               >
//                 {loading ? "Updating..." : "Update Status"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </CompanyLayout>
//   );
// }

// const Info = ({ label, value }) => (
//   <div>
//     <p className="text-gray-500 font-medium">{label}</p>
//     <p className="text-gray-900 font-semibold mt-1">{value}</p>
//   </div>
// );

// export default LeavesProfile;





import React from "react";
import { ClipboardCheck } from "lucide-react";

function LeavesProfile({ balanceLeave }) {
  if (!balanceLeave?.numberOfLeaves) {
    return <p className="text-gray-500">No leave data available.</p>;
  }

  const { paidLeave, shortLeave, halfDay, roundMark } = balanceLeave.numberOfLeaves;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Paid Leaves" value={paidLeave} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Short Leaves" value={shortLeave} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Half Day Leaves" value={halfDay} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Round Mark Leaves" value={roundMark} icon={<ClipboardCheck size={18} />} />
    </div>
  );
}

/* Reusable StatCard component for this module */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-3">
    {icon && <div className="text-emerald-600">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-emerald-600">{value ?? 0}</p>
    </div>
  </div>
);

export default LeavesProfile;
