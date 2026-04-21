import React from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";

function SncMemberAddOnServiceEdit() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating SNC service...");
    };

    return (
        <CompanyLayout pageTitle={"Edit SNC Service"}>
            <div className="max-w-3xl mx-auto px-4 py-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit Add-On Service
                </h1>

                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">

                    <form className="space-y-5" onSubmit={handleSubmit}>

                        <div>

                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Service Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Service 1"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                Total Amount
                            </label>
                            <input
                                type="number"
                                defaultValue="35000"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                Paid
                            </label>
                            <input
                                type="number"
                                defaultValue="15000"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                Due
                            </label>
                            <input
                                type="number"
                                defaultValue="20000"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                GST
                            </label>
                            <input
                                type="number"
                                defaultValue="6300"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                Other Expenses
                            </label>
                            <input
                                type="number"
                                defaultValue="300"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                                Docs
                            </label>
                            <input
                                type="file"
                                multiple
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
                            >
                                Update Service
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </CompanyLayout>
    );
}

export default SncMemberAddOnServiceEdit;