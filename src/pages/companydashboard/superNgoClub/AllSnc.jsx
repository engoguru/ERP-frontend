// import React, { useEffect } from "react";
// import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { allSncEligible, allSncId } from "../../../redux/slice/snc/sncregisterSlice";

// function AllSnc() {
//     const dispatch = useDispatch()


//     const { sncEligibleData, sncIdData } = useSelector((state) => state?.reducer.snc)

//     useEffect(() => {
//         dispatch(allSncEligible())
//         dispatch(allSncId())
//     }, [])
//     // console.log(sncIdData)

//     return (
//         <CompanyLayout pageTitle={"SNC"}>
//             <div className="max-w-6xl mx-auto px-4 py-6">

//                 {/* Heading */}
//                 <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//                     All Super NGO Club Members
//                 </h1>

//                 {/* Table Container */}
//                 <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

//                     <div className="overflow-x-auto">
//                         <table className="min-w-full text-sm text-left">

//                             {/* Table Head */}
//                             <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
//                                 <tr>
//                                     <th className="px-4 py-3">S.No</th>
//                                     <th className="px-4 py-3">Name</th>
//                                     <th className="px-4 py-3">Email</th>
//                                     <th className="px-4 py-3">Contact</th>
//                                     <th className="px-4 py-3 text-center">Actions</th>
//                                 </tr>
//                             </thead>

//                             {/* Table Body */}
//                             <tbody className="divide-y divide-gray-200">
//                                 {sncEligibleData?.data?.map((m, index) => (
//                                     <tr
//                                         key={m._id}
//                                         className="hover:bg-gray-50 transition"
//                                     >
//                                         <td className="px-4 py-3">{index + 1}</td>
//                                         <td className="px-4 py-3 font-medium text-gray-800">
//                                             {m.name}
//                                         </td>
//                                         <td className="px-4 py-3 text-gray-600">
//                                             {m.email}
//                                         </td>
//                                         <td className="px-4 py-3 text-gray-600">
//                                             {m.contact}
//                                         </td>

//                                         {/* Actions */}
//                                         <td className="px-4 py-3">
//                                             <div className="flex flex-wrap gap-2 justify-center">
//                                                 {!sncIdData.data.some(id => id.retreat_id === m._id) && (
//                                                     <Link
//                                                         to={`/company/createsnc?id=${m._id}`}
//                                                         className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg shadow-sm"
//                                                     >
//                                                         Club+
//                                                     </Link>
//                                                 )}
//                                                  {sncIdData.data.some(id => id.retreat_id === m._id) && (
//                                                 <Link
//                                                     to={`/company/addon/service/${m._id}`}
//                                                     className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg shadow-sm"
//                                                 >
//                                                     Add-On
//                                                 </Link>
//                                                  )}
//                                                 {sncIdData.data.some(id => id.retreat_id === m._id) && (
//                                                     <Link
//                                                         to={`/company/updatesnc/${m._id}`}
//                                                         className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg shadow-sm"
//                                                     >
//                                                         Edit
//                                                     </Link>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </CompanyLayout>
//     );
// }

// export default AllSnc;

import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allSncEligible, allSncId } from "../../../redux/slice/snc/sncregisterSlice";

function AllSnc() {
  const dispatch = useDispatch();

  const { sncEligibleData, sncIdData } = useSelector((state) => state?.reducer.snc);

  useEffect(() => {
    dispatch(allSncEligible());
    dispatch(allSncId());
  }, []);

  let members = sncEligibleData?.data || [];
  const sncIds = sncIdData?.data || [];

  //  FILTER LOGIC
  const [search, setSearch] = useState("");
  members = members.filter((item) => {
    const matchSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchSearch
  });

  return (
    <CompanyLayout pageTitle="SNC">
      {/* ── Page wrapper — gray-300 background ── */}
      <div className="min-h-screen bg-gray-300">
        <div className="max-w-6xl mx-auto px-5 py-8">

          {/* ── Page Header ── */}
          <div className="mb-6">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-medium">
              <span>Dashboard</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700 font-semibold">SNC Members</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-tight">
                  Super NGO Club Members
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and view all eligible SNC members
                </p>
              </div>
              <div className="w-[20%]">
                <input
                  type="text"
                  placeholder="Search service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-2 rounded w-full "
                />
              </div>
              {/* Member count chip */}
              <div className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Members</div>
                <div className="text-xl font-bold text-gray-900 leading-tight">{members.length}</div>
              </div>
            </div>
          </div>

          {/* ── Table Card ── */}
          <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-md">

            {/* Card top bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-50 border-b border-gray-200">
              <span className="w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm inline-flex items-center justify-center text-sm">
                👥
              </span>
              <span className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">
                Member Directory
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">

                {/* ── Table Head ── */}
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400 w-14">
                      S.No
                    </th>
                    <th className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
                      Name
                    </th>
                    <th className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
                      Email
                    </th>
                    <th className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
                      Contact
                    </th>
                    <th className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* ── Table Body ── */}
                <tbody className="divide-y divide-gray-100">
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-14 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-lg">👤</div>
                          <p className="text-sm font-medium text-gray-400">No members found</p>
                          <p className="text-xs text-gray-300">Eligible members will appear here</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    members.map((m, index) => {
                      const isRegistered = sncIds.some((id) => id.retreat_id === m._id);
                      return (
                        <tr
                          key={m._id}
                          className="hover:bg-gray-50 transition-colors duration-100 group"
                        >
                          {/* S.No */}
                          <td className="px-5 py-4">
                            <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold inline-flex items-center justify-center">
                              {index + 1}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {/* Avatar */}
                              <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0 uppercase">
                                {m.name?.charAt(0) || "?"}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm leading-tight">{m.name}</div>
                                {isRegistered && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                    SNC Member
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-5 py-4 text-gray-500 text-sm">{m.email}</td>

                          {/* Contact */}
                          <td className="px-5 py-4 text-gray-500 text-sm">{m.contact}</td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 justify-center">
                              {/* Club+ — only if NOT registered */}
                              {!isRegistered && (
                                <Link
                                  to={`/company/createsnc?id=${m._id}`}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-colors duration-150 shadow-sm"
                                >
                                  <span>+</span> Club
                                </Link>
                              )}

                              {/* Add-On — only if registered */}
                              {isRegistered && (
                                <Link
                                  to={`/company/addon/service/${m._id}`}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-150 shadow-sm"
                                >
                                  Add-On
                                </Link>
                              )}

                              {/* Edit — only if registered */}
                              {isRegistered && (
                                <Link
                                  to={`/company/updatesnc/${m._id}`}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 shadow-sm"
                                >
                                  Edit
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Table Footer ── */}
            {members.length > 0 && (
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Showing <span className="font-semibold text-gray-600">{members.length}</span> member{members.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-xs text-gray-400">Active registry</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default AllSnc;