import React, { useEffect } from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { User, Mail, Phone, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCampOne } from '../../../redux/slice/campslice'
import { getAllService } from '../../../redux/slice/serviceAddSlice'

function AddonTreat() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const { oneCamp } = useSelector((state) => state.reducer.camp);
    const { AllService } = useSelector((state) => state.reducer.service);
    //  useSelector
    // Dummy user data
    const user = {
        name: "Rahul Sharma",
        email: "rahul@mail.com",
        contact: "9876543210"
    }

    // Dummy services
    const services = [
        { id: 1, name: "Yoga Session", price: 500, status: "Active" },
        { id: 2, name: "Meditation", price: 300, status: "Inactive" },
    ]
    // getCampOne
    useEffect(() => {
        dispatch(getCampOne(id));
        dispatch(getAllService(id))
    }, [id, dispatch]);
    console.log(AllService, "pddgzdfverfef")


    const totalsServicesAmount =
        AllService?.data?.reduce(
            (acc, item) => {
                acc.total += Number(item.totalAmount) || 0;
                acc.paid += Number(item.paidAmount) || 0;

                acc.unpaid += Number(item.unpaidAmount) || 0;


                return acc;
            },
            {
                total: 0,
                paid: 0,

                unpaid: 0,

            }
        ) || {
            total: 0,
            paid: 0,

            unpaid: 0,

        };
    const totalBillAmountServices = totalsServicesAmount.total;
    const totalPaidAmountServices = totalsServicesAmount.paid;

    const totalDueAmountServices = totalsServicesAmount.unpaid;


    return (
        <CompanyLayout pageTitle={"All Services"}>
            <div className="p-6 space-y-6">

                {/* ── USER DETAILS ── */}
                <div className="bg-white border rounded-xl p-5">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">User, Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                            <User size={18} className="text-indigo-500" />
                            <div>
                                <p className="text-xs text-slate-500">Name</p>
                                <p className="text-sm font-semibold">{oneCamp?.data.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                            <Mail size={18} className="text-indigo-500" />
                            <div>
                                <p className="text-xs text-slate-500">Email</p>
                                <p className="text-sm font-semibold">{oneCamp?.data.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                            <Phone size={18} className="text-indigo-500" />
                            <div>
                                <p className="text-xs text-slate-500">Contact</p>
                                <p className="text-sm font-semibold">{oneCamp?.data.contact}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── SERVICES TABLE ── */}
                <div className="bg-white border rounded-xl overflow-hidden">

                    {/* Header with Add On button */}
                    <div className="px-5 py-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Services</h2>

                        <button
                            onClick={() => navigate(`/company/service/addon/new/${oneCamp?.data._id}`)} // 👈 new route
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white 
              bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Plus size={16} /> Add On
                        </button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4 mb-4 mx-2">

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-blue-600">Total <a href="http://"></a>mount</p>
                            <h3 className="text-xl font-bold text-blue-900">
                                ₹{totalBillAmountServices.toLocaleString()}
                            </h3>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-green-600">Total Paid</p>
                            <h3 className="text-xl font-bold text-green-900">
                                ₹{totalPaidAmountServices.toLocaleString()}
                            </h3>
                        </div>



                        <div className="bg-red-50 border border-red-200 rounded-xl p-2 shadow-sm">
                            <p className="text-sm font-medium text-red-600">Total Due</p>
                            <h3 className="text-xl font-bold text-red-900">
                                ₹{totalDueAmountServices.toLocaleString()}
                            </h3>
                        </div>

                    </div>

                    {/* Table */}
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">S.No.</th>
                                <th className="px-4 py-3 text-left">Service Name</th>
                                <th className="px-4 py-3 text-left">Assigned To</th>
                                <th className="px-4 py-3 text-center">Total Amt (₹)</th>
                                <th className="px-4 py-3 text-center">Paid Amt (₹)</th>
                                <th className="px-4 py-3 text-center">Due Amt (₹)</th>
                                <th className="px-4 py-3 text-center">Docs</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {AllService?.data?.map((service, index) => (
                                <tr key={service.id} className="border-t hover:bg-slate-50 transition">
                                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{service.serviceName}</td>
                                    <td className="px-4 py-3 font-medium">
                                        {service?.assigned?.[0]?.userName || "Not Assigned"}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        ₹{service.totalAmount}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        ₹{service.paidAmount}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        ₹{service.unpaidAmount}
                                    </td>

                                    {/* <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${service.status === "Active"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-rose-100 text-rose-600"
                                            }`}>
                                            {service.status}
                                        </span>
                                    </td> */}
                                    <td className="px-4 py-3 text-center">
                                        {service.docs?.map((url, index) => (

                                            <img
                                                src={url.url}
                                                alt="doc"
                                                onClick={() => window.open(url.url, "_blank")}
                                                className="w-12 h-12 object-cover inline-block mx-1 border rounded"
                                            />

                                        ))}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => navigate(`/company/service/addon/edit/${service._id}`)}
                                            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                                        >
                                            Edit
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </CompanyLayout>
    )
}

export default AddonTreat