import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { sncRegister } from "../../../redux/slice/snc/sncregisterSlice";

function SncCreate() {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    console.log(id)
    const [formData, setFormData] = useState({
        joinStatus: "",
        sncType: "",
        totalServiceAmount: "",
        paidAmount: "",
        unpaidAmount: "",
        gstAmount: "",
        retreat_id:"",
        docs: []
    });

    // ---------------- TEXT / NUMBER INPUT ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: value
            };

            // AUTO CALCULATE unpaidAmount
            const total = Number(updated.totalServiceAmount) || 0;
            const paid = Number(updated.paidAmount) || 0;

            updated.unpaidAmount = total - paid ||"";

            return updated;
        });
    };

    // ---------------- FILE INPUT ----------------
    const handleFileChange = (e) => {
        const { files } = e.target;

        setFormData((prev) => ({
            ...prev,
            docs: Array.from(files)
        }));
    };
    useEffect(() => {
        setFormData((prev) => ({ ...prev, retreat_id: id }))
    }, [id])
    // ---------------- SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();

            form.append("joinStatus", formData.joinStatus);
            form.append("sncType", formData.sncType);
            form.append("totalServiceAmount", formData.totalServiceAmount);
            form.append("paidAmount", formData.paidAmount);
            form.append("unpaidAmount", formData.unpaidAmount);
            form.append("gstAmount", formData.gstAmount);
            form.append("retreat_id", formData.retreat_id);
            // send files only (backend will convert to {url, public_id})
            formData.docs.forEach((file) => {
                form.append("docs", file);
            });

            console.log(formData, "Submitting form...");
            const res=dispatch(sncRegister(form))
            // console.log(res)
            alert("Member Created !")
            setFormData()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CompanyLayout pageTitle={"SNC Register"}>
            <div className="w-full bg-gray-300 h-full">
                <h1 className="text-xl font-bold pt-2">
                    Register New SNC Member
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl mx-auto text-center mt-4 border-2 border-gray-400 rounded-lg bg-gray-200"
                >
                    <div className="flex flex-wrap -mx-3 mb-6 p-5">

                        {/* JOIN STATUS */}
                        <div className="w-full px-3 pb-7 flex flex-col">
                            <label className="text-gray-500 text-sm">
                                Join Status
                            </label>
                            <select
                                name="joinStatus"
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 text-sm"
                            >
                                <option value="">Select Join Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* SNC TYPE */}
                        <div className="w-full px-3 pb-7 flex flex-col">
                            <label className="text-gray-500 text-sm">
                                SNC Type
                            </label>
                            <select
                                name="sncType"
                                onChange={handleChange}
                                className="w-full border px-2 py-1.5 rounded-xl text-sm"
                            >
                                <option value="">Select SNC Type</option>
                                <option value="A">A-Type</option>
                                <option value="B">B-Type</option>
                                <option value="C">C-Type</option>
                            </select>
                        </div>

                        {/* TOTAL */}
                        <input
                            type="number"
                            name="totalServiceAmount"
                            placeholder="Total Service Amount"
                            onChange={handleChange}
                            className="w-full px-3 py-2 mb-3 border rounded-xl"
                        />

                        {/* PAID */}
                        <input
                            type="number"
                            name="paidAmount"
                            placeholder="Paid Amount"
                            onChange={handleChange}
                            className="w-full px-3 py-2 mb-3 border rounded-xl"
                        />

                        {/* UNPAID (AUTO) */}
                        <input
                            type="number"
                            name="unpaidAmount"
                            value={formData.unpaidAmount}
                            placeholder="unpaid"
                            readOnly
                            className="w-full px-3 py-2 mb-3 border rounded-xl bg-gray-100"
                        />

                        {/* GST */}
                        <input
                            type="number"
                            name="gstAmount"
                            placeholder="GST Amount"
                            onChange={handleChange}
                            className="w-full px-3 py-2 mb-3 border rounded-xl"
                        />

                        {/* FILES */}
                        <input
                            type="file"
                            multiple
                            name="docs"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 mb-3 border rounded-xl"
                        />

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-800"
                        >
                            Create Membership
                        </button>

                    </div>
                </form>
            </div>
        </CompanyLayout>
    );
}

export default SncCreate;