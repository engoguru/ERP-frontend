import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { companyRegister } from "../../redux/slice/companySlice";
import { CheckCircle, Mail, Phone, Building2, ImageIcon } from "lucide-react";
import Footer from "../../components/layout/Footer";

const BRAND = "hsl(168_76%_42%)";

function Register() {
  const dispatch = useDispatch();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    registrationNumber: "",
    registrationDate: "",
    gstNumber: "",
    panCard: [], // [{ url, public_Id }]
    companyLogo: null, // { url, public_Id }
    companyBranch: [
      {
        nickName: "",
        companyPhone: { phone: "", isVerified: true },
        companyEmail: { email: "", isVerified: true },
        companyWebUrl: {
          website: "",
          instagram: "",
          facebook: "",
          linkedin: "",
          twitter: "",
          youtube: "",
        },
        headOffice: true,
        address: "",
      },
    ],
  });

  // OTP / Verification state per branch
  const [branchOtpVisible, setBranchOtpVisible] = useState([{ phone: false, email: false }]);
  const [branchVerified, setBranchVerified] = useState([{ phone: false, email: false }]);

  // ---------------- Handlers ----------------

  const handleCompanyChange = (field, value) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handlePanUpload = files => {
    setCompanyData(prev => ({ ...prev, panCard: Array.from(files) }));
  };

  const handleLogoUpload = file => {
    setCompanyData(prev => ({ ...prev, companyLogo: file }));
  };

  const handleBranchChange = (index, field, value) => {
    const updated = [...companyData.companyBranch];
    updated[index][field] = value;
    setCompanyData(prev => ({ ...prev, companyBranch: updated }));
  };

  const handleBranchPhone = (index, value) => {
    const updated = [...companyData.companyBranch];
    updated[index].companyPhone.phone = value;
    setCompanyData(prev => ({ ...prev, companyBranch: updated }));
  };

  const handleBranchEmail = (index, value) => {
    const updated = [...companyData.companyBranch];
    updated[index].companyEmail.email = value;
    setCompanyData(prev => ({ ...prev, companyBranch: updated }));
  };

  const handleBranchWebUrl = (index, field, value) => {
    const updated = [...companyData.companyBranch];
    updated[index].companyWebUrl[field] = value;
    setCompanyData(prev => ({ ...prev, companyBranch: updated }));
  };

  const addBranch = () => {
    setCompanyData(prev => ({
      ...prev,
      companyBranch: [
        ...prev.companyBranch,
        {
          nickName: "",
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
          headOffice: false,
          address: "",
        },
      ],
    }));

    setBranchOtpVisible(prev => [...prev, { phone: false, email: false }]);
    setBranchVerified(prev => [...prev, { phone: false, email: false }]);
  };

  const removeBranch = index => {
    const updatedBranches = [...companyData.companyBranch];
    updatedBranches.splice(index, 1);
    setCompanyData(prev => ({ ...prev, companyBranch: updatedBranches }));

    const updatedOtp = [...branchOtpVisible];
    updatedOtp.splice(index, 1);
    setBranchOtpVisible(updatedOtp);

    const updatedVerified = [...branchVerified];
    updatedVerified.splice(index, 1);
    setBranchVerified(updatedVerified);
  };

  // ---------------- Verification ----------------
  const sendOtp = (index, type) => {
    setBranchOtpVisible(prev => {
      const updated = [...prev];
      updated[index][type] = true;
      return updated;
    });
  };

  const verifyOtp = (index, type) => {
    setBranchVerified(prev => {
      const updated = [...prev];
      updated[index][type] = true;
      return updated;
    });

    setBranchOtpVisible(prev => {
      const updated = [...prev];
      updated[index][type] = false;
      return updated;
    });
  };

  // ---------------- Submit ----------------
 const submitCompany = () => {
  const allVerified = branchVerified.every(b => b.email && b.phone);
  if (!allVerified) {
    alert("Please verify all branch emails and phone numbers");
    return;
  }

  const formData = new FormData();

  // Add text fields
  formData.append("companyName", companyData.companyName);
  formData.append("registrationNumber", companyData.registrationNumber);
  formData.append("registrationDate", companyData.registrationDate);
  formData.append("gstNumber", companyData.gstNumber);

  // Add logo
  if (companyData.companyLogo) {
    formData.append("companyLogo", companyData.companyLogo);
  }

  // Add PAN cards
  companyData.panCard.forEach(file => {
    formData.append("panCard", file);
  });

  // Add branches as JSON string
  formData.append("companyBranch", JSON.stringify(companyData.companyBranch));

  // Dispatch Redux action
  dispatch(companyRegister(formData));
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-[#1b365d] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-display">Company Registration</h1>
        <p className="mt-4 text-lg opacity-90">Register your business securely</p>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* ---------------- Company Info ---------------- */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="text-[hsl(168_76%_42%)]" /> Company Information
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm mb-1">Company Name</label>
                <input
                  className="input w-full border border-gray-400"
                  value={companyData.companyName}
                  onChange={e => handleCompanyChange("companyName", e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">Registration Number</label>
                <input
                  className="input w-full border border-gray-400"
                  value={companyData.registrationNumber}
                  onChange={e => handleCompanyChange("registrationNumber", e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">Registration Date</label>
                <input
                  type="date"
                  className="input w-full border border-gray-400"
                  value={companyData.registrationDate}
                  onChange={e => handleCompanyChange("registrationDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">GST Number</label>
                <input
                  className="input w-full border border-gray-400"
                  value={companyData.gstNumber}
                  onChange={e => handleCompanyChange("gstNumber", e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">PAN Upload</label>
                <input
                  type="file"
                  multiple
                  className="input w-full border border-gray-400"
                  onChange={e => handlePanUpload(e.target.files)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">Company Logo</label>
                <input
                  type="file"
                  className="input w-full border border-gray-400"
                  onChange={e => handleLogoUpload(e.target.files[0])}
                />
              </div>
            </div>

            {/* ---------------- Branches ---------------- */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Branches</h3>
              {companyData.companyBranch.map((branch, index) => (
                <div key={index} className="border p-4 rounded mb-4 space-y-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      className="input w-full border"
                      placeholder="Branch Nickname"
                      value={branch.nickName}
                      onChange={e => handleBranchChange(index, "nickName", e.target.value)}
                    />

                    <input
                      className="input w-full border"
                      placeholder="Address"
                      value={branch.address}
                      onChange={e => handleBranchChange(index, "address", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-sm">Phone</label>
                      <div className="flex gap-2">
                        <input
                          className="input flex-1 border"
                          value={branch.companyPhone.phone}
                          onChange={e => handleBranchPhone(index, e.target.value)}
                        />
                        {!branchVerified[index].phone && (
                          <button
                            className="btn-outline"
                            onClick={() => sendOtp(index, "phone")}
                          >
                            <Phone size={16} /> OTP
                          </button>
                        )}
                      </div>
                      {branchOtpVisible[index]?.phone && !branchVerified[index]?.phone && (
                        <button
                          className="btn-primary mt-1"
                          onClick={() => verifyOtp(index, "phone")}
                        >
                          Verify
                        </button>
                      )}
                      {branchVerified[index]?.phone && (
                        <p className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle size={14} /> Verified
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm">Email</label>
                      <div className="flex gap-2">
                        <input
                          className="input flex-1 border"
                          value={branch.companyEmail.email}
                          onChange={e => handleBranchEmail(index, e.target.value)}
                        />
                        {!branchVerified[index].email && (
                          <button
                            className="btn-outline"
                            onClick={() => sendOtp(index, "email")}
                          >
                            <Mail size={16} /> OTP
                          </button>
                        )}
                      </div>
                      {branchOtpVisible[index]?.email && !branchVerified[index]?.email && (
                        <button
                          className="btn-primary mt-1"
                          onClick={() => verifyOtp(index, "email")}
                        >
                          Verify
                        </button>
                      )}
                      {branchVerified[index]?.email && (
                        <p className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle size={14} /> Verified
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Web URLs */}
                  <div className="grid md:grid-cols-3 gap-2 mt-2">
                    {Object.keys(branch.companyWebUrl).map(key => (
                      <input
                        key={key}
                        className="input w-full border"
                        placeholder={key}
                        value={branch.companyWebUrl[key]}
                        onChange={e => handleBranchWebUrl(index, key, e.target.value)}
                      />
                    ))}
                  </div>

                  <div className="flex justify-end mt-2">
                    {index > 0 && (
                      <button className="btn-outline" onClick={() => removeBranch(index)}>
                        Remove Branch
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button className="btn-outline" onClick={addBranch}>
                Add Branch
              </button>
            </div>

            <button
              className="btn-primary w-full mt-6"
              onClick={submitCompany}
            >
              Submit Company Registration
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Register;
