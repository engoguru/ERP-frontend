import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Building2, PlusCircle, Shield, Trash2, Save, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment, createRole, getDepartment} from "../../../redux/slice/companySlice";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-sm font-medium text-gray-600 mb-1">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function RoleConfigure() {
  const dispatch = useDispatch();

  const { viewAllDepartment } = useSelector((state) => state.reducer.company);

  const [departmentName, setDepartmentName] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);

  const [roleName, setRoleName] = useState("");
  const [roleEmail, setRoleEmail] = useState("");
  const [rolePhone, setRolePhone] = useState("");
const [currentRole,setCurrentrole]=useState([])
  /* ================= LOAD DEPARTMENTS ================= */
  useEffect(() => {
    dispatch(getDepartment());
    // getDepartment
  }, [dispatch]);

useEffect(()=>{
 const handlefetch=async()=>{
  const  response=await axios.get(`${base_URL}role/viewViaDepartment2?departmentId=${selectedDept}`)
    setCurrentrole(response.data.roles)
 }
 handlefetch()
 },[selectedDept])
console.log(currentRole,"p")
  /* ================= CREATE DEPARTMENT ================= */
  const handleCreateDepartment = async () => {
    if (!departmentName.trim()) return alert("Enter department name");

    try {
      const payload = {
        name: departmentName.trim(),
      };

      const newDept = await dispatch(createDepartment(payload)).unwrap();
      alert("Department created!");
      setDepartmentName("");
      setSelectedDept(newDept._id); // select newly created department
    } catch (err) {
      console.error(err);
      alert("Failed to create department");
    }
  };

  /* ================= CREATE ROLE ================= */
  const handleCreateRole = async () => {
    if (!selectedDept) return alert("Select a department first");
    if (!roleName.trim() || !roleEmail.trim() || !rolePhone.trim())
      return alert("Fill all role fields");

    try {
      const payload = {
        departmentId: selectedDept,
        role: roleName.trim(),
        email: roleEmail.trim(),
        phone: rolePhone.trim(),
      };
// console.log(payload,"pp")
      await dispatch(createRole(payload)).unwrap();
      // createRole
      alert("Role added!");
      setRoleName("");
      setRoleEmail("");
      setRolePhone("");
      // optionally reload roles for this department
    } catch (err) {
      console.error(err);
      alert("Failed to create role");
    }
  };

  return (
    <CompanyLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8">Department & Role Configuration</h2>

        {/* ================= CREATE DEPARTMENT ================= */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <Field label="Create Department" icon={<Building2 size={16} />}>
            <div className="flex gap-3 mt-2">
              <input
                className="input"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
              <button className="btn-primary" onClick={handleCreateDepartment}>
                <PlusCircle size={16} /> Add
              </button>
            </div>
          </Field>

          <Field label="Select Department" icon={<Building2 size={16} />}>
            <select
              className="input"
              value={selectedDept || ""}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {viewAllDepartment?.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
<div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-3 py-2">#</th>
        <th className="border px-3 py-2">Role</th>
        <th className="border px-3 py-2">Email</th>
        <th className="border px-3 py-2">Phone</th>
        <th className="border px-3 py-2">Assign</th>
        <th className="border px-3 py-2">Status</th>
        <th className="border px-3 py-2">Created</th>
      </tr>
    </thead>

    <tbody>
      {currentRole?.map((item, index) => (
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="border px-3 py-2">{index + 1}</td>
          <td className="border px-3 py-2">{item.role}</td>
          <td className="border px-3 py-2">{item.email}</td>
          <td className="border px-3 py-2">{item.phone}</td>
          <td className="border px-3 py-2">
            {item.assign ? "Yes" : "No"}
          </td>
          <td className="border px-3 py-2">
            {item.isActive ? "Active" : "Inactive"}
          </td>
          <td className="border px-3 py-2">
            {new Date(item.createdAt).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        {/* ================= CREATE ROLE ================= */}
        {selectedDept && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <Field label="Add Role" icon={<Shield size={16} />}>
              <div className="grid grid-cols-4 gap-3 mt-2">
                <input
                  className="input"
                  placeholder="Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={roleEmail}
                  onChange={(e) => setRoleEmail(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Phone"
                  value={rolePhone}
                  onChange={(e) => setRolePhone(e.target.value)}
                />
                <button className="btn-primary" onClick={handleCreateRole}>
                  <PlusCircle size={16} /> Add
                </button>
              </div>
            </Field>
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
      `}</style>
    </CompanyLayout>
  );
}

export default RoleConfigure;