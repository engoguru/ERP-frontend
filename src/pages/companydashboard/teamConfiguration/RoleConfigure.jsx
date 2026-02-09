import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Building2, PlusCircle, Shield, Trash2, Save, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { companyConfigures, companyConfiguresUpdate, companyConfiguresView } from "../../../redux/slice/companySlice";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";

const Field = ({ label, icon, children }) => (
  <div>
    <label className="flex items-center gap-1 text-sm font-medium text-gray-600 mb-1">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

function RoleConfigure() {
  const dispatch = useDispatch();



  // Grab state
  const { companyConfigureViewData } = useSelector(
    (state) => state?.reducer?.company
  );

  useEffect(() => {
    dispatch(companyConfiguresView());

  }, [dispatch]);
  // console.log(companyConfigureViewData,"fjb")
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    roles: departments.map(({ locked, ...rest }) => rest),
  };

  try {
    await dispatch(companyConfiguresUpdate(payload)).unwrap(); // RTK best practice
    alert("Config saved!");

    // clear / reset state
    setDepartments([]); // or initialDepartments
  } catch (err) {
    console.error(err);
  }
};

  // Fetch employee details only if not initialized


  /* ================= DEFAULT ADMIN DEPARTMENT ================= */
  const [departments, setDepartments] = useState([
    {
      department: "Admin",
      roles: ["Admin"], // 🔒 fixed
      locked: true,
    },
  ]);

  const [departmentName, setDepartmentName] = useState("");
  const [currentDept, setCurrentDept] = useState(null);
  const [roleName, setRoleName] = useState("");

  /* ================= CREATE DEPARTMENT ================= */
  const createDepartment = () => {
    if (!departmentName.trim()) return alert("Enter department name");

    const exists = departments.some(
      (d) => d.department.toLowerCase() === departmentName.trim().toLowerCase()
    );

    if (exists) return alert("Department already exists");

    const newDept = {
      department: departmentName.trim(),
      roles: [],
      locked: false,
    };

    setDepartments((prev) => [...prev, newDept]);
    setCurrentDept(newDept);
    setDepartmentName("");
  };

  /* ================= ADD ROLE ================= */
  const addRole = () => {
    if (!roleName.trim()) return alert("Enter role name");

    setDepartments((prev) =>
      prev.map((dept) =>
        dept.department === currentDept.department
          ? dept.roles.includes(roleName.trim())
            ? dept
            : { ...dept, roles: [...dept.roles, roleName.trim()] }
          : dept
      )
    );

    setCurrentDept((prev) => ({
      ...prev,
      roles: [...prev.roles, roleName.trim()],
    }));

    setRoleName("");
  };

  /* ================= REMOVE ROLE ================= */
  const removeRole = (role) => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.department === currentDept.department
          ? { ...dept, roles: dept.roles.filter((r) => r !== role) }
          : dept
      )
    );

    setCurrentDept((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== role),
    }));
  };

  /* ================= FINISH DEPARTMENT ================= */
  const finishDepartment = () => {
    setCurrentDept(null);
    setRoleName("");
  };

  /* ================= SAVE ================= */
  const saveConfiguration = async () => {
    const payload = {
      roles: departments.map(({ locked, ...rest }) => rest), // remove UI flag
    };
    // console.log(payload,"ll")
    try {
      await dispatch(companyConfigures(payload)).unwrap();
      alert("Configuration saved successfully!");
    } catch (err) {
      console.log(err, "oo")
      alert("Failed to save configuration");
    }
  };

  return (
    <CompanyLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8">
          Department & Role Configuration
        </h2>

        {/* ===== ADMIN DEPARTMENT (READ ONLY) ===== */}
        <div className="bg-gray-50 p-6 rounded-xl shadow mb-6 border">
          <h3 className="font-semibold mb-2">Admin (System Default)</h3>
          <p className="text-sm text-gray-500">
            Role: <strong>Admin</strong>
          </p>
        </div>

        {/* ===== CREATE DEPARTMENT ===== */}
        {!currentDept && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <Field label="Create Department" icon={<Building2 size={16} />}>
              <div className="flex gap-3 mt-2">
                <input
                  className="input"
                  placeholder="e.g. HR, IT"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                <button className="btn-primary" onClick={createDepartment}>
                  <PlusCircle size={16} /> Add
                </button>
              </div>
            </Field>
          </div>
        )}

        {/* ===== ADD ROLES ===== */}
        {currentDept && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <Field
              label={`Add Roles for ${currentDept.department}`}
              icon={<Shield size={16} />}
            >
              <div className="flex gap-3 mt-2">
                <input
                  className="input"
                  placeholder="e.g. Manager"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
                <button className="btn-primary" onClick={addRole}>
                  <PlusCircle size={16} /> Add Role
                </button>
              </div>
            </Field>

            <ul className="mt-4 space-y-2">
              {currentDept.roles.map((role) => (
                <li
                  key={role}
                  className="flex justify-between items-center border rounded-lg px-4 py-2"
                >
                  <span>{role}</span>
                  <button
                    onClick={() => removeRole(role)}
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right">
              <button
                onClick={finishDepartment}
                className="btn-success flex gap-2 ml-auto"
              >
                <Check size={16} /> Done
              </button>
            </div>
          </div>
        )}

        {/* ===== SAVE ALL ===== */}
        {/* ===== SAVE ALL ===== */}
        {!currentDept && departments.length > 1 && (
          <div className="text-right">
            <button
              onClick={
                companyConfigureViewData?.data
                  ? handleSubmit
                  : saveConfiguration
              }
              className="btn-success flex gap-2 ml-auto"
            >
              <Save size={16} />
              {companyConfigureViewData?.data
                ? "Update Configuration"
                : "Save Configuration"}
            </button>
          </div>
        )}

      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
        }
        .btn-primary {
          background: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }
        .btn-success {
          background: #16a34a;
          color: white;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
      `}</style>
    </CompanyLayout>
  );
}

export default RoleConfigure;
