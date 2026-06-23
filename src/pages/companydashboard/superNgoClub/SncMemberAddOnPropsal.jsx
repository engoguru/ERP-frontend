import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { createProposal } from "../../../redux/slice/snc/sncproposalSlice";

function SncMemberAddOnPropsal() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        projectName: "",
        Fee: "",
        expanses: "",
        paidAmount: "",
        unPaidAmount: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const totalAmount =
        Number(formData.Fee || 0) +
        Number(formData.expanses || 0);

    const unpaidAmount =
        Number(formData.Fee || 0) -
        Number(formData.paidAmount || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            sncId: id,
            ...formData,
            totalAmount,
        };

        payload = {
            ...payload,
            unPaidAmount: unpaidAmount
        }
        // console.log(payload);

        dispatch(createProposal(payload)).unwrap()
        alert("Created Successfully!")

        // reset form
        setFormData({
            projectName: "",
            Fee: "",
            expanses: "",
        });
        navigate(-1)
    };

    return (
        <CompanyLayout>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create Proposal
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Submit a new proposal for this SNC member.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="border-b border-gray-200 px-6 py-5">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Proposal Details
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-6"
                        >
                            {/* Project Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    placeholder="Enter project name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            {/* Fee & Expenses */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Project Fee
                                    </label>
                                    <input
                                        type="number"
                                        name="Fee"
                                        value={formData.Fee}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Expenses
                                    </label>
                                    <input
                                        type="number"
                                        name="expanses"
                                        value={formData.expanses}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Paid Amount
                                    </label>
                                    <input
                                        type="number"
                                        name="paidAmount"
                                        value={formData.paidAmount}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>
                            </div>

                            {/* Total Amount Preview */}
                            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                                <div className="flex items-center justify-between border m-2 p-1 border-green-700">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total Amount
                                    </span>
                                    <span className="text-xl font-bold text-green-600">
                                        ₹{totalAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border m-2 p-1 border-red-700">
                                    <span className="text-sm font-medium text-gray-700">
                                        Unpaid
                                    </span>
                                    <span className="text-xl font-bold text-red-600">
                                        ₹{unpaidAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                                >
                                    Create Proposal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
}

export default SncMemberAddOnPropsal;