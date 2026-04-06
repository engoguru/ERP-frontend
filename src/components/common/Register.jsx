// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { companyRegister } from "../../redux/slice/companySlice";
// import { CheckCircle, Mail, Phone, Building2, ImageIcon } from "lucide-react";
// import Footer from "../../components/layout/Footer";

// const BRAND = "hsl(168_76%_42%)";

// function Register() {
//   const dispatch = useDispatch();

//   const [companyData, setCompanyData] = useState({
//     companyName: "",
//     registrationNumber: "",
//     registrationDate: "",
//     gstNumber: "",
//     panCard: [], // [{ url, public_Id }]
//     companyLogo: null, // { url, public_Id }
//     companyBranch: [
//       {
//         nickName: "",
//         companyPhone: { phone: "", isVerified: true },
//         companyEmail: { email: "", isVerified: true },
//         companyWebUrl: {
//           website: "",
//           instagram: "",
//           facebook: "",
//           linkedin: "",
//           twitter: "",
//           youtube: "",
//         },
//         headOffice: true,
//         address: "",
//       },
//     ],
//   });

//   // OTP / Verification state per branch
//   const [branchOtpVisible, setBranchOtpVisible] = useState([{ phone: false, email: false }]);
//   const [branchVerified, setBranchVerified] = useState([{ phone: false, email: false }]);

//   // ---------------- Handlers ----------------

//   const handleCompanyChange = (field, value) => {
//     setCompanyData(prev => ({ ...prev, [field]: value }));
//   };

//   const handlePanUpload = files => {
//     setCompanyData(prev => ({ ...prev, panCard: Array.from(files) }));
//   };

//   const handleLogoUpload = file => {
//     setCompanyData(prev => ({ ...prev, companyLogo: file }));
//   };

//   const handleBranchChange = (index, field, value) => {
//     const updated = [...companyData.companyBranch];
//     updated[index][field] = value;
//     setCompanyData(prev => ({ ...prev, companyBranch: updated }));
//   };

//   const handleBranchPhone = (index, value) => {
//     const updated = [...companyData.companyBranch];
//     updated[index].companyPhone.phone = value;
//     setCompanyData(prev => ({ ...prev, companyBranch: updated }));
//   };

//   const handleBranchEmail = (index, value) => {
//     const updated = [...companyData.companyBranch];
//     updated[index].companyEmail.email = value;
//     setCompanyData(prev => ({ ...prev, companyBranch: updated }));
//   };

//   const handleBranchWebUrl = (index, field, value) => {
//     const updated = [...companyData.companyBranch];
//     updated[index].companyWebUrl[field] = value;
//     setCompanyData(prev => ({ ...prev, companyBranch: updated }));
//   };

//   const addBranch = () => {
//     setCompanyData(prev => ({
//       ...prev,
//       companyBranch: [
//         ...prev.companyBranch,
//         {
//           nickName: "",
//           companyPhone: { phone: "", isVerified: false },
//           companyEmail: { email: "", isVerified: false },
//           companyWebUrl: {
//             website: "",
//             instagram: "",
//             facebook: "",
//             linkedin: "",
//             twitter: "",
//             youtube: "",
//           },
//           headOffice: false,
//           address: "",
//         },
//       ],
//     }));

//     setBranchOtpVisible(prev => [...prev, { phone: false, email: false }]);
//     setBranchVerified(prev => [...prev, { phone: false, email: false }]);
//   };

//   const removeBranch = index => {
//     const updatedBranches = [...companyData.companyBranch];
//     updatedBranches.splice(index, 1);
//     setCompanyData(prev => ({ ...prev, companyBranch: updatedBranches }));

//     const updatedOtp = [...branchOtpVisible];
//     updatedOtp.splice(index, 1);
//     setBranchOtpVisible(updatedOtp);

//     const updatedVerified = [...branchVerified];
//     updatedVerified.splice(index, 1);
//     setBranchVerified(updatedVerified);
//   };

