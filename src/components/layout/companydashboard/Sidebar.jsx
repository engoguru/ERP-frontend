// import React, { useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Home, Users, FileText, Settings, Briefcase } from "lucide-react";
// import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { companyDetailData } from "../../../redux/slice/companySlice";



// function Sidebar({ isMobile }) {
//   const location = useLocation();

//   const dispatch = useDispatch();

//   // Grab state
//   const { employeeData, loading, initialized } = useSelector(
//     (state) => state.reducer.login
//   );
//   const { companyDetailSpecific } = useSelector((state) => state?.reducer?.company)
//   // Fetch employee details only if not initialized
//   useEffect(() => {
//     if (!initialized) {
//       dispatch(employeeDetails());
//     }
//   }, [dispatch, initialized]);

//   useEffect(() => {
//     dispatch(companyDetailData())
//   }, [])

//   // console.log(companyDetailSpecific, "pp")
//   // Hardcoded company info
//   const companyName =companyDetailSpecific?.data?.companyName;
//   const role = employeeData?.role; // Hardcoded role
//   const permissionArray = employeeData?.permissionArray

//   // Hardcoded role label mapping
//   const roleLabels = {
//     Administrator: "Admin",
//     Manager: "Manager",
//     Employee: "Employee",
//   };
//   const allowedSeminars = [
//   "mumbai seminar",
//   "delhi seminar",
//   "chennai seminar",
//   "kolkata seminar"
// ];
//   // console.log(permissionArray)
//   // Hardcoded menu items
//   const isAdmin = role === "Admin";

//   const menu = [
//     { label: "Dashboard", path: "/company/dashboard", icon: Home },

//     // Visible to Admin OR users with permission
//     ...(isAdmin || permissionArray.includes("etView")
//       ? [{ label: "Event", path: "/company/event", icon: Briefcase }]
//       : []),

//     ...(isAdmin || permissionArray.includes("atnView")
//       ? [{ label: "Attendance", path: "/company/attendance", icon: Briefcase }]
//       : []),

//     ...(isAdmin || permissionArray.includes("payView")
//       ? [{ label: "Payroll", path: "/company/payroll", icon: Briefcase }]
//       : []),

//     ...(isAdmin || permissionArray.includes("empView")
//       ? [{ label: "Employees", path: "/company/employe/view", icon: Users }]
//       : []),

//     ...(isAdmin || permissionArray.includes("ldView")
//       ? [{ label: "Leads", path: "/company/leadall", icon: Briefcase }]
//       : []),
//        ...(isAdmin || permissionArray.some(perm => allowedSeminars.includes(perm))
//       ? [{ label: "Seminar", path: "/company/seminar", icon: Briefcase }]
//       : []),
//     { label: "Apply Leaves", path: "/company/applyLeave", icon: Briefcase },
//     { label: "Raised Issues", path: "/company/raised", icon: Briefcase },
//     //  Admin-only menus
//     ...(isAdmin
//       ? [
//         { label: "Lead-form Configure", path: "/company/form-configure", icon: FileText },
//         { label: "Role Configure", path: "/company/role-configure", icon: Briefcase },
//         { label: "Permission Configure", path: "/company/permission-configure", icon: Settings },
//         { label: "Leave Configure", path: "/company/leave-configure", icon: Settings },
//       ]
//       : []),
//   ];


//   return (
//     <aside
//       className={`flex flex-col w-64 bg-[#1b365d] min-h-screen border-r border-sidebar-border
//         ${isMobile ? "fixed top-0 left-0 h-full z-50" : "hidden lg:flex"}
//       `}
//     >
//       {/* Logo / Company Info */}
//       <div className="p-3 border-b border-white/60">
//         <Link to="/" className="flex items-center gap-1">
//           <div className="w-10 h-10 rounded-xl bg-[hsl(168_76%_42%)] flex items-center justify-center">
//             <span className="text-lg font-bold text-white">
//               {companyDetailSpecific?.data?.companyLogo?.url ? (
//                 <img src={companyDetailSpecific.data.companyLogo.url} alt="Company Logo" />
//               ) : (
//                 "ERP"
//               )}
//             </span>

//           </div>
//           <div className="px-2 rounded">
//             <p className="text-md font-bold font-display text-white">{companyName}</p>
//             {/* <p className="text-xs text-white">{employeeData?.role}</p> */}
//           </div>
//         </Link>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-3 space-y-1">
//         {menu.map((item) => {
//           const isActive = location.pathname === item.path;
//           const Icon = item.icon;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
//                 ? "bg-sidebar-accent text-white"
//                 : "text-white/60 hover:text-sidebar-foreground hover:bg-red-700/50"
//                 }`}
//             >
//               {isActive && (
//                 <motion.div
//                   layoutId="sidebar-active"
//                   className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-red-700"
//                 />
//               )}
//               {Icon && typeof Icon === "function" && <Icon className="w-5 h-5" />}
//               {item.label}
//               {item.badge && (
//                 <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer / Support */}
//       <div className="p-4 border-t border-white/60">
//         <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
//           <p className="text-xs text-white/90">Need help?</p>
//           <p className="text-sm font-medium text-white/90">Contact Support</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;



import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, FileText, Settings, Briefcase } from "lucide-react";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { companyDetailData } from "../../../redux/slice/companySlice";


/* ─── Avatar initials ──────────────────────────────────────── */
function SbAvatar({ name = "", size = 32 }) {
  const ini = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
  return (
    <div
      className="sb-avatar flex items-center justify-center flex-shrink-0 rounded-full font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.33, fontFamily: "'DM Mono', monospace" }}
    >
      {ini}
    </div>
  );
}

