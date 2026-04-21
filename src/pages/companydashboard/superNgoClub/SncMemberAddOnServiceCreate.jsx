import React from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";

function SncMemberAddOnServiceCreate({ update = false }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(update ? "Updating service..." : "Creating new service...");
    };

    return (
        <CompanyLayout pageTitle={update ? "Update Service" : "Add-On Service"}>
            <div className="max-w-4xl mx-auto px-4 py-8">

                <h1 className="text-xl font-bold text-gray-800 mb-6">
                    {update ? "Update Service" : "Add New Service"}
                </h1>

                <div className="bg-white shadow-lg rounded-2xl border border-gray-300 p-6">

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Service Info */}
                        <div>
                            <h2 className="text-sm flex px-20 rounded-lg border-b bg-red-500 text-white justify-start font-semibold py-0.5 uppercase mb-4">
                                Service Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-600">Service Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Service 1"
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Total Amount</label>
                                    <input
                                        type="number"
                                        placeholder="35000"
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Paid</label>
                                    <input
                                        type="number"
                                        placeholder="15000"
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Due</label>
                                    <input
                                        type="number"
                                        placeholder="20000"
                                        className="mt-1 w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">GST</label>
                                    <input
                                        type="number"
                                        placeholder="6300"
                                        className="mt-1 w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Extra Costs */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                                Additional Charges
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm text-gray-600">Other Expenses</label>
                                    <input
                                        type="number"
                                        placeholder="300"
                                        className="mt-1 w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Documents */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                                Documents
                            </h2>

                            <input
                                type="file"
                                multiple
                                className="w-full border border-dashed border-gray-300 rounded-lg px-3 py-6 bg-gray-50 cursor-pointer"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end pt-4 border-t">

                            <button
                                type="submit"
                                className={`px-6 py-2 rounded-lg text-white text-sm font-medium transition ${update
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {update ? "Update Service" : "Create Service"}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </CompanyLayout>
    );
}

export default SncMemberAddOnServiceCreate;