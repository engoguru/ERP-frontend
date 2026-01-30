
import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { employeeCreate, employeesByManager } from "../../redux/slice/employee/employeeCreateSlice";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Briefcase,
  Image,
  FileText,
  CheckCircle,
  GraduationCap, Home, MapPin, Droplet,
} from "lucide-react";
import { companyConfiguresView } from "../../redux/slice/companySlice";

const steps = ["Personal Info", "Employment Info", "Finance & Bank"];

// Reusable Field Component
const Field = ({ label, icon, children }) => (
  <div className="flex flex-col mb-3">
    <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
      {icon && <span className="text-gray-500">{icon}</span>} {label}
    </label>
    {children}
  </div>
);

const EmployeeManage = ({ hideCompanyLayout = false, role = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { managerEmployees = [], loading = false } = useSelector((state) => state.employee || {});
  const { companyConfigureViewData } = useSelector(
    (state) => state.reducer.company
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [managerSuggestions, setManagerSuggestions] = useState([]);
  const [managerName, setManagerName] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // STEP 1
    name: "",
    fatherName: "",
    motherName: "",
    employeeEmail: { email: "", isVerified: false },
    employeeContact: { contact: "", isVerified: false },
    emgContact: { name: "", contact: "", relation: "", isVerified: false },
    dateOfJoining: "",
    qualification: "",
    permanentAddress: "",
    localAddress: "",
    profilePic: null,
    employeeDescription: "",
    stationaryAlloted: [],
    stationaryAllotedString: "",
    dob: new Date().toISOString().split("T")[0],
    bloodGroup: "",
    // STEP 2
    employeeCode: "EMP0001",
    department: "",
    role: role || "",
    status: "ACTIVE",
    shiftDetail: { shiftName: "", startTime: "", endTime: "" },
    reportingManager: "696b7bf0360a9259fb1248e7",
    licenseId: companyConfigureViewData?.data?.licenseId,

    // STEP 3
    salaryStructure: {
      ctc: "",
      basic: "",
      hra: "",
      otherAllowance: "",
      pf: "",
      pfCode: "",
      esi: "",
      esiCode: "",
      professionalTax: "",
      gratuity: "",
      grossSalary: 0,
      totalDeduction: 0,
      netSalary: 0,
      effectiveFrom: new Date().toISOString().split("T")[0],
    },
    bankDetail: [
      {
        bankName: "",
        bankIfscCode: "",
        branchName: "",
        accountNumber: "",
        accountType: "SAVINGS",
      },
    ],
    pan: null,
    aadhar: null,
  });

  // ================== Handlers ==================
  useEffect(() => {
    dispatch(companyConfiguresView());

  }, [dispatch,]);
  // console.log(companyConfigureViewData, "opo")
  // Generic handler for simple and nested fields
  const handleChange = (e, nestedPath) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;
    if (nestedPath) {
      setFormData((prev) => ({
        ...prev,
        [nestedPath]: { ...prev[nestedPath], [name]: val },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

const handleMultipleFiles = (e, nestedPath) => {
  const { name, files } = e.target;
  const selectedFiles = Array.from(files);

  setFormData((prev) => {
    if (nestedPath) {
      return {
        ...prev,
        [nestedPath]: {
          ...prev[nestedPath],
          [name]: selectedFiles,
        },
      };
    }
    return { ...prev, [name]: selectedFiles };
  });
};



  const fields = [
    { key: "employeeEmail", label: "Email", name: "email" },
    { key: "emgContact", label: "Emergency Contact", name: "contact" },
    { key: "employeeContact", label: "Contact", name: "contact" },
  ];

  const [otpSent, setOtpSent] = useState({
    emgContact: false,
    employeeContact: false,
    employeeEmail: false,
  });

  const [verified, setVerified] = useState({
    emgContact: false,
    employeeContact: false,
    employeeEmail: false,
  });

  const [otp, setOtp] = useState(""); // can also track per field if needed
  const [loading, setLoading] = useState(false);

  const sendOtp = async (key) => {
    try {
      setLoading(true);
      console.log("Sending OTP for:", key);

      // Call your backend API here
      // await api.post("/send-otp", { mobile: formData[key][fields.find(f => f.key === key).name] });

      setOtpSent(prev => ({ ...prev, [key]: true })); // show OTP input for this field
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

 const verifyOtp = async (key) => {
  try {
    setLoading(true);
    console.log("Verifying OTP for:", key);

    // Call API to verify OTP
    // await api.post("/verify-otp", { mobile: formData[key][fields.find(f => f.key === key).name], otp });

    // Update formData to mark verified
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        isVerified: true
      }
    }));

    // Update verified UI state
    setVerified(prev => ({ ...prev, [key]: true }));
    setOtpSent(prev => ({ ...prev, [key]: false }));
    setOtp(""); // reset OTP input
  } catch (err) {
    alert("Invalid OTP");
  } finally {
    setLoading(false);
  }
};




  // Bank fields
  const handleBankChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBanks = [...formData.bankDetail];
    updatedBanks[index][name] = value;
    setFormData((prev) => ({ ...prev, bankDetail: updatedBanks }));
  };

  const addBank = () => {
    setFormData((prev) => ({
      ...prev,
      bankDetail: [
        ...prev.bankDetail,
        { bankName: "", bankIfscCode: "", branchName: "", accountNumber: "", accountType: "SAVINGS" },
      ],
    }));
  };

  const [stationaryAllotedString, setStationaryAllotedString] = useState("");
  const stationaryAllotedArray = stationaryAllotedString
    ? stationaryAllotedString?.split(",").map(item => item.trim())
    : [];
  useEffect(() => {

  }, [stationaryAllotedString])
  formData.stationaryAlloted = stationaryAllotedArray
  useEffect(() => {
    if (companyConfigureViewData?.data?.licenseId) {
      setFormData((prev) => ({
        ...prev,
        licenseId: companyConfigureViewData.data.licenseId,
      }));
    }
  }, [companyConfigureViewData]);

  // Validation
  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      ["name", "fatherName", "motherName", "dateOfJoining", "qualification", "permanentAddress", "localAddress", "profilePic"].forEach((field) => {
        if (!formData[field]) newErrors[field] = true;
      });
      if (!formData.employeeEmail?.email?.trim()) {
        newErrors.email = true;
      }
      if (!formData.employeeContact?.contact?.trim()) {
        newErrors.contact = true;
      }
      if (!formData.profilePic) {
        newErrors.profilePic = true;
      }
    }
    if (currentStep === 1) {
      ["employeeCode", "department", "role", "status", "reportingManager"].forEach((field) => {
        if (!formData[field]) newErrors[field] = true;
      });
    }
    if (currentStep === 2) {
      if (!formData.salaryStructure.ctc) newErrors.salaryStructure_ctc = true;
      if (!formData.bankDetail[0].accountNumber) newErrors.bankDetail0_accountNumber = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


 


const jsonFields = [
  "salaryStructure",
  "shiftDetail",
  "employeeEmail",
  "employeeContact",
  "emgContact",
  "bankDetail",
];

const handleSubmit = async () => {
  try {
    if (!validateStep()) return;

    const data = new FormData();

    for (const key in formData) {
      if (["profilePic", "pan", "aadhar"].includes(key)) continue;

      const value = formData[key];
      if (value === undefined || value === null) continue;

      if (jsonFields.includes(key)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    }

    // profilePic (single file)
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    // pan (multiple files)
    if (Array.isArray(formData.pan)) {
      formData.pan.forEach((file) => {
        data.append("pan", file);
      });
    }

    // aadhar (multiple files)
    if (Array.isArray(formData.aadhar)) {
      formData.aadhar.forEach((file) => {
        data.append("aadhar", file);
      });
    }

    await dispatch(employeeCreate(data)).unwrap();
    setTimeout(() => navigate("/company/employe/view"), 1500);
  } catch (err) {
    console.error(err);
  }
};



  useEffect(() => {
    if (!search.trim()) {
      setShowSuggestions(false);
      setManagerSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      dispatch(employeesByManager(search))
        .unwrap()
        .then((res) => {
          setManagerSuggestions(res?.data || []);
          setShowSuggestions(true);
        })
        .catch(console.error);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, dispatch]);

  const handleSelectManager = (manager) => {
    setManagerName(manager.name);
    setFormData((prev) => ({ ...prev, reportingManager: manager._id }));
    setShowSuggestions(false);
  };

  // ================== Content JSX ==================
  const content = (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl">



      {/* Step Indicator */}
      <div className="flex mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 text-sm border-b-4 ${currentStep === index
              ? "border-blue-600 font-semibold text-blue-600"
              : "border-gray-300 text-gray-500"
              }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* STEP 1: Personal Info */}
      {currentStep === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" icon={<User size={16} />}>
            <input name="name" onChange={handleChange} className={`input ${errors.name ? "error shake" : ""}`} />
          </Field>


          <Field label="Emergency Contact Person Name" icon={<User size={16} />}>
            <input
              name="name"
              value={formData.emgContact.name}
              onChange={(e) => handleChange(e, "emgContact")}
              className={`input ${errors?.emgContact?.name ? "error shake" : ""}`}
            />
          </Field>


          {fields?.map(({ key, label, name }) => (
            <div key={key} className="flex flex-col mb-4 text-start">
              {label === "Email" ? (
                <label className="flex items-center text-sm text-gray-600 font-medium gap-2">
                  <Mail size={16} />
                  {label}
                </label>
              ) : (
                <label className="flex items-center text-sm text-gray-600 font-medium gap-2">
                  <Phone size={16} />
                  {label}
                </label>
              )}

              <div className="flex gap-2">
                <input
                  className="input flex-1 border"
                  value={formData[key][name]} // dynamic property
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      [key]: { ...prev[key], [name]: e.target.value } // dynamic update
                    }))
                  }
                  disabled={verified[key]} // disable if verified
                />
                {!verified[key] && (
                  <button
                    className="btn-outline "
                    onClick={() => sendOtp(key)}
                    disabled={!formData[key][name] || loading} // dynamic check
                  >
                    <span className="flex flex-1  px-1.5 py-0.5 my-1.5 border-2 border-green-500 text-xs rounded-lg" >   <Phone size={16} /> OTP</span>
                  </button>
                )}
              </div>

              {otpSent[key] && !verified[key] && (
                <div className="flex gap-2 mt-1">
                  <input
                    className="input flex-1 border"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <button
                    className="btn-primary  px-1.5 py-0.2 my-2 border-2 border-green-500 text-xs rounded-lg"
                    onClick={() => verifyOtp(key)}
                    disabled={otp.length !== 6 || loading}
                  >
                    Verify
                  </button>
                </div>
              )}

              {verified[key] && (
                <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                  <CheckCircle size={14} /> Verified
                </p>
              )}
            </div>
          ))}

          <Field label="Relationship with Emergency Contact" icon={<User size={16} />}>
            <select
              name="relation"
              value={formData.emgContact.relation}
              onChange={(e) => handleChange(e, "emgContact")}
              className={`input ${errors?.emgContact?.relation ? "error shake" : ""}`}
            >
              <option value="">Select Relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Guardian">Guardian</option>
              <option value="Other">Other</option>
            </select>
          </Field>




          <Field label="Qualification" icon={<GraduationCap size={16} />}>
            <input name="qualification" onChange={handleChange} className={`input ${errors.qualification ? "error shake" : ""}`} />
          </Field>
          <Field label="Mother Name" icon={<User size={16} />}>
            <input name="motherName" onChange={handleChange} className={`input ${errors.motherName ? "error shake" : ""}`} />
          </Field>



          <Field label="Date of Joining" icon={<Calendar size={16} />}>
            <input type="date" name="dateOfJoining" onChange={handleChange} className={`input ${errors.dateOfJoining ? "error shake" : ""}`} />
          </Field>
          <Field label="Father Name" icon={<User size={16} />}>
            <input name="fatherName" onChange={handleChange} className={`input ${errors.fatherName ? "error shake" : ""}`} />
          </Field>
          <Field label="Permanent Address" icon={<Home size={16} />}>
            <input name="permanentAddress" onChange={handleChange} className={`input ${errors.permanentAddress ? "error shake" : ""}`} />
          </Field>
          <Field label="Local Address" icon={<MapPin size={16} />}>
            <input name="localAddress" onChange={handleChange} className={`input ${errors.localAddress ? "error shake" : ""}`} />
          </Field>
          <Field label="Blood Group" icon={<Droplet size={16} />}>
            <select
              name="bloodGroup"
              onChange={handleChange}
              className={`input ${errors.bloodGroup ? "error shake" : ""}`}
              value={formData.bloodGroup} // assuming you have a state object for form values
            >
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Date Of Birth" icon={<Calendar size={16} />}>
            <input type="date" name="dob" onChange={handleChange} className={`input ${errors.dob ? "error shake" : ""}`} />
          </Field>
          <Field label="Profile Picture" icon={<Image size={16} />}>
            <input type="file" name="profilePic" onChange={handleChange} className={`input ${errors.profilePic ? "error shake" : ""}`} />
          </Field>
        </div>
      )}

      {/* STEP 2: Employment Info */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Department" error={errors.department}>
            <select name="department" onChange={handleChange} className={`input ${errors.department && "error"}`}>
              <option value="">Select</option>
              {companyConfigureViewData?.data.roles?.map((r) => (
                <option key={r.department} value={r.department}>
                  {r.department}
                </option>
              ))}
            </select>
          </Field>



          <Field label="Role" error={errors.role}>
            <select name="role" onChange={handleChange} className={`input ${errors.role && "error"}`}>
              <option value="">Select</option>
              {companyConfigureViewData?.data.roles
                ?.find((r) => r.department === formData.department)
                ?.roles?.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
            </select>
          </Field>

          <Field label="Status">
            <select name="status" onChange={handleChange} className={`input ${errors.status ? "error shake" : ""}`}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </Field>
          <Field label="Shift Name">
            <input name="shiftName" onChange={(e) => handleChange(e, "shiftDetail")} className={`input ${errors.shiftName ? "error shake" : ""}`} />
          </Field>
          <Field label="Shift Start">
            <input type="time" name="startTime" onChange={(e) => handleChange(e, "shiftDetail")} className={`input ${errors.startTime ? "error shake" : ""}`} />
          </Field>
          <Field label="Shift End">
            <input type="time" name="endTime" onChange={(e) => handleChange(e, "shiftDetail")} className={`input ${errors.endTime ? "error shake" : ""}`} />
          </Field>
          <Field label="Stationary Allotted">
            <input
              type="text"
              placeholder="Laptop, ID Card"
              value={stationaryAllotedString}
              onChange={(e) => setStationaryAllotedString(e.target.value)}
              className={`input ${errors.stationaryAlloted ? "error shake" : ""}`}
            />
          </Field>



          {/* Reporting Manager */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              Reporting Manager
            </label>
            <input
              type="text"
              value={search} // <-- Use only search for typing & filtering
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true); // Show suggestions whenever typing
              }}
              onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
              className="input text-black"
              autoComplete="off"
            />
            {showSuggestions && managerSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto mt-1 rounded shadow">
                {managerSuggestions.map((mgr) => (
                  <li
                    key={mgr._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                    onClick={() => {
                      handleSelectManager(mgr);
                      setSearch(mgr.name); // Set input value to selected manager
                      setShowSuggestions(false); // Hide suggestions
                    }}
                  >
                    {mgr.name}
                  </li>
                ))}
              </ul>
            )}
          </div>


          {/* <Field label="License ID">
            <input name="licenseId" onChange={handleChange}  className={`input ${errors.name ? "error shake" : ""}`} value={companyConfigureViewData?.}/>
          </Field> */}
        </div>
      )}

      {/* STEP 3: Finance & Bank */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Salary Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData.salaryStructure)
              .filter((f) => f !== "grossSalary" && f !== "totalDeduction" && f !== "netSalary" && f !== "effectiveFrom" && f !== "esiCode" && f !== "pfCode")
              .map((field) => (
                <Field key={field} label={field}>
                  <input
                    type="number"
                    value={formData.salaryStructure[field]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salaryStructure: { ...prev.salaryStructure, [field]: e.target.value },
                      }))
                    }
                    className={`input ${errors.name ? "error shake" : ""}`}
                  />
                </Field>
              ))}
            <Field label="Salary Effective From">
              <input
                type="date"
                value={formData.salaryStructure.effectiveFrom}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryStructure: { ...prev.salaryStructure, effectiveFrom: e.target.value },
                  }))
                }
                className={`input ${errors.pfCode ? "error shake" : ""}`}
              />
            </Field>
            <Field label="PF Number">
              <input
                type="text"
                value={formData.salaryStructure.pfCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryStructure: { ...prev.salaryStructure, pfCode: e.target.value },
                  }))
                }
                className={`input ${errors.name ? "error shake" : ""}`}
              />
            </Field>
            <Field label="ESI Number">
              <input
                type="text"
                value={formData.salaryStructure.esiCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryStructure: { ...prev.salaryStructure, esiCode: e.target.value },
                  }))
                }
                className={`input ${errors.esiCode ? "error shake" : ""}`}
              />
            </Field>
          </div>

          <Field label="Employee Description" icon={<FileText size={16} />}>
            <textarea
              value={formData.employeeDescription}
              onChange={(e) => setFormData({ ...formData, employeeDescription: e.target.value })}
              className="input h-24"
            />
          </Field>

          <h3 className="font-semibold text-lg">Documents</h3>
          <Field label="Aadhar">
            <input type="file" name="aadhar" onChange={handleMultipleFiles} multiple />
          </Field>
          <Field label="PAN">
            <input type="file" name="pan" onChange={handleMultipleFiles} multiple />
          </Field>

          <h3 className="font-semibold text-lg">Bank Details</h3>
          {formData.bankDetail.map((bank, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-2 rounded">
              {["bankName", "bankIfscCode", "branchName", "accountNumber"].map((field) => (
                <Field key={field} label={field}>
                  <input name={field} value={bank[field]} onChange={(e) => handleBankChange(index, e)} className={`input ${errors.field ? "error shake" : ""}`} />
                </Field>
              ))}
              <Field label="Account Type">
                <select name="accountType" value={bank.accountType} onChange={(e) => handleBankChange(index, e)} className={`input ${errors.accountType ? "error shake" : ""}`}>
                  <option value="SAVINGS">SAVINGS</option>
                  <option value="CURRENT">CURRENT</option>
                  <option value="SALARY">SALARY</option>
                </select>
              </Field>
            </div>
          ))}
          <button onClick={addBank} className="px-3 py-1 bg-gray-200 rounded">
            + Add Bank
          </button>
        </div>
      )}

      {/* Navigation Buttons */}

      <div className="flex justify-between mt-8">
        {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Previous</button>}
        {currentStep < steps.length - 1
          ? <button onClick={() => { if (validateStep()) setCurrentStep(currentStep + 1) }} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
          : <button onClick={handleSubmit} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
        }
      </div>

      {/* Styles */}
      <style>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
        }
          .error {
  border-color: #ef4444 !important;
}

.shake {
  animation: shake 0.3s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}

      `}</style>
    </div>
  );

  // ================== Conditional Layout Wrapper ==================
  return hideCompanyLayout ? content : <CompanyLayout pageTitle={role ? `Create ${role}` : "New Employees"}>{content}</CompanyLayout>;
};

export default EmployeeManage;

