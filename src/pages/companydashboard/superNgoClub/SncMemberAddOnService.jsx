import React, { useEffect, useState } from 'react'
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { sncServiceCreate, sncServiceViewAllByUser, sncUserDetail } from '../../../redux/slice/snc/sncserviceSlice';
import { sncViewOne } from '../../../redux/slice/snc/sncregisterSlice';

function SncMemberAddOnService() {
    const dispatch = useDispatch()
    const { id } = useParams();



    let colorClass = "";

    const { sncUserData ,sncServiceOne} = useSelector((state) => state.reducer.sncService)
    const { sncViewOneDetail } = useSelector((state) => state.reducer.snc)
    //   useSelector
    // useEffect

    // Fetch data
    useEffect(() => {
        //    sncViewOneDetail
        dispatch(sncViewOne(id))
        dispatch(sncUserDetail(id))
    }, [dispatch, id])



    const type = `${sncUserData?.data?.name}-${sncViewOneDetail?.data?.sncType}`; // dynamic value

    if (type.endsWith("A")) {
        colorClass = "text-green-600";
    } else if (type.endsWith("B")) {
        colorClass = "text-blue-600";
    } else if (type.endsWith("C")) {
        colorClass = "text-red-600";
    }

    const services = [
        {
            id: 1,
            name: "Service 1",
            total: 45000,
            paid: 15000,
            due: 30000,
            other: 1000,
            gst: 8100,
            status: "Pending"
        }
    ];
    useEffect(() => {
        let id = sncViewOneDetail?.data?._id
        if (id) {
        
            dispatch(sncServiceViewAllByUser(id))
        }

    }, [sncViewOneDetail?.data?._id])
   
    return (
        <CompanyLayout pageTitle={"SNC Add-On"}>
            <div className="w-full bg-white shadow-md rounded-xl p-4">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h1 className="text-xl font-semibold bg-gray-400 px-4 py-1">
                        Add-On Service for{" "}
                        <span className={`${colorClass} font-bold`}>
                            {type}
                        </span>
                    </h1>

                    <Link to={`/company/addon/service/create/${id}`}>
                        <button className="bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-1 rounded-lg shadow-sm">
                            + Add New Service
                        </button>
                    </Link>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm text-left border rounded-lg overflow-hidden">

                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs border">
                            <tr>
                                <th className="px-4 py-3">S.No.</th>
                                <th className="px-4 py-3">Service Name</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Paid</th>
                                <th className="px-4 py-3">Due</th>
                                <th className="px-4 py-3">Other</th>
                                <th className="px-4 py-3">GST</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sncServiceOne?.data?.map((service, index) => (
                                <tr
                                    key={service._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {service.serviceName}
                                    </td>
                                    <td className="px-4 py-3">₹{service.totalAmount}</td>
                                    <td className="px-4 py-3 text-green-600 font-medium">
                                        ₹{service.paidAmount}
                                    </td>
                                    <td className="px-4 py-3 text-red-500 font-medium">
                                        ₹{service.unpaidAmount}
                                    </td>
                                    <td className="px-4 py-3">₹{service.otherExpanses}</td>
                                    <td className="px-4 py-3">₹{service.gstAmount}</td>
                                    <td className="px-4 py-3">{service.status}</td>
                                    <td className="px-4 py-3 flex gap-2 justify-center">
                                        <Link
                                            to={`/company/addon/service/edit/${service._id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            to={`/company/addon/service/view/${service._id}`}
                                            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}  

                            {services.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No services found.
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

export default SncMemberAddOnService;