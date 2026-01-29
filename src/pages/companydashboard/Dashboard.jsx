import React from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import IPConfigure from "./teamConfiguration/IPConfigure";

function Dashboard() {
    return (
        <CompanyLayout pageTitle={"Dashboard"}>
            <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

                {/* ===== SECTION 1: EMPLOYEES ===== */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Employee Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Employees */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm">Total Employees</p>
                            <h3 className="text-3xl font-bold mt-2">128</h3>
                        </div>

                        {/* Employee Change */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm">Change This Month</p>
                            <h3 className="text-3xl font-bold mt-2 text-green-600">
                                +8
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Compared to last month
                            </p>
                        </div>

                        {/* Latest Employees */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm mb-3">
                                Latest Joined Employees
                            </p>

                            <ul className="space-y-2">
                                <li className="flex justify-between text-sm">
                                    <span>Rahul Sharma</span>
                                    <span className="text-gray-400">2 days ago</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span>Anjali Verma</span>
                                    <span className="text-gray-400">4 days ago</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span>Mohit Singh</span>
                                    <span className="text-gray-400">1 week ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ===== SECTION 2: LEADS ===== */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Leads Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* All Leads */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm">All Leads</p>
                            <h3 className="text-3xl font-bold mt-2">342</h3>
                        </div>

                        {/* Current Month Leads */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm">
                                Current Month Leads
                            </p>
                            <h3 className="text-3xl font-bold mt-2 text-blue-600">
                                58
                            </h3>
                        </div>

                        {/* Latest Leads */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-1 border-gray-300">
                            <p className="text-gray-500 text-sm mb-3">
                                Latest Leads
                            </p>

                            <ul className="space-y-2">
                                <li className="flex justify-between text-sm">
                                    <span>ABC Pvt Ltd</span>
                                    <span className="text-gray-400">Today</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span>XYZ Solutions</span>
                                    <span className="text-gray-400">Yesterday</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span>TechNova</span>
                                    <span className="text-gray-400">2 days ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <IPConfigure/>

            </div>
        </CompanyLayout>
    );
}

export default Dashboard;
