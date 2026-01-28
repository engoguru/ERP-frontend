
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
    dateOfJoining: "",
    qualification: "",
    permanentAddress: "",
    localAddress: "",
    profilePic: null,
    employeeDescription: "",
    stationaryAlloted: [],
    stationaryAllotedString: "",
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
      esi: "",
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
  console.log(companyConfigureViewData, "opo")
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
      ["name", "fatherName", "motherName","dateOfJoining","qualification","permanentAddress","localAddress","profilePic"].forEach((field) => {
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


  const handleSubmit = async () => {
    try {
      if (!validateStep()) return;
      const data = new FormData();

      for (const key in formData) {
        if (["profilePic", "pan", "aadhar"].includes(key)) continue;
        if (typeof formData[key] === "object") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }

      if (formData.profilePic) data.append("profilePic", formData.profilePic);
      if (formData.pan) data.append("pan", formData.pan);
      if (formData.aadhar) data.append("aadhar", formData.aadhar);

      await dispatch(employeeCreate(data)).unwrap();
      // toast.success("Employee created successfully 🎉");

      setTimeout(() => navigate("/company/employe/view"), 1500);
    } catch (err) {
      console.error(err);
      // toast.error(err?.message || "Failed to create employee");
    }
  };

  // Manager search suggestions
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
            <input name="name" onChange={handleChange}     className={`input ${errors.name ? "error shake" : ""}`}/>
          </Field>
          <Field label="Father Name" icon={<User size={16} />}>
            <input name="fatherName" onChange={handleChange}  className={`input ${errors.fatherName ? "error shake" : ""}`} />
          </Field>
          <Field label="Mother Name" icon={<User size={16} />}>
            <input name="motherName" onChange={handleChange}  className={`input ${errors.motherName ? "error shake" : ""}`} />
          </Field>
          <Field label="Email" icon={<Mail size={16} />}>
            <input name="email" onChange={(e) => handleChange(e, "employeeEmail")}  className={`input ${errors.email ? "error shake" : ""}`} />
          </Field>
          <Field label="Contact" icon={<Phone size={16} />}>
            <input name="contact" onChange={(e) => handleChange(e, "employeeContact")}  className={`input ${errors.contact ? "error shake" : ""}`} />
          </Field>
          <Field label="Date of Joining" icon={<Calendar size={16} />}>
            <input type="date" name="dateOfJoining" onChange={handleChange}  className={`input ${errors.dateOfJoining ? "error shake" : ""}`} />
          </Field>
          <Field label="Qualification">
            <input name="qualification" onChange={handleChange}  className={`input ${errors.qualification ? "error shake" : ""}`} />
          </Field>
          <Field label="Permanent Address">
            <input name="permanentAddress" onChange={handleChange}  className={`input ${errors.permanentAddress ? "error shake" : ""}`} />
          </Field>
          <Field label="Local Address">
            <input name="localAddress" onChange={handleChange}  className={`input ${errors.localAddress ? "error shake" : ""}`} />
          </Field>
          <Field label="Profile Picture" icon={<Image size={16} />}>
            <input type="file" name="profilePic" onChange={handleChange}  className={`input ${errors.profilePic ? "error shake" : ""}`} />
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
            <select name="status" onChange={handleChange}  className={`input ${errors.status ? "error shake" : ""}`}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </Field>
          <Field label="Shift Name">
            <input name="shiftName" onChange={(e) => handleChange(e, "shiftDetail")}  className={`input ${errors.shiftName ? "error shake" : ""}`} />
          </Field>
          <Field label="Shift Start">
            <input type="time" name="startTime" onChange={(e) => handleChange(e, "shiftDetail")}  className={`input ${errors.startTime ? "error shake" : ""}`} />
          </Field>
          <Field label="Shift End">
            <input type="time" name="endTime" onChange={(e) => handleChange(e, "shiftDetail")}  className={`input ${errors.endTime ? "error shake" : ""}`} />
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
              .filter((f) => f !== "grossSalary" && f !== "totalDeduction" && f !== "netSalary" && f !== "effectiveFrom")
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
                 className={`input ${errors.name ? "error shake" : ""}`}
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
            <input type="file" name="aadhar" onChange={handleChange} />
          </Field>
          <Field label="PAN">
            <input type="file" name="pan" onChange={handleChange} />
          </Field>

          <h3 className="font-semibold text-lg">Bank Details</h3>
          {formData.bankDetail.map((bank, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-2 rounded">
              {["bankName", "bankIfscCode", "branchName", "accountNumber"].map((field) => (
                <Field key={field} label={field}>
                  <input name={field} value={bank[field]} onChange={(e) => handleBankChange(index, e)}  className={`input ${errors.field ? "error shake" : ""}`} />
                </Field>
              ))}
              <Field label="Account Type">
                <select name="accountType" value={bank.accountType} onChange={(e) => handleBankChange(index, e)}  className={`input ${errors.accountType ? "error shake" : ""}`}>
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
      {/* <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep(currentStep - 1)} className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Submit
          </button>
        )}
      </div> */}
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

