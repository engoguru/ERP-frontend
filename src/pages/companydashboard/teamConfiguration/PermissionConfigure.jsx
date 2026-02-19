// import React, { useEffect, useState } from "react";
// import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
// import { Building2, ShieldCheck, Save, Trash2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   companyConfiguresUpdate,
//   companyConfiguresView,
// } from "../../../redux/slice/companySlice";

// /* ACCESS OPTIONS (permission choices) */
// const ACCESS_OPTIONS = [
//   {
//     key: "employee",
//     label: "Employee",
//     actions: [
//       "empView",
//       "empCreate",
//       "empEdit",
//       "empDelete",
//     ],
//   },
//   {
//     key: "pay",
//     label: "Payroll",
//     actions: [
//       "payView",
//       "payCreate",
//       "payEdit",
//       "payDelete",
//     ],
//   },
//   {
//     key: "attendance",
//     label: "Attendance",
//     actions: [
//       "atnView",
//       "atnCreate",
//       "atnEdit",
//       "atnDelete",
//     ],
//   },
//   {
//     key: "event",
//     label: "Event",
//     actions: [
//       "etView",
//       "etCreate",
//       "etEdit",
//       "etDelete",
//     ],
//   },
//   {
//     key: "leaves",
//     label: "Leaves",
//     actions: [
//       "leaView",
//       "leaCreate",
//       "leaEdit",
//       "leaDelete",
//     ],
//   },
//   {
//     key: "leads",
//     label: "Leads",
//     actions: [
//       "ldView",
//       "ldCreate",
//       "ldEdit",
//       "ldDelete",
//       "ldassign",
//       "ldfollowUp"
//     ],
//   },
// ];


// /* Reusable Field Wrapper */
// const Field = ({ label, icon, children }) => (
//   <div>
//     <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-600">
//       {icon && <span className="text-gray-500">{icon}</span>}
//       {label}
//     </label>
//     {children}
//   </div>
// );

// function PermissionConfigure() {
//   const dispatch = useDispatch();

//   const { companyConfigureViewData, loading: companyview } = useSelector(
//     (state) => state?.reducer?.company
//   );

//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectedAccess, setSelectedAccess] = useState([]);
//   const [permissionList, setPermissionList] = useState([]);




//   useEffect(() => { dispatch(companyConfiguresView()) }, [])
//   // roles only for the selected department
//   const rolesForDepartment =
//     companyConfigureViewData?.data?.roles?.find(
//       (d) => d.department === selectedDepartment
//     )?.roles || [];

//   const toggleAccess = (access) => {
//     setSelectedAccess((prev) =>
//       prev.includes(access)
//         ? prev.filter((a) => a !== access)
//         : [...prev, access]
//     );
//   };

//   const addPermission = () => {
//     if (!selectedDepartment || !selectedRole) {
//       alert("Please select department and role");
//       return;
//     }

//     if (selectedAccess.length === 0) {
//       alert("Please select at least one permission");
//       return;
//     }

//     const exists = permissionList.some(
//       (p) =>
//         p.department === selectedDepartment &&
//         p.roleName === selectedRole
//     );

//     if (exists) {
//       alert("Permission already configured for this role");
//       return;
//     }

//     setPermissionList([
//       ...permissionList,
//       {
//         department: selectedDepartment,
//         roleName: selectedRole,
//         permission: selectedAccess,
//       },
//     ]);

//     setSelectedRole("");
//     setSelectedAccess([]);
//   };

//   const removePermission = (department, roleName) => {
//     setPermissionList(
//       permissionList.filter(
//         (p) => !(p.department === department && p.roleName === roleName)
//       )
//     );
//   };

//   const savePermissions = async () => {
//     try {
//       // Build the data object to submit
//       const data = {
//         permissions: permissionList,
//       };

//       // console.log("Submitting Permissions:", data);

//       // Dispatch the update async thunk
//       const resultAction = await dispatch(companyConfiguresUpdate(data)).unwrap();;
//       // console.log(resultAction)
//       // You can unwrap the result to check if it succeeded
//       if (resultAction.success) {
//         alert("Permissions saved successfully!");
//         // console.log("Updated permissions:", resultAction.payload);

//         // Optional: reset local state after successful save
//         setPermissionList([]);
//         setSelectedDepartment("");
//         setSelectedRole("");
//         setSelectedAccess([]);
//       } else {
//         // If rejected, show error
//         alert("Failed to save permissions");
//         console.error("Save failed:", resultAction.payload || resultAction.error);
//       }
//     } catch (err) {
//       console.error("Error in savePermissions:", err);
//       alert("An unexpected error occurred while saving permissions");
//     }
//   };