//   // ---------------- Verification ----------------
//   const sendOtp = (index, type) => {
//     setBranchOtpVisible(prev => {
//       const updated = [...prev];
//       updated[index][type] = true;
//       return updated;
//     });
//   };

//   const verifyOtp = (index, type) => {
//     setBranchVerified(prev => {
//       const updated = [...prev];
//       updated[index][type] = true;
//       return updated;
//     });

//     setBranchOtpVisible(prev => {
//       const updated = [...prev];
//       updated[index][type] = false;
//       return updated;
//     });
//   };

//   // ---------------- Submit ----------------
//  const submitCompany = () => {
//   const allVerified = branchVerified.every(b => b.email && b.phone);
//   if (!allVerified) {
//     alert("Please verify all branch emails and phone numbers");
//     return;
//   }

//   const formData = new FormData();

//   // Add text fields
//   formData.append("companyName", companyData.companyName);
//   formData.append("registrationNumber", companyData.registrationNumber);
//   formData.append("registrationDate", companyData.registrationDate);
//   formData.append("gstNumber", companyData.gstNumber);

//   // Add logo
//   if (companyData.companyLogo) {
//     formData.append("companyLogo", companyData.companyLogo);
//   }

//   // Add PAN cards
//   companyData.panCard.forEach(file => {
//     formData.append("panCard", file);
//   });

//   // Add branches as JSON string
//   formData.append("companyBranch", JSON.stringify(companyData.companyBranch));

//   // Dispatch Redux action
//   dispatch(companyRegister(formData));
// };

//   return (
//     <div className="min-h-screen bg-gray-400">
//       {/* Header */}
//       <section className="py-20 bg-[#1b365d] text-white text-center">
//         <h1 className="text-4xl md:text-5xl font-bold font-display">Company Registration</h1>
//         <p className="mt-4 text-lg opacity-90">Register your business securely</p>
//       </section>

//       <section className="py-16">
//         <div className="max-w-6xl mx-auto px-4"> 
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
//             {/* ---------------- Company Info ---------------- */}
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//               <Building2 className="text-[hsl(168_76%_42%)]" /> Company Information
//             </h2>

//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">Company Name</label>
//                 <input
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   value={companyData.companyName}
//                   onChange={e => handleCompanyChange("companyName", e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">Registration Number</label>
//                 <input
                    
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   value={companyData.registrationNumber}
//                   onChange={e => handleCompanyChange("registrationNumber", e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">Registration Date</label>
//                 <input
//                   type="date"
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   value={companyData.registrationDate}
//                   onChange={e => handleCompanyChange("registrationDate", e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">GST Number</label>
//                 <input
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   value={companyData.gstNumber}
//                   onChange={e => handleCompanyChange("gstNumber", e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">PAN Upload</label>
//                 <input
//                   type="file"
//                   multiple
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   onChange={e => handlePanUpload(e.target.files)}
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm mb-1">Company Logo</label>
//                 <input
//                   type="file"
//                   className="input w-full border border-gray-400 py-1 px-2 rounded-lg"
//                   onChange={e => handleLogoUpload(e.target.files[0])}
//                 />
//               </div>
//             </div>

//             {/* ---------------- Branches ---------------- */}
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-4">Branches</h3>
//               {companyData.companyBranch.map((branch, index) => (
//                 <div key={index} className="border border-gray-400 p-8 rounded-xl mb-4 space-y-2">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <input
//                       className="input w-full border py-1 px-2 rounded-lg"
//                       placeholder="Branch Nickname"
//                       value={branch.nickName}
//                       onChange={e => handleBranchChange(index, "nickName", e.target.value)}
//                     />

