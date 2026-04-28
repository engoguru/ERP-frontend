// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
// import { sncServiceViewOne } from '../../../redux/slice/snc/sncserviceSlice';
// import { useParams } from 'react-router-dom';

// function SncMemberAddOnServiceView() {

//     const dispatch = useDispatch()
//     const { id } = useParams()
//     console.log(id)
//     // Example files (later replace with API data)
//     const { sncServiceOneDetail } = useSelector((state) => state.reducer.sncService)
//     useEffect(() => {
//         dispatch(sncServiceViewOne(id))
//     }, [id])
//     const files = sncServiceOneDetail?.data?.docs

//     console.log(sncServiceOneDetail, "opoo")
//     return (
//         <CompanyLayout pageTitle={"View Detail SNC Service"}>

//             <div className="max-w-3xl mx-auto px-4 py-6">

//                 <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                     Service Details

//                 </h1>

//                 <div className="bg-white shadow-md rounded-xl border border-gray-400 p-6 space-y-5">
//                     <span className="text-xs text-green-700 border rounded-xl mr-0 py-2 px-3"> PENDING</span>
//                     <div>
//                         <p className="text-sm text-gray-500 text-start">Service Name</p>
//                         <p className="text-base font-medium text-gray-800 border text-start border-gray-300 rounded-lg">{sncServiceOneDetail?.data?.serviceName}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500 text-start">Total Amount</p>
//                         <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹{sncServiceOneDetail?.data?.totalAmount}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500 text-start">Paid</p>
//                         <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹{sncServiceOneDetail?.data?.paidAmount}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500 text-start">Due</p>
//                         <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹{sncServiceOneDetail?.data?.unpaidAmount}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500 text-start">GST</p>
//                         <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹{sncServiceOneDetail?.data?.gstAmount}</p>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500 text-start">Other Expenses</p>
//                         <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹{sncServiceOneDetail?.data?.otherExpanses}</p>
//                     </div>

//                     {/* FILES SECTION */}
//                     <div>
//                         <p className="text-sm text-gray-500 mb-2">Documents</p>

//                         <div className="space-y-2">

//                             {sncServiceOneDetail?.data?.docs?.length > 0 ? (
//                                 sncServiceOneDetail.data.docs.map((file, index) => (
//                                     <div
//                                         key={index}
//                                         className="flex items-center justify-between bg-gray-300 border border-gray-300 rounded-lg px-3 py-2"
//                                     >
//                                         <a href={file?.url} target="_blank" rel="noreferrer">
//                                             <img
//                                                 src={file?.url}
//                                                 alt={`file-${index}`}
//                                                 className="w-20 h-20 object-cover rounded cursor-pointer"
//                                             />
//                                         </a>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-sm text-gray-400">No files uploaded</p>
//                             )}

//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </CompanyLayout>
//     );
// }

// export default SncMemberAddOnServiceView; 












import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { sncServiceViewOne } from '../../../redux/slice/snc/sncserviceSlice';
import { useParams } from 'react-router-dom';

/* ── helpers ── */
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

const StatusBadge = ({ status }) => {
  const map = {
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending:   "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  const s = (status || "pending").toLowerCase();
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border ${map[s] || map.pending}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 inline-block" />
      {status || "Pending"}
    </span>
  );
};

const InfoRow = ({ label, value, accent }) => {
  const accentVal = accent === "green"
    ? "text-emerald-700"
    : accent === "red"
    ? "text-red-700"
    : accent === "blue"
    ? "text-blue-700"
    : "text-gray-900";

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
      <span className={`text-sm font-semibold ${accentVal}`}>{value}</span>
    </div>
  );
};

const SectionHeader = ({ icon, label }) => (
  <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
    <span className="w-6 h-6 rounded-md bg-white border border-gray-200 inline-flex items-center justify-center text-xs shadow-sm">
      {icon}
    </span>
    <span className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">{label}</span>
  </div>
);