//   console.log(companyConfigureViewData)

//   return (
//     <CompanyLayout>
//       <div className="mx-auto max-w-5xl p-6">
//         <h2 className="mb-8 text-2xl font-bold text-gray-800">
//           Permission Configuration
//         </h2>

//         {/* ========== SELECT DEPT & ROLE ========== */}
//         <div className="mb-6 space-y-4 rounded-xl bg-white p-6 shadow">
//           <Field label="Select Department" icon={<Building2 size={16} />}>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => {
//                 setSelectedDepartment(e.target.value);
//                 setSelectedRole("");
//                 setSelectedAccess([]);
//               }}
//               className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Department</option>
//               {companyConfigureViewData?.data?.roles?.map((d) => (
//                 <option key={d.department} value={d.department}>
//                   {d.department}
//                 </option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Select Role" icon={<ShieldCheck size={16} />}>
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//               disabled={!selectedDepartment}
//               className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//             >
//               <option value="">Select Role</option>
//               {rolesForDepartment.map((role) => (
//                 <option key={role} value={role}>
//                   {role}
//                 </option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Assign Permissions">
//             <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
//               {ACCESS_OPTIONS.map((group) => (
//                 <div key={group.key}>
//                   <h4 className="font-semibold">{group.label}</h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {group.actions.map((act) => (
//                       <label key={act} className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           value={act}
//                           checked={selectedAccess.includes(act)}
//                           onChange={() => toggleAccess(act)}
//                           className="accent-blue-600"
//                         />
//                         {act}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}

//             </div>
//           </Field>

//           <button
//             onClick={addPermission}
//             className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Add Permission
//           </button>
//         </div>

//         {/* ========== DISPLAY CONFIGURED PERMISSIONS ========== */}
//         <div className="rounded-xl bg-white p-6 shadow">
//           <h3 className="mb-4 text-lg font-semibold text-gray-700">
//             Configured Permissions
//           </h3>

//           {permissionList.length === 0 ? (
//             <p className="text-sm text-gray-400">
//               No permissions configured yet.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {permissionList.map((p, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center justify-between rounded-lg border px-4 py-3"
//                 >
//                   <div className="text-sm">
//                     <div className="font-medium text-gray-800">
//                       {p.department} → {p.roleName}
//                     </div>
//                     <div className="text-gray-500">
//                       {p.permission.join(", ")}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => removePermission(p.department, p.roleName)}
//                     className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
//                   >
//                     <Trash2 size={14} />
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* ========== SAVE BUTTON ========== */}
//         <div className="mt-8 text-right">
//           <button
//             onClick={savePermissions}
//             className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
//           >
//             <Save size={16} />
//             Save Permissions
//           </button>
//         </div>
//       </div>
//     </CompanyLayout>
//   );
// }

// export default PermissionConfigure;


import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Building2, ShieldCheck, Save, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyConfiguresUpdate,
  companyConfiguresView,
} from "../../../redux/slice/companySlice";

/* ACCESS OPTIONS (permission choices) */
const ACCESS_OPTIONS = [
  { key: "employee", label: "Employee", actions: ["empView", "empCreate", "empEdit", "empDelete"] },
  { key: "pay", label: "Payroll", actions: ["payView", "payCreate", "payEdit", "payDelete"] },
  { key: "attendance", label: "Attendance", actions: ["atnView", "atnCreate", "atnEdit", "atnDelete"] },
  { key: "event", label: "Event", actions: ["etView", "etCreate", "etEdit", "etDelete"] },
  { key: "leaves", label: "Leaves", actions: ["leaView", "leaCreate", "leaEdit", "leaDelete"] },
  { key: "leads", label: "Leads", actions: ["ldView", "ldCreate", "ldEdit", "ldDelete", "ldassign", "ldfollowUp"] },
];

/* Reusable Field Wrapper */
const Field = ({ label, icon, children }) => (
  <div>
    <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-600">
      {icon && <span className="text-gray-500">{icon}</span>}
      {label}
    </label>
    {children}
  </div>
);

