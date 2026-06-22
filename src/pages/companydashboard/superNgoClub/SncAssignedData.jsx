// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { sncServiceViewAssigned } from '../../../redux/slice/snc/sncserviceSlice';
// import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout';

// function SncAssignedData() {
//  const dispatch = useDispatch();

//   // login state
//   const { employeeData, initialized } = useSelector(
//     (state) => state.reducer.login
//   );

//   // snc state
//   const { sncServiceAssignedData } = useSelector(
//     (state) => state.reducer.sncService
//   );

//   // fetch employee details if needed
//   useEffect(() => {
//     if (!initialized) {
//       dispatch(employeeDetails());
//     }
//   }, [dispatch, initialized]);

//   // fetch assigned services when employee id is available
//   useEffect(() => {
//     if (employeeData?.id) {
//       dispatch(sncServiceViewAssigned(employeeData.id));
//     }
//   }, [dispatch, employeeData?.id]);
//   console.log(sncServiceAssignedData,"opo")
//   return (
//    <>
//    <CompanyLayout>
//      <div className="p-4">
//         <h2 className="text-xl font-bold mb-4">
//           Assigned Services
//         </h2>

//         {sncServiceAssignedData?.data.length > 0 ? (
//           sncServiceAssignedData.map((item) => (
//             <div
//               key={item._id}
//               className="border p-3 mb-2 rounded"
//             >
//               <h3 className="font-semibold">
//                 {item.serviceName}
//               </h3>

//               <p>Status: {item.status}</p>
//               <p>Total: {item.totalAmount}</p>
//             </div>
//           ))
//         ) : (
//           <p>No assigned services found</p>
//         )}
//       </div>
//    </CompanyLayout>
//    </>
//   )
// }

// export default SncAssignedData


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sncServiceViewAssigned } from "../../../redux/slice/snc/sncserviceSlice";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";

function SncAssignedData() {
    const dispatch = useDispatch();

    const { employeeData, initialized } = useSelector(
        (state) => state.reducer.login
    );

    const { sncServiceAssignedData } = useSelector(
        (state) => state.reducer.sncService
    );

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (!initialized) {
            dispatch(employeeDetails());
        }
    }, [dispatch, initialized]);

    useEffect(() => {
        if (employeeData?.id) {
            dispatch(sncServiceViewAssigned(employeeData.id));
        }
    }, [dispatch, employeeData?.id]);

    const services = sncServiceAssignedData?.data || [];

    // 🔍 FILTER LOGIC
    const filteredData = services.filter((item) => {
        const matchSearch = item.serviceName
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchFilter =
            filter === "all"
                ? true
                : item.status?.toLowerCase() === filter;

        return matchSearch && matchFilter;
    });

    const handleView = (item) => {
        console.log("View:", item);
    };
    console.log(employeeData, "kkjo")
    return (
        <CompanyLayout>
            <div className="p-4">

                <h2 className="text-2xl font-bold mb-4">
                    Assigned Services
                </h2>

                {/* 🔍 SEARCH + FILTER */}
                <div className="flex flex-col md:flex-row gap-3 mb-4">

                    <input
                        type="text"
                        placeholder="Search service..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded w-full md:w-1/3"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded w-full md:w-1/4"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* 📊 TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">#</th>
                                <th className="border p-2">client Name</th>
                                <th className="border p-2">Service Name</th>
                                {employeeData?.role === "Admin" && (<th className="border p-2">assigned To</th>)}
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Total</th>
                                <th className="border p-2">Paid</th>
                                <th className="border p-2">Unpaid</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={item._id} className="text-center">
                                        <td className="border p-2">{index + 1}</td>
                                        <td className="border p-2">
                                            {item?.sncId?.retreat_id?.name}
                                        </td>
                                        <td className="border p-2">
                                            {item.serviceName}
                                        </td>
                                        {employeeData?.role === "Admin" && (
                                            <td className="border p-2">
                                                {item?.assigned[0].userName}
                                            </td>)

                                        }
                                        <td className="border p-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${item.status === "active"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="border p-2">
                                            ₹{item.totalAmount}
                                        </td>

                                        <td className="border p-2">
                                            ₹{item.paidAmount}
                                        </td>

                                        <td className="border p-2">
                                            ₹{item.unpaidAmount || 0}
                                        </td>

                                        <td className="border p-2">
                                            <Link
                                                to={`/company/addon/service/view/${item._id}`}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 inline-block"
                                            >
                                                View
                                            </Link>
                                             {employeeData?.role === "Admin" && (
                                            <Link
                                                to={`/company/addon/service/edit/${item._id}`}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 inline-block mx-2"
                                            >
                                                Edit
                                            </Link>
                                             )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">
                                        No services found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </CompanyLayout>
    );
}

export default SncAssignedData;