function SncMemberAddOnServiceView() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { sncServiceOneDetail } = useSelector((state) => state.reducer.sncService);

  useEffect(() => {
    dispatch(sncServiceViewOne(id));
  }, [id]);

  const data = sncServiceOneDetail?.data;
  const files = data?.docs;

  const total = Number(data?.totalAmount || 0);
  const paid  = Number(data?.paidAmount  || 0);
  const due   = Number(data?.unpaidAmount || 0);
  const gst   = Number(data?.gstAmount   || 0);

  return (
    <CompanyLayout pageTitle="View Detail SNC Service">
      {/* Black outer page */}
      <div className="min-h-screen bg-gray-300">
        <div className="max-w-[780px] mx-auto px-5 py-8">

          {/* ── Page Header ── */}
          <div className="mb-7">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-medium">
              <span className="hover:text-gray-400 cursor-pointer transition-colors">SNC Members</span>
              <span className="text-gray-700">›</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Add-On Services</span>
              <span className="text-gray-700">›</span>
              <span className="text-gray-400">View</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-gray-600 tracking-tight leading-tight">
                  Service Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  View complete information about this add-on service
                </p>
              </div>
              <StatusBadge status={data?.status} />
            </div>
          </div>

          {/* ── Summary Chips ── */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Total",  val: `₹${fmt(total)}`, cls: "bg-white border-gray-200 text-gray-900" },
              { label: "Paid",   val: `₹${fmt(paid)}`,  cls: "bg-emerald-50 border-emerald-200 text-emerald-700" },
              { label: "Due",    val: `₹${fmt(due)}`,   cls: due > 0 ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700" },
              { label: "GST",    val: `₹${fmt(gst)}`,   cls: "bg-blue-50 border-blue-200 text-blue-700" },
            ].map(({ label, val, cls }) => (
              <div key={label} className={`${cls} border rounded-xl p-3.5 shadow-sm`}>
                <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</div>
                <div className="text-[17px] font-bold tracking-tight">{val}</div>
              </div>
            ))}
          </div>

          {/* ── Cards Stack ── */}
          <div className="space-y-px">

            {/* ── Service Info ── */}
            <div className="bg-white border border-gray-200 rounded-t-xl overflow-hidden shadow-sm">
              <SectionHeader icon="⚙" label="Service info" />
              <div className="px-5 divide-y divide-gray-100">
                <InfoRow label="Service Name" value={data?.serviceName || "—"} />
                <InfoRow label="Status" value={
                  <StatusBadge status={data?.status} />
                } />
              </div>
            </div>

            {/* ── Financial Details ── */}
            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
              <SectionHeader icon="₹" label="Financial details" />
              <div className="px-5 divide-y divide-gray-100">
                <InfoRow label="Total Amount"   value={`₹${fmt(total)}`} />
                <InfoRow label="Paid Amount"    value={`₹${fmt(paid)}`}  accent="green" />
                <InfoRow label="Due Amount"     value={`₹${fmt(due)}`}   accent={due > 0 ? "red" : "green"} />
                <InfoRow label="GST Amount"     value={`₹${fmt(gst)}`}   accent="blue" />
                <InfoRow label="Other Expenses" value={`₹${fmt(data?.otherExpanses)}`} />
              </div>
            </div>

            {/* ── Documents ── */}
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
              <SectionHeader icon="📄" label="Documents" />
              <div className="p-5">
                {files?.length > 0 ? (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
                    {files.map((file, index) => (
                      <a
                        key={index}
                        href={file?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-300 shadow-sm hover:shadow-md transition-all duration-150 block"
                      >
                        <img
                          src={file?.url}
                          alt={`file-${index}`}
                          className="w-full h-full object-cover block transition-transform duration-200 group-hover:scale-105"
                        />
                        {/* hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-150 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100">
                          <span className="text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded-full">
                            Open ↗
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-lg mb-2">
                      📂
                    </div>
                    <p className="text-sm text-gray-400 font-medium">No documents uploaded</p>
                    <p className="text-xs text-gray-300 mt-0.5">Files will appear here once added</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="bg-white border border-gray-200 rounded-xl mt-3 px-5 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
              Read-only view — no changes will be saved
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="h-9 px-5 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer font-[inherit] flex items-center gap-1.5"
            >
              ← Back
            </button>
          </div>

        </div>
      </div>
    </CompanyLayout>
  );
}

export default SncMemberAddOnServiceView;
