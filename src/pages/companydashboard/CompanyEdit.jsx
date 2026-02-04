import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyDetailData, companyDetailUpdate } from "../../redux/slice/companySlice";

function CompanyEdit() {
    const dispatch = useDispatch();

    const { companyDetailSpecific } = useSelector(
        (state) => state?.reducer?.company
    );

    const [formData, setFormData] = useState({
        companyLogo: null,
        companyBranch: [],
    });

    // OTP UI state
    const [otpState, setOtpState] = useState({
        show: false,
        type: "", // phone | email
        branchIndex: null,
        otp: "",
    });

    // Fetch company data
    useEffect(() => {
        dispatch(companyDetailData());
    }, [dispatch]);

    // Load Redux data into form
    useEffect(() => {
        if (companyDetailSpecific?.data) {
            setFormData({
                companyLogo: companyDetailSpecific.data.companyLogo || null,
                companyBranch: companyDetailSpecific.data.companyBranch || [],
            });
        }
    }, [companyDetailSpecific]);

    /* ================= FILE HANDLER ================= */
    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setFormData({ ...formData, companyLogo: e.target.files[0] });
        }
    };

    /* ================= BRANCH HANDLERS ================= */
    const handleBranchChange = (index, field, value) => {
        const updated = [...formData.companyBranch];
        updated[index][field] = value;
        setFormData({ ...formData, companyBranch: updated });
    };

    const handleNestedChange = (index, parent, field, value) => {
        const updated = [...formData.companyBranch];
        updated[index][parent][field] = value;
        setFormData({ ...formData, companyBranch: updated });
    };

    /* ================= ADD / REMOVE BRANCH ================= */
    const addBranch = () => {
        setFormData({
            ...formData,
            companyBranch: [
                ...formData.companyBranch,
                {
                    nickName: "",
                    address: "",
                    headOffice: false,
                    companyPhone: { phone: "", isVerified: false },
                    companyEmail: { email: "", isVerified: false },
                    companyWebUrl: {
                        website: "",
                        instagram: "",
                        facebook: "",
                        linkedin: "",
                        twitter: "",
                        youtube: "",
                    },
                },
            ],
        });
    };

    const removeBranch = (index) => {
        setFormData({
            ...formData,
            companyBranch: formData.companyBranch.filter((_, i) => i !== index),
        });
    };

    /* ================= OTP SYSTEM (DUMMY) ================= */
    const openOtpBox = (index, type) => {
        setOtpState({ show: true, branchIndex: index, type, otp: "" });
    };

    const verifyOtp = () => {
        if (otpState.otp.length < 4) {
            alert("Enter valid OTP");
            return;
        }

        const updated = [...formData.companyBranch];
        if (otpState.type === "phone") {
            updated[otpState.branchIndex].companyPhone.isVerified = true;
        } else {
            updated[otpState.branchIndex].companyEmail.isVerified = true;
        }

        setFormData({ ...formData, companyBranch: updated });
        setOtpState({ show: false, branchIndex: null, type: "", otp: "" });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = new FormData();
        if (formData.companyLogo instanceof File) {
            payload.append("companyLogo", formData.companyLogo);
        }
        payload.append("companyBranch", JSON.stringify(formData.companyBranch));


        dispatch(
            companyDetailUpdate({
                id: companyDetailSpecific?.data?._id,
                payload,
            })
        );

        console.log("Submitting:", formData);
    };

    return (
        <CompanyLayout>
            <div className="p-6 w-2/3 mx-auto">

                <h2 className="text-2xl font-bold mb-6">Edit Company Information</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ================= LOGO ================= */}
                    <div>
                        <label className="font-semibold">Company Logo - </label>
                        <input type="file" onChange={handleFileChange} className="border rounded-lg p-1" />
                        {formData.companyLogo && (
                            <img
                                src={
                                    formData.companyLogo.url
                                        ? formData.companyLogo.url
                                        : URL.createObjectURL(formData.companyLogo)
                                }
                                className="w-30 mt-3 border rounded-lg"
                            />
                        )}
                    </div>

                    {/* ================= BRANCHES ================= */}
                    {formData.companyBranch.map((branch, index) => (
                        <div key={index} className="border-2 border-red-300 p-4 rounded-lg space-y-3 ">
                            <h3 className="font-semibold text-xl">Branch {index + 1}</h3>

                            <input
                                placeholder="Nickname"
                                value={branch.nickName}
                                onChange={(e) =>
                                    handleBranchChange(index, "nickName", e.target.value)
                                }
                                className="border-2 border-red-200 p-2 rounded-lg text-sm p-2 w-full"
                            />

                            <input
                                placeholder="Address"
                                value={branch.address}
                                onChange={(e) =>
                                    handleBranchChange(index, "address", e.target.value)
                                }
                                className="border-2 border-red-200 p-2 rounded-lg text-sm p-2 w-full"
                            />

                            {/* PHONE */}
                            <div className="flex gap-2">
                                <input
                                    placeholder="Phone"
                                    value={branch.companyPhone.phone}
                                    onChange={(e) =>
                                        handleNestedChange(index, "companyPhone", "phone", e.target.value)
                                    }
                                    className="border-2 border-red-200 p-2 rounded-lg text-sm p-2 flex-1"
                                />
                                {!branch.companyPhone.isVerified && (
                                    <button
                                        type="button"
                                        onClick={() => openOtpBox(index, "phone")}
                                      className="border border-transparent hover:border-red-700 text-black px-3 py-1 text-xs font-semibold"

                                    >
                                        Verify
                                    </button>
                                )}
                                {branch.companyPhone.isVerified && (
                                    <span className="text-green-600 text-xs font-semibold">✔ Verified</span>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div className="flex gap-2">
                                <input
                                    placeholder="Email"
                                    value={branch.companyEmail.email}
                                    onChange={(e) =>
                                        handleNestedChange(index, "companyEmail", "email", e.target.value)
                                    }
                                    className="border-2 border-red-200 p-2 rounded-lg text-sm p-2 flex-1"
                                />
                                {!branch.companyEmail.isVerified && (
                                    <button
                                        type="button"
                                        onClick={() => openOtpBox(index, "email")}
                                          className="border border-transparent hover:border-red-700 text-black px-3 py-1 text-xs font-semibold"
                                    >
                                        Verify
                                    </button>
                                )}
                                {branch.companyEmail.isVerified && (
                                    <span className="text-green-600 text-xs font-semibold">✔ Verified</span>
                                )}
                            </div>

                            {/* SOCIAL LINKS */}
                            {Object.keys(branch.companyWebUrl).map((key) => (
                                <input
                                    key={key}
                                    placeholder={key}
                                    value={branch.companyWebUrl[key]}
                                    onChange={(e) =>
                                        handleNestedChange(index, "companyWebUrl", key, e.target.value)
                                    }
                                    className="border-2 border-red-200 p-2 rounded-lg text-sm w-full"
                                />
                            ))}
                            {index !== 0 ? <button
                                type="button"
                                onClick={() => removeBranch(index)}
                                className="bg-red-500 text-white rounded-lg px-3 text-sm py-1"
                            >
                                Remove Branch
                            </button> : null}

                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addBranch}
                        className="bg-blue-600 text-white text-sm rounded-lg mx-2 px-4 py-2"
                    >
                        Add Branch
                    </button>

                    <button
                        type="submit"
                        className="bg-green-600 text-white  text-sm rounded-lg mx-2 px-6 py-2"
                    >
                        Save Changes
                    </button>
                </form>

                {/* ================= OTP MODAL ================= */}
                {otpState.show && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded space-y-4">
                            <h3 className="font-bold">Enter OTP</h3>
                            <input
                                value={otpState.otp}
                                onChange={(e) =>
                                    setOtpState({ ...otpState, otp: e.target.value })
                                }
                                className="border p-2 w-full"
                            />
                            <button
                                onClick={verifyOtp}
                                className="bg-green-500 text-white px-4 py-2"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </CompanyLayout>
    );
}

export default CompanyEdit;
