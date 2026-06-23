import React, { useEffect, useState } from 'react'
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { sncServiceCreate, sncServiceViewAllByUser, sncUserDetail } from '../../../redux/slice/snc/sncserviceSlice';
import { sncViewOne } from '../../../redux/slice/snc/sncregisterSlice';
import { viewAllPerUserProposal } from '../../../redux/slice/snc/sncproposalSlice';
import { fetchAllPayments } from '../../../redux/slice/snc/sncpaymentSlice';

function SncMemberAddOnService() {
    const dispatch = useDispatch()
    const { id } = useParams();



    let colorClass = "";

    const { sncUserData, sncServiceOne } = useSelector((state) => state.reducer.sncService)
    const { sncViewOneDetail } = useSelector((state) => state.reducer.snc)
    const { userProposal } = useSelector((state) => state.reducer.sncProposal)

    const { paymentAll } = useSelector((state) => state.reducer.payment)
    //   useSelector
    // useEffect

    // Fetch data
    useEffect(() => {
        //    sncViewOneDetail
        dispatch(sncViewOne(id))
        dispatch(sncUserDetail(id))
        dispatch(viewAllPerUserProposal(id))
        dispatch(fetchAllPayments(id))
    }, [dispatch, id])



    const type = `${sncUserData?.data?.name}-${sncViewOneDetail?.data?.sncType}`; // dynamic value

    if (type.endsWith("A")) {
        colorClass = "text-green-600";
    } else if (type.endsWith("B")) {
        colorClass = "text-blue-600";
    } else if (type.endsWith("C")) {
        colorClass = "text-red-600";
    }


    useEffect(() => {
        let id = sncViewOneDetail?.data?._id
        if (id) {
            dispatch(sncServiceViewAllByUser(id))

        }
    }, [sncViewOneDetail?.data?._id])






    const totals =
        sncServiceOne?.data?.reduce(
            (acc, item) => ({
                bill: acc.bill + (Number(item.totalAmount) || 0),
                paid: acc.paid + (Number(item.paidAmount) || 0),
                due: acc.due + (Number(item.unpaidAmount) || 0),
                gst: acc.gst + (Number(item.gstAmount) || 0),
                expanse: acc.expanse + (Number(item.otherExpanses) || 0),
            }),
            { bill: 0, paid: 0, due: 0, gst: 0, expanse: 0 }
        ) || { bill: 0, paid: 0, due: 0, gst: 0, expanse: 0 };

    const totalBillAmount =
        (totals?.bill || 0) +
        (totals?.gst || 0) +
        (totals?.expanse || 0);
    const gstAmount = totals?.gst || 0;
    const otherAmount = totals?.expanse || 0
    const totalPaidAmount = totals?.paid || 0;
    const totalDueAmount = totals?.due || 0;

    // proposal
    const totalsProposal =
        userProposal?.reduce(
            (acc, item) => {
                acc.bill += Number(item.totalAmount) || 0;
                acc.paid += Number(item.paidAmount) || 0;
                acc.expense += Number(item.expanses) || 0;
                acc.unpaid += Number(item.unPaidAmount) || 0;
                acc.fee += Number(item.Fee) || 0;

                return acc;
            },
            {
                bill: 0,
                paid: 0,
                expense: 0,
                unpaid: 0,
                fee: 0,
            }
        ) || {
            bill: 0,
            paid: 0,
            expense: 0,
            unpaid: 0,
            fee: 0,
        };
    const totalBillAmountProposal = totalsProposal.bill;
    const totalPaidAmountProposal = totalsProposal.paid;
    const otherAmountProposal = totalsProposal.expense;
    const totalDueAmountProposal = totalsProposal.unpaid;
    const totalFeeProposal = totalsProposal.fee;

    console.log(paymentAll)
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
                    <Link to={`/company/addon/payment/create/${id}`}>
                        <button className="bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-1 rounded-lg shadow-sm">
                            + Received Payment Data
                        </button>
                    </Link>

                    <Link to={`/company/addon/proposal/create/${id}`}>
                        <button className="bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-1 rounded-lg shadow-sm">
                            + Add New Proposal
                        </button>
                    </Link>
                    <Link to={`/company/addon/service/create/${id}`}>
                        <button className="bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-1 rounded-lg shadow-sm">
                            + Add New Service
                        </button>
                    </Link>
                </div>
                <div className="mb-10 border border-gray-600 bg-red-100">
                    <h1 className="text-2xl mt-1 font-bold text-gray-700">
                        Services
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4  mx-2">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-blue-600">Total Bill</p>
                            <h3 className="text-xl font-bold text-blue-900">
                                ₹{totalBillAmount?.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-green-600">Total Paid</p>
                            <h3 className="text-xl font-bold text-green-900">
                                ₹{totalPaidAmount?.toLocaleString()}
                            </h3>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-green-600">Other Expanse</p>
                            <h3 className="text-xl font-bold text-green-900">
                                ₹{otherAmount?.toLocaleString()}
                            </h3>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-green-600">Total GST</p>
                            <h3 className="text-xl font-bold text-green-900">
                                ₹{gstAmount?.toLocaleString()}
                            </h3>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-red-600">Total Due</p>
                            <h3 className="text-xl font-bold text-red-900">
                                ₹{totalDueAmount?.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm text-left border rounded-lg overflow-hidden">

                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border">
                                <tr>
                                    <th className="px-4 py-3">S.No.</th>
                                    <th className="px-4 py-3">Service Name</th>
                                    <th className="px-4 py-3">Assigned To</th>
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
                                        <td className="px-4 py-3">{service?.assigned[0]?.userName}</td>
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

                                {sncServiceOne?.data.length === 0 && (
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


                {/* Proposal                       */}
                <div className="mb-10 border border-gray-600 bg-green-200">
                    <h1 className="text-2xl mt-1 font-bold text-gray-700">
                        Proposal
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4 mx-2">

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-blue-600">Total <a href="http://"></a>mount</p>
                            <h3 className="text-xl font-bold text-blue-900">
                                ₹{totalBillAmountProposal.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-green-600">Total Paid</p>
                            <h3 className="text-xl font-bold text-green-900">
                                ₹{totalPaidAmountProposal.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-yellow-600">Other Expense</p>
                            <h3 className="text-xl font-bold text-yellow-900">
                                ₹{otherAmountProposal.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-purple-600">Total Fee</p>
                            <h3 className="text-xl font-bold text-purple-900">
                                ₹{totalFeeProposal.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-red-600">Total Due</p>
                            <h3 className="text-xl font-bold text-red-900">
                                ₹{totalDueAmountProposal.toLocaleString()}
                            </h3>
                        </div>

                    </div>
                    {/* Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm text-left border rounded-lg overflow-hidden">

                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border">
                                <tr>
                                    <th className="px-4 py-3">S.No.</th>
                                    <th className="px-4 py-3">Project Name</th>

                                    <th className="px-4 py-3">Total</th>


                                    <th className="px-4 py-3">Fee</th>
                                    <th className="px-4 py-3">Expanses</th>
                                    <th className="px-4 py-3">Paid</th>
                                    <th className="px-4 py-3">Due</th>

                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userProposal?.map((service, index) => (
                                    <tr
                                        key={service._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {service?.projectName}
                                        </td>

                                        <td className="px-4 py-3">₹{service.totalAmount}</td>
                                        <td className="px-4 py-3 text-green-600 font-medium">
                                            ₹{service.Fee}
                                        </td>

                                        <td className="px-4 py-3">₹{service.expanses}</td>
                                        <td className="px-4 py-3">₹{service.
                                            paidAmount}</td>
                                        <td className="px-4 py-3">₹{service.
                                            unPaidAmount}</td>

                                        <td className="px-4 py-3">{service?.status}</td>
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

                                {sncServiceOne?.data.length === 0 && (
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

                {/* payment */}
                <div className='w-2/5'>
                    <h1 className="text-2xl mt-1 font-bold text-gray-700 ">
                        Received  Payment Data
                    </h1>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border">
                                <tr>
                                    <th className="px-4 py-3">S.No.</th>
                                    <th className="px-4 py-3">Payment Mode</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paymentAll?.data?.length > 0 ? (
                                    paymentAll.data.map((payment, index) => (
                                        <tr
                                            key={payment.id || index}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3">
                                                {payment.paymentMode}
                                            </td>

                                            <td className="px-4 py-3">
                                                ₹{payment.Amount}
                                            </td>

                                            <td className="px-4 py-3">
                                                {new Date(payment.
                                                    createdAt).toLocaleDateString()}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    onClick={() => handleView(payment)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-4 py-6 text-center text-gray-500"
                                        >
                                            No payments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
}

export default SncMemberAddOnService;