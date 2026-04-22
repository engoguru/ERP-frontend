import React, { useEffect } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allSncEligible } from "../../../redux/slice/snc/sncregisterSlice";

function AllSnc() {
    const dispatch=useDispatch()
    const members = [
        {
            id: 1,
            name: "Amit",
            email: "amit@gmail.com",
            contact: "6307131152",
        },
    ];

    const{sncEligibleData}=useSelector((state)=>state.snc)
useEffect(()=>{
    dispatch(allSncEligible())
})
console.log(sncEligibleData,"pp")
    return (
        <CompanyLayout pageTitle={"SNC"}>
            <div className="max-w-6xl mx-auto px-4 py-6">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    All Super NGO Club Members
                </h1>

                {/* Table Container */}
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">

                            {/* Table Head */}
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">S.No</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">
                                {members.map((m, index) => (
                                    <tr
                                        key={m.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {m.name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {m.email}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {m.contact}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2 justify-center">

                                                <Link
                                                    to={`/company/createsnc?id=${m.id}`}
                                                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg shadow-sm"
                                                >
                                                    Club+
                                                </Link>

                                                <Link
                                                    to={`/company/addon/service/${m.id}`}
                                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg shadow-sm"
                                                >
                                                    Add-On
                                                </Link>

                                                <Link
                                                    to={`/company/updatesnc/${m.id}`}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg shadow-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
}

export default AllSnc;