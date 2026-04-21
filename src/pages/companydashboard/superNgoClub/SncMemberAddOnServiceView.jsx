
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";

function SncMemberAddOnServiceView() {

    // Example files (later replace with API data)
    const files = [
        { name: "invoice.pdf", url: "#" },
        { name: "agreement.pdf", url: "#" },
        { name: "receipt.jpg", url: "#" },
    ];

    return (
         <CompanyLayout pageTitle={"View Detail SNC Service"}>
  
            <div className="max-w-3xl mx-auto px-4 py-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Service Details 
                   
                </h1>

                <div className="bg-white shadow-md rounded-xl border border-gray-400 p-6 space-y-5">
  <span className="text-xs text-green-900 border rounded-xl mr-0"> PENDING</span>
                    <div>
                        <p className="text-sm text-gray-500 text-start">Service Name</p>
                        <p className="text-base font-medium text-gray-800 border text-start border-gray-300 rounded-lg">Service 1</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 text-start">Total Amount</p>
                        <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹35,000</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 text-start">Paid</p>
                        <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹15,000</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 text-start">Due</p>
                        <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹20,000</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 text-start">GST</p>
                        <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹6,300</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 text-start">Other Expenses</p>
                        <p className="text-base font-medium text-gray-800 border border-gray-300 text-start rounded-lg">₹300</p>
                    </div>

                    {/* FILES SECTION */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Documents</p>

                        <div className="space-y-2">

                            {files.length > 0 ? (
                                files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                                    >
                                        <span className="text-sm text-gray-700">
                                            📎 {file.name}
                                        </span>

                                        <a
                                            href={file.url}
                                            className="text-blue-600 text-sm hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400">No files uploaded</p>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </CompanyLayout>
    );
}

export default SncMemberAddOnServiceView;import React from "react";