function PermissionConfigure() {
  const dispatch = useDispatch();
  const { companyConfigureViewData, loading: companyview } = useSelector(
    (state) => state?.reducer?.company
  );

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [permissionList, setPermissionList] = useState([]);

  // Fetch company configuration on mount
  useEffect(() => {
    dispatch(companyConfiguresView());
  }, [dispatch]);

  // Get roles for the selected department
  const rolesForDepartment =
    companyConfigureViewData?.data?.roles?.find(
      (d) => d.department === selectedDepartment
    )?.roles || [];

  // Prefill selectedAccess from backend when department & role changes
  useEffect(() => {
    if (selectedDepartment && selectedRole) {
      const existingPermission = companyConfigureViewData?.data?.permissions?.find(
        (p) => p.department === selectedDepartment && p.roleName === selectedRole
      );
      setSelectedAccess(existingPermission?.permission || []);
    } else {
      setSelectedAccess([]);
    }
  }, [selectedDepartment, selectedRole, companyConfigureViewData]);

  // Toggle a single access permission
  const toggleAccess = (access) => {
    setSelectedAccess((prev) =>
      prev.includes(access) ? prev.filter((a) => a !== access) : [...prev, access]
    );
  };

  // Add current selection to permissionList (local state)
  const addPermission = () => {
    if (!selectedDepartment || !selectedRole) {
      alert("Please select department and role");
      return;
    }
    if (selectedAccess.length === 0) {
      alert("Please select at least one permission");
      return;
    }

    const exists = permissionList.some(
      (p) => p.department === selectedDepartment && p.roleName === selectedRole
    );

    if (exists) {
      // Update existing entry
      setPermissionList((prev) =>
        prev.map((p) =>
          p.department === selectedDepartment && p.roleName === selectedRole
            ? { ...p, permission: selectedAccess }
            : p
        )
      );
    } else {
      setPermissionList((prev) => [
        ...prev,
        {
          department: selectedDepartment,
          roleName: selectedRole,
          permission: selectedAccess,
        },
      ]);
    }

    // Optionally reset role & access after adding
    setSelectedRole("");
    setSelectedAccess([]);
  };

  // Remove a permission from the list
  const removePermission = (department, roleName) => {
    setPermissionList(
      permissionList.filter(
        (p) => !(p.department === department && p.roleName === roleName)
      )
    );
  };

  // Save all permissions to backend
  const savePermissions = async () => {
    try {
      // Merge with backend existing permissions if needed
      const data = {
        permissions: permissionList,
      };

      const resultAction = await dispatch(companyConfiguresUpdate(data)).unwrap();

      if (resultAction.success) {
        alert("Permissions saved successfully!");
        // Reset local state
        setPermissionList([]);
        setSelectedDepartment("");
        setSelectedRole("");
        setSelectedAccess([]);
      } else {
        alert("Failed to save permissions");
        console.error("Save failed:", resultAction.payload || resultAction.error);
      }
    } catch (err) {
      console.error("Error in savePermissions:", err);
      alert("An unexpected error occurred while saving permissions");
    }
  };

  return (
    <CompanyLayout>
      <div className="mx-auto max-w-5xl p-6">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">Permission Configuration</h2>

        {/* SELECT DEPARTMENT & ROLE */}
        <div className="mb-6 space-y-4 rounded-xl bg-white p-6 shadow">
          <Field label="Select Department" icon={<Building2 size={16} />}>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedRole("");
                setSelectedAccess([]);
              }}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {companyConfigureViewData?.data?.roles?.map((d) => (
                <option key={d.department} value={d.department}>
                  {d.department}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Select Role" icon={<ShieldCheck size={16} />}>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              disabled={!selectedDepartment}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select Role</option>
              {rolesForDepartment.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Assign Permissions">
            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
              {ACCESS_OPTIONS.map((group) => (
                <div key={group.key}>
                  <h4 className="font-semibold">{group.label}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {group.actions.map((act) => (
                      <label key={act} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={act}
                          checked={selectedAccess.includes(act)}
                          onChange={() => toggleAccess(act)}
                          className="accent-blue-600"
                        />
                        {act}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Field>

          <button
            onClick={addPermission}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Permission
          </button>
        </div>

        {/* DISPLAY CONFIGURED PERMISSIONS */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Configured Permissions</h3>

          {permissionList.length === 0 ? (
            <p className="text-sm text-gray-400">No permissions configured yet.</p>
          ) : (
            <ul className="space-y-3">
              {permissionList.map((p, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">
                      {p.department} → {p.roleName}
                    </div>
                    <div className="text-gray-500">{p.permission.join(", ")}</div>
                  </div>

                  <button
                    onClick={() => removePermission(p.department, p.roleName)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-8 text-right">
          <button
            onClick={savePermissions}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            <Save size={16} />
            Save Permissions
          </button>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default PermissionConfigure;