/* ─── Section divider with label ───────────────────────────── */
function NavGroup({ label }) {
  return <div className="sb-group-label">{label}</div>;
}

/* ─── Main Sidebar ──────────────────────────────────────────── */
function Sidebar({ isMobile }) {
  const location  = useLocation();
  const dispatch  = useDispatch();

  /* ── Same selectors / effects as original ── */
  const { employeeData, loading, initialized } = useSelector(state => state.reducer.login);
  const { companyDetailSpecific }              = useSelector(state => state?.reducer?.company);

  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
  }, [dispatch, initialized]);

  useEffect(() => { dispatch(companyDetailData()); }, []);

  /* ── Same logic as original ── */
  const companyName  = companyDetailSpecific?.data?.companyName;
  const role         = employeeData?.role;
  const permissionArray = employeeData?.permissionArray || [];

  const allowedSeminars = ["mumbai seminar","delhi seminar","chennai seminar","kolkata seminar"];
  const isAdmin = role === "Admin";

  const menu = [
    { label: "Dashboard", path: "/company/dashboard", icon: Home, group: "main" },

    ...(isAdmin || permissionArray.includes("etView")
      ? [{ label: "Event", path: "/company/event", icon: Briefcase, group: "main" }]
      : []),
    ...(isAdmin || permissionArray.includes("atnView")
      ? [{ label: "Attendance", path: "/company/attendance", icon: Briefcase, group: "main" }]
      : []),
    ...(isAdmin || permissionArray.includes("payView")
      ? [{ label: "Payroll", path: "/company/payroll", icon: Briefcase, group: "main" }]
      : []),
    ...(isAdmin || permissionArray.includes("empView")
      ? [{ label: "Employees", path: "/company/employe/view", icon: Users, group: "main" }]
      : []),
    ...(isAdmin || permissionArray.includes("ldView")
      ? [{ label: "Leads", path: "/company/leadall", icon: Briefcase, group: "main" }]
      : []),
    ...(isAdmin || permissionArray.some(p => allowedSeminars.includes(p))
      ? [{ label: "Seminar", path: "/company/seminar", icon: Briefcase, group: "main" }]
      : []),
       ...(isAdmin || permissionArray.some(p => allowedSeminars.includes(p))
      ? [{ label: "Re-Treat", path: "/company/re-treat", icon: Briefcase, group: "main" }]
      : []),

    { label: "Apply Leaves",  path: "/company/applyLeave", icon: Briefcase, group: "personal" },
    { label: "Raised Issues", path: "/company/raised",     icon: Briefcase, group: "personal" },

    ...(isAdmin ? [
      { label: "Lead-form Configure",  path: "/company/form-configure",        icon: FileText,  group: "admin" },
      { label: "Role Configure",        path: "/company/role-configure",         icon: Briefcase, group: "admin" },
      { label: "Permission Configure",  path: "/company/permission-configure",   icon: Settings,  group: "admin" },
      { label: "Leave Configure",       path: "/company/leave-configure",        icon: Settings,  group: "admin" },
    ] : []),
  ];

  /* Group items */
  const groups = [
    { key: "main",     label: "Workspace" },
    { key: "personal", label: "Personal"  },
    { key: "admin",    label: "Admin"     },
  ];

  const firstNameChar = employeeData?.name?.charAt(0) || "U";

  return (
    <aside
      className={`sb-root sb-bg flex flex-col w-64 min-h-screen
        ${isMobile ? "fixed top-0 left-0 h-full z-50" : "hidden lg:flex"}
      `}
    >


      {/* ── Logo / Company ── */}
      <div className="sb-logo-sep p-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 flex-1 min-w-0">
          {/* Logo box */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            {companyDetailSpecific?.data?.companyLogo?.url ? (
              <img src={companyDetailSpecific.data.companyLogo.url} alt="logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-white" style={{ fontFamily: "'DM Mono', monospace" }}>ERP</span>
            )}
          </div>

          {/* Company name */}
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate" style={{ letterSpacing: "-0.2px" }}>
              {companyName || "Company"}
            </p>
            <p className="sb-version mt-0.5">v2.0 · Enterprise</p>
          </div>
        </Link>

        {/* Live dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: "#10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.15)" }}
        />
      </div>

   
    

      {/* ── Navigation ── */}
      <nav className="sb-nav flex-1 overflow-y-auto px-2 pb-2">
        {groups.map(group => {
          const items = menu.filter(m => m.group === group.key);
          if (items.length === 0) return null;
          return (
            <div key={group.key}>
              <NavGroup label={group.label} />
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon     = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sb-nav-item relative flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 no-underline
                      ${isActive ? "sb-item-active" : "sb-item-inactive"}
                    `}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="sb-active-bar absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                      />
                    )}

                    {/* Icon container */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.04)",
                        border: isActive ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {Icon && typeof Icon === "function" && (
                        <Icon
                          className="w-[14px] h-[14px]"
                          style={{ color: isActive ? "#e8e8ee" : "rgba(148,163,184,0.6)" }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span className="flex-1 truncate" style={{ fontSize: 13 }}>{item.label}</span>

                    {/* Active dot on right */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#818cf8" }} />
                    )}

                    {/* Badge if any */}
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full" style={{ background: "#f43f5e", color: "#fff" }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="sb-support-card cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white m-0">Need help?</p>
              <p className="text-[10px] m-0" style={{ color: "#818cf8" }}>Contact Support →</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