//                     <input
//                       className="input w-full border py-1 px-2 rounded-lg"
//                       placeholder="Address"
//                       value={branch.address}
//                       onChange={e => handleBranchChange(index, "address", e.target.value)}
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4 mt-2">
//                     {/* Phone */}
//                     <div className="flex flex-col">
//                       <label className="text-sm">Phone</label>
//                       <div className="flex gap-2">
//                         <input
//                           className="input flex-1 border py-1 px-2 rounded-lg"
//                           value={branch.companyPhone.phone}
//                           onChange={e => handleBranchPhone(index, e.target.value)}
//                         />
//                         {!branchVerified[index].phone && (
//                           <button
//                             className="btn-outline flex flex-row gap-2 px-2 my-2 hover:bg-red-700 hover:text-white rounded-lg border border-red-400 "
//                             onClick={() => sendOtp(index, "phone")}
//                           >
//                             <Phone size={16} className="my-1" /> OTP
//                           </button>
//                         )}
//                       </div>
//                       {branchOtpVisible[index]?.phone && !branchVerified[index]?.phone && (
//                         <button
//                           className="btn-primary mt-1"
//                           onClick={() => verifyOtp(index, "phone")}
//                         >
//                           Verify
//                         </button>
//                       )}
//                       {branchVerified[index]?.phone && (
//                         <p className="text-green-600 text-sm flex items-center gap-1">
//                           <CheckCircle size={14} /> Verified
//                         </p>
//                       )}
//                     </div>

//                     {/* Email */}
//                     <div className="flex flex-col">
//                       <label className="text-sm">Email</label>
//                       <div className="flex gap-2">
//                         <input
//                           className="input flex-1 border py-1 px-2 rounded-lg"
//                           value={branch.companyEmail.email}
//                           onChange={e => handleBranchEmail(index, e.target.value)}
//                         />
//                         {!branchVerified[index].email && (
//                           <button
//                             className="btn-outline flex flex-row gap-2 px-1 my-2 border rounded-lg border-red-400 hover:bg-red-700 hover:text-white"
//                             onClick={() => sendOtp(index, "email")}
//                           >
//                             <Mail size={16} className="my-1" /> OTP
//                           </button>
//                         )}
//                       </div>
//                       {branchOtpVisible[index]?.email && !branchVerified[index]?.email && (
//                         <button
//                           className="btn-primary mt-1"
//                           onClick={() => verifyOtp(index, "email")}
//                         >
//                           Verify
//                         </button>
//                       )}
//                       {branchVerified[index]?.email && (
//                         <p className="text-green-600 text-sm flex items-center gap-1">
//                           <CheckCircle size={14} /> Verified
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Web URLs */}
//                   <div className="grid md:grid-cols-3 gap-2 mt-2">
//                     {Object.keys(branch.companyWebUrl).map(key => (
//                       <input
//                         key={key}
//                         className="input w-full border py-1 px-2 rounded-lg"
//                         placeholder={key}
//                         value={branch.companyWebUrl[key]}
//                         onChange={e => handleBranchWebUrl(index, key, e.target.value)}
//                       />
//                     ))}
//                   </div>

//                   <div className="flex justify-end mt-2">
//                     {index > 0 && (
//                       <button className="btn-outline btn-outline border bg-red-700 text-white px-3 py-1 rounded-xl hover:bg-red-500" onClick={() => removeBranch(index)}>
//                         Remove Branch
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <button className="btn-outline border bg-green-700 text-white px-3 py-1 rounded-xl hover:bg-green-500" onClick={addBranch}>
//                 Add Branch
//               </button>
//             </div>

//             <button
//               className=" w-2/6 py-2 mt-6 mx-10 btn-outline border bg-green-700 text-white  rounded-xl hover:bg-green-500"
//               onClick={submitCompany}
//             >
//               Submit Registration
//             </button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default Register;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { companyRegister } from "../../redux/slice/companySlice";
import { CheckCircle, Mail, Phone, Building2, ImageIcon, Plus, Trash2, Upload, Globe, Shield } from "lucide-react";
import Footer from "../../components/layout/Footer";

