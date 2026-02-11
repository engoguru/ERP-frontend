import React, { useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import IPConfigure from "./teamConfiguration/IPConfigure";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardLeadData, fetchDashboardUserData } from "../../redux/slice/dashbaordSlice";
import { Link } from "react-router-dom";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";

function Dashboard() {
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state?.reducer.dashbaord);
    const { leads } = useSelector((state) => state?.reducer.dashbaord);


    // Grab state
    const { employeeData, initialized } = useSelector(
        (state) => state.reducer.login
    );

    // Fetch employee details only if not initialized
    useEffect(() => {
        if (!initialized) {
            dispatch(employeeDetails());
        }
    }, [dispatch, initialized]);
    useEffect(() => {
        dispatch(fetchDashboardUserData());
        dispatch(fetchDashboardLeadData());
    }, [dispatch]);
    // console.log(leads)
    // console.log(employeeData,"pp")
    return (
        <CompanyLayout pageTitle="Dashboard">
            <div className="p-6 space-y-10  min-h-screen bg-gradient-to-r from-yellow-100 via-orange-200 to-red-100">
                {/* ====== SECTION 1: EMPLOYEES ====== */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Employees */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
                            <p className="text-sm font-medium opacity-80">Total Employees</p>
                            <h3 className="text-4xl font-extrabold mt-3">{userData?.data?.totalEmployees || 0}</h3>

                            {/* Active / Inactive Users */}
                            <div className="mt-4">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Active</span>
                                    <span>{userData?.data?.license?.activeUser || 0}</span>
                                </div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Inactive</span>
                                    <span>{(userData?.data?.totalEmployees - (userData?.data?.license?.activeUser || 0)) || 0}</span>
                                </div>
                                <div className="w-full bg-white/30 rounded-full h-2">
                                    <div
                                        className="bg-green-400 h-2 rounded-full"
                                        style={{
                                            width: `${((userData?.data?.license?.activeUser || 0) / (userData?.data?.totalEmployees || 1)) * 100
                                                }%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Employee Change This Month */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <p className="text-gray-500 text-sm">Change This Month</p>
                            <h3 className="text-3xl font-bold mt-2 text-green-500">
                                {userData?.data?.monthlyEmployees?.length || 0}
                            </h3>
                            <p className="text-gray-400 mt-1 text-sm">Compared to last month</p>
                        </div>

                        {/* Latest Employees */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <p className="text-gray-700 text-sm font-medium mb-3 border-b-2 ">Latest Joined Employees</p>
                            <ul className="space-y-2">
                                {userData?.data?.monthlyEmployees?.slice(-5).map((emp, idx) => (
                                    <li key={idx} className="flex justify-between text-sm  font-medium text-gray-700 hover:text-red-700 hover:border-b hover:border-red-700">

                                        <span className="">
                                            {emp.name}
                                        </span>
                                        {(employeeData?.role === "Admin" || employeeData?.role === "HR") && (<Link to={`/company/employe/profile/${emp?._id}`}>
                                            <span>View</span>
                                        </Link>)}

                                        {/* <span className="text-gray-400">{emp.joinedAgo}</span> */}
                                    </li>
                                )) || <li className="text-gray-400">No recent joins</li>}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ====== SECTION 2: LEADS ====== */}
                {employeeData?.role !== "HR" && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leads Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* All Leads */}
                            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white rounded-2xl shadow-lg p-6">
                                <p className="text-sm font-medium opacity-80">All Leads</p>
                                <h3 className="text-4xl font-extrabold mt-3">{leads?.data?.totalleads || 0}</h3>
                            </div>

                            {/* Current Month Leads */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                                <p className="text-gray-500 text-sm">Current Month Leads</p>
                                <h3 className="text-3xl font-bold mt-2 text-blue-600">
                                    {leads?.data?.monthlyleads?.length || 0}
                                </h3>
                            </div>

                            {/* Latest Leads */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                                <p className="text-gray-800 text-md font-medium mb-3 border-b-2 border-red-700 ">Latest Leads</p>
                                <ul className="space-y-2">
                                    {leads?.data?.monthlyleads?.slice(0, 5).map((lead, idx) => (
                                        <li key={idx} className="flex justify-between font-medium text-sm text-gray-700">
                                            <span>{lead.fields.Name}</span>
                                            <span className="text-gray-700 font-medium">{lead.fields.OrganizationName}</span>
                                        </li>
                                    )) || <li className="text-gray-400">No new leads</li>}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}
                {/* ====== SECTION 3: IP Configuration ====== */}
                {employeeData?.role === "Admin" && (<IPConfigure />)}
            </div>
        </CompanyLayout>
    );
}

export default Dashboard;