function Register() {
  const dispatch = useDispatch();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    registrationNumber: "",
    registrationDate: "",
    gstNumber: "",
    panCard: [],
    companyLogo: null,
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

  const [branchOtpVisible, setBranchOtpVisible] = useState([{ phone: false, email: false }]);
  const [branchVerified, setBranchVerified] = useState([{ phone: false, email: false }]);

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
          companyWebUrl: { website: "", instagram: "", facebook: "", linkedin: "", twitter: "", youtube: "" },
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

  const submitCompany = () => {
    const allVerified = branchVerified.every(b => b.email && b.phone);
    if (!allVerified) {
      alert("Please verify all branch emails and phone numbers");
      return;
    }
    const formData = new FormData();
    formData.append("companyName", companyData.companyName);
    formData.append("registrationNumber", companyData.registrationNumber);
    formData.append("registrationDate", companyData.registrationDate);
    formData.append("gstNumber", companyData.gstNumber);
    if (companyData.companyLogo) formData.append("companyLogo", companyData.companyLogo);
    companyData.panCard.forEach(file => formData.append("panCard", file));
    formData.append("companyBranch", JSON.stringify(companyData.companyBranch));
    dispatch(companyRegister(formData));
  };

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition duration-200";

  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  const socialPlaceholders = {
    website: "🌐 Website URL",
    instagram: "📸 Instagram",
    facebook: "📘 Facebook",
    linkedin: "💼 LinkedIn",
    twitter: "🐦 Twitter / X",
    youtube: "▶️ YouTube",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden bg-[#1b365d] py-24 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_#34d399,_transparent_60%)]" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            <Shield size={12} /> Secure Registration
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Company Registration
          </h1>
          <p className="mt-3 text-base text-slate-300 font-light">
            Register your business securely and get started in minutes
          </p>
        </div>
      </section>

      {/* ── Progress Steps ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 z-20 relative">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-4 flex items-center justify-between gap-2">
          {["Company Info", "Branches", "Review & Submit"].map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === 0 ? "text-emerald-600" : "text-gray-400"}`}>{step}</span>
              {i < 2 && <div className="flex-1 h-px bg-gray-200 mx-2 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Form ── */}
      <section className="py-10 pb-20">
        <div className="max-w-5xl mx-auto px-4 space-y-6">

          {/* ── Company Information Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100 px-8 py-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
                <Building2 size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">Company Information</h2>
                <p className="text-xs text-gray-500 mt-0.5">Legal details of your organization</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-5">
                {/* Company Name */}
                <div className="md:col-span-1">
                  <label className={labelClass}>Company Name</label>
                  <input
                    className={inputClass}
                    placeholder="Acme Corp Ltd."
                    value={companyData.companyName}
                    onChange={e => handleCompanyChange("companyName", e.target.value)}
                  />
                </div>

                {/* Registration Number */}
                <div>
                  <label className={labelClass}>Registration Number</label>
                  <input
                    className={inputClass}
                    placeholder="CIN / Reg. No."
                    value={companyData.registrationNumber}
                    onChange={e => handleCompanyChange("registrationNumber", e.target.value)}
                  />
                </div>

                {/* Registration Date */}
                <div>
                  <label className={labelClass}>Registration Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={companyData.registrationDate}
                    onChange={e => handleCompanyChange("registrationDate", e.target.value)}
                  />
                </div>

                {/* GST */}
                <div>
                  <label className={labelClass}>GST Number</label>
                  <input
                    className={inputClass}
                    placeholder="22AAAAA0000A1Z5"
                    value={companyData.gstNumber}
                    onChange={e => handleCompanyChange("gstNumber", e.target.value)}
                  />
                </div>

                {/* PAN Upload */}
                <div>
                  <label className={labelClass}>PAN Card Upload</label>
                  <label className="flex items-center gap-3 w-full bg-white border border-dashed border-emerald-300 rounded-xl px-4 py-2.5 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
                    <Upload size={15} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-400 group-hover:text-emerald-600 truncate">
                      {companyData.panCard.length > 0 ? `${companyData.panCard.length} file(s) selected` : "Upload PAN (multi)"}
                    </span>
                    <input type="file" multiple className="hidden" onChange={e => handlePanUpload(e.target.files)} />
                  </label>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className={labelClass}>Company Logo</label>
                  <label className="flex items-center gap-3 w-full bg-white border border-dashed border-emerald-300 rounded-xl px-4 py-2.5 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
                    <ImageIcon size={15} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-400 group-hover:text-emerald-600 truncate">
                      {companyData.companyLogo ? companyData.companyLogo.name : "Upload logo image"}
                    </span>
                    <input type="file" className="hidden" onChange={e => handleLogoUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ── Branches ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-800">Branch Offices</h3>
                <p className="text-xs text-gray-400 mt-0.5">{companyData.companyBranch.length} branch(es) added</p>
              </div>
              <button
                onClick={addBranch}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition duration-150"
              >
                <Plus size={15} /> Add Branch
              </button>
            </div>

            <div className="space-y-4">
              {companyData.companyBranch.map((branch, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Branch Header */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">
                          {branch.nickName || `Branch ${index + 1}`}
                        </span>
                        {index === 0 && (
                          <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                            Head Office
                          </span>
                        )}
                      </div>
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removeBranch(index)}
                        className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 font-semibold px-3 py-1.5 rounded-lg transition duration-150"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Nickname & Address */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Branch Nickname</label>
                        <input
                          className={inputClass}
                          placeholder="e.g. Mumbai HQ"
                          value={branch.nickName}
                          onChange={e => handleBranchChange(index, "nickName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Address</label>
                        <input
                          className={inputClass}
                          placeholder="Full address"
                          value={branch.address}
                          onChange={e => handleBranchChange(index, "address", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Phone & Email Verification */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <div className="flex gap-2">
                          <input
                            className={`${inputClass} flex-1`}
                            placeholder="+91 98765 43210"
                            value={branch.companyPhone.phone}
                            onChange={e => handleBranchPhone(index, e.target.value)}
                          />
                          {!branchVerified[index].phone && (
                            <button
                              onClick={() => sendOtp(index, "phone")}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-2 rounded-xl transition shrink-0"
                            >
                              <Phone size={13} /> OTP
                            </button>
                          )}
                        </div>
                        {branchOtpVisible[index]?.phone && !branchVerified[index]?.phone && (
                          <button
                            onClick={() => verifyOtp(index, "phone")}
                            className="mt-2 w-full text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
                          >
                            Verify OTP
                          </button>
                        )}
                        {branchVerified[index]?.phone && (
                          <p className="mt-1.5 text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                            <CheckCircle size={13} /> Phone verified
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <div className="flex gap-2">
                          <input
                            className={`${inputClass} flex-1`}
                            placeholder="branch@company.com"
                            value={branch.companyEmail.email}
                            onChange={e => handleBranchEmail(index, e.target.value)}
                          />
                          {!branchVerified[index].email && (
                            <button
                              onClick={() => sendOtp(index, "email")}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-xl transition shrink-0"
                            >
                              <Mail size={13} /> OTP
                            </button>
                          )}
                        </div>
                        {branchOtpVisible[index]?.email && !branchVerified[index]?.email && (
                          <button
                            onClick={() => verifyOtp(index, "email")}
                            className="mt-2 w-full text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                          >
                            Verify OTP
                          </button>
                        )}
                        {branchVerified[index]?.email && (
                          <p className="mt-1.5 text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                            <CheckCircle size={13} /> Email verified
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Social / Web URLs */}
                    <div>
                      <label className={`${labelClass} flex items-center gap-1.5`}>
                        <Globe size={11} /> Web & Social Links
                      </label>
                      <div className="grid md:grid-cols-3 gap-3">
                        {Object.keys(branch.companyWebUrl).map(key => (
                          <input
                            key={key}
                            className={inputClass}
                            placeholder={socialPlaceholders[key] || key}
                            value={branch.companyWebUrl[key]}
                            onChange={e => handleBranchWebUrl(index, key, e.target.value)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Ready to register?</p>
              <p className="text-xs text-gray-400 mt-0.5">Make sure all branches are verified before submitting.</p>
            </div>
            <button
              onClick={submitCompany}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-8 py-3 rounded-xl shadow-md transition duration-150 text-sm tracking-wide"
            >
              <CheckCircle size={16} /> Submit Registration
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Register;
