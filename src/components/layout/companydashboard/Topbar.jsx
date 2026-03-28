// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { Menu, Bell, User, ChevronDown, Settings, LogOut, Search } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
// import axios from "axios";
// import { base_URL } from "../../../utils/BaseUrl";


// function Topbar({pageTitle}) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openProfile, setOpenProfile] = useState(false);
//  const dispatch = useDispatch();
// const navigate = useNavigate();
//   // Grab state
//   const { employeeData, loading, initialized } = useSelector(
//     (state) => state.reducer.login
//   );

//   // Fetch employee details only if not initialized
//   useEffect(() => {
//     if (!initialized) {
//       dispatch(employeeDetails());
//     }
//   }, [dispatch, initialized]);
//   // Hardcoded values
//   // const pageTitle = "Dashboard";
//   const userName = "Admin";
//   const userRole = "Administrator";

//   // Dummy sidebar items (hardcoded)
//   const sidebarItemsByRole = {
//     Administrator: [
//       { label: "Dashboard", href: "/", icon: Menu },
//       { label: "Employees", href: "/employees", icon: User },
//       { label: "Leads", href: "/leads", icon: User },
//       { label: "Projects", href: "/projects", icon: Menu },
//       { label: "Settings", href: "/settings", icon: Settings },
//     ],
//   };

//   const getDashboardLink = () => "/";

// const HandleLogout = async (e) => {
//   e?.preventDefault();

//   try {
//     await axios.post(
//       `${base_URL}employee/logout`,
//       {},
//       { withCredentials: true } 
//     );

//     navigate("/login");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };


//   return (
//     <>
//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-gray-300">
//         <div className="flex items-center justify-between h-16 px-4 lg:px-8">
//           {/* Mobile menu toggle */}
//           <button
//             onClick={() => setOpenMenu(true)}
//             className="lg:hidden p-2 rounded-md hover:bg-[hsl(168_76%_42%)]"
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           {/* Page Title */}
//           <h1 className="text-xl font-semibold font-display text-foreground lg:text-2xl">
//             {pageTitle}
//           </h1>

//           {/* Right controls */}
//           <div className="flex items-center gap-3">
//             {/* Search */}
//             {/* <div className="hidden md:flex items-center relative">
//               <Search className="absolute left-3 w-4 h-4 text-[hsl(168_76%_42%)]" />
//               <input
//                 placeholder="Search..."
//                 className="pl-10 pr-3 py-2 text-sm rounded-md border border-[hsl(168_76%_42%)] focus:outline-none focus:ring-[hsl(168_76%_42%)]"
//               />
//             </div> */}

//             {/* Notifications */}
//             <button className="relative p-2 rounded-md hover:bg-secondary">
//               {/*  */}
//               <Link to={"/company/event"}>  <Bell className="w-5 h-5 text-[hsl(168_76%_42%)]" /></Link>
            
//               <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
//             </button>

//             {/* Profile dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setOpenProfile(!openProfile)}
//                 className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary"
//               >
//                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                   <User className="w-4 h-4 text-[hsl(168_76%_42%)]" />
//                   {/* <img src={employeeData?.profilePic?.url} alt={employeeData?.name} className="w-4 h-4 text-[hsl(168_76%_42%)]" /> */}
//                 </div>
//                 <span className="hidden sm:inline text-sm font-medium">{employeeData?.name}</span>
//                 <ChevronDown className="w-4 h-4 text-[hsl(168_76%_42%)]" />
//               </button>

//               {openProfile && (
//                 <div className="absolute right-0 mt-2 w-48 bg-[hsl(168_76%_42%)] border border-[hsl(168_76%_42%)] rounded-lg shadow-lg">
//                   <Link
//                     to={`/company/employe/profile/${employeeData?.id}`}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
//                   >
//                     <User className="w-4 h-4 text-white" />
//                     Profile
//                   </Link>
//                   {employeeData?.role==="Admin"?
//                     <Link
//                     to={`/company/edit`}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
//                   >
//                     <User className="w-4 h-4 text-white" />
//                     Edit Company
//                   </Link>
//                   :null}
//                   <div className="flex items-center gap-2 px-4 py-2 hover:bg-secondary cursor-pointer text-white">
//                     <Settings className="w-4 h-4 text-white" />
//                     Settings
//                   </div>
//                   <Link
                  
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
//                     onClick={HandleLogout}
//                   >
//                     <LogOut className="w-4 h-4 text-white" />
//                     Sign Out
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Sidebar overlay */}
//       {/* {openMenu && (
//         <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
//           <div className="absolute left-0 top-0 h-full w-64 bg-sidebar">
//             <UserDashboardSidebar
//               items={sidebarItemsByRole[userRole]}
//               userRole={userRole}
//             />
//             <button
//               onClick={() => setOpenMenu(false)}
//               className="absolute top-4 right-4 text-white text-2xl"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )} */}
//     </>
//   );
// }

// export default Topbar;


import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, User, ChevronDown, Settings, LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";
import Sidebar from "./Sidebar"; // ← import your existing Sidebar

function Topbar({ pageTitle }) {
  const [openMenu, setOpenMenu]       = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef                    = useRef(null);

  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  /* ── Same selectors / effects as original ── */
  const { employeeData, loading, initialized } = useSelector(
    (state) => state.reducer.login
  );

  useEffect(() => {
    if (!initialized) dispatch(employeeDetails());
  }, [dispatch, initialized]);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile sidebar on ESC */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpenMenu(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* ── Same logout logic as original ── */
  const HandleLogout = async (e) => {
    e?.preventDefault();
    try {
      await axios.post(`${base_URL}employee/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  /* Avatar initials */
  const initials = (employeeData?.name || "U")
    .split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      {/* ══ TOPBAR ══ */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 lg:px-8 "
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "2px solid rgba(3, 14, 29, 0.8)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        {/* ── Left: hamburger + page title ── */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpenMenu(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" style={{ color: "#6366f1" }} />
          </button>

          {/* Page title */}
          <div className="flex items-center gap-3">
            <div>
              <h1
                className="font-bold leading-none"
                style={{ fontSize: 17, color: "#0f172a", letterSpacing: "-0.3px" }}
              >
                {pageTitle}
              </h1>
              <p className="text-[10px] font-medium mt-0.5 hidden sm:block" style={{ color: "#94a3b8" }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: actions ── */}
        <div className="flex items-center gap-2">

          {/* Notification bell */}
          <Link
            to="/company/event"
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 no-underline"
            style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(226,232,240,0.8)" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(99,102,241,0.08)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(0,0,0,0.03)";
              e.currentTarget.style.borderColor = "rgba(226,232,240,0.8)";
            }}
            aria-label="Events & notifications"
          >
            <Bell className="w-4 h-4" style={{ color: "#64748b" }} />
            {/* Red dot */}
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#f43f5e", boxShadow: "0 0 0 2px #fff" }}
            />
          </Link>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 mx-1" style={{ background: "rgba(226,232,240,0.8)" }} />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: openProfile ? "rgba(99,102,241,0.08)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${openProfile ? "rgba(99,102,241,0.25)" : "rgba(226,232,240,0.8)"}`,
              }}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full font-bold text-white flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  fontSize: 10,
                  fontFamily: "'DM Mono', monospace",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                {initials}
              </div>

              {/* Name */}
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-none" style={{ color: "#0f172a" }}>
                  {employeeData?.name || "User"}
                </div>
                <div className="text-[10px] leading-none mt-0.5" style={{ color: "#94a3b8" }}>
                  {employeeData?.role || "Employee"}
                </div>
              </div>

              <ChevronDown
                className="w-3.5 h-3.5 hidden sm:block flex-shrink-0 transition-transform duration-200"
                style={{ color: "#94a3b8", transform: openProfile ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* Dropdown panel */}
            {openProfile && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(226,232,240,0.9)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
                  animation: "ip-up 0.18s ease both",
                }}
              >
                {/* Profile header */}
                <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid rgba(226,232,240,0.7)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-white flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        fontSize: 12,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>
                        {employeeData?.name || "User"}
                      </div>
                      <div className="text-[10px] font-semibold" style={{ color: "#6366f1" }}>
                        {employeeData?.role || "Employee"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  <DropdownItem
                    icon={<User className="w-3.5 h-3.5" />}
                    label="My Profile"
                    as={Link}
                    to={`/company/employe/profile/${employeeData?.id}`}
                    onClick={() => setOpenProfile(false)}
                  />

                  {employeeData?.role === "Admin" && (
                    <DropdownItem
                      icon={<Settings className="w-3.5 h-3.5" />}
                      label="Edit Company"
                      as={Link}
                      to="/company/edit"
                      onClick={() => setOpenProfile(false)}
                    />
                  )}

                  <DropdownItem
                    icon={<Settings className="w-3.5 h-3.5" />}
                    label="Settings"
                    onClick={() => setOpenProfile(false)}
                  />

                  {/* Divider */}
                  <div className="my-1 mx-2" style={{ height: 1, background: "rgba(226,232,240,0.7)" }} />

                  <DropdownItem
                    icon={<LogOut className="w-3.5 h-3.5" />}
                    label="Sign Out"
                    danger
                    onClick={HandleLogout}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══ MOBILE SIDEBAR OVERLAY ══ */}
      {openMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpenMenu(false)}
          />

          {/* Sidebar drawer */}
          <div
            className="fixed top-0 left-0 h-full z-50 lg:hidden"
            style={{ animation: "sb-slide-in 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {/* Close button overlaid top-right of sidebar */}
            <button
              onClick={() => setOpenMenu(false)}
              className="absolute top-4 right-[-44px] z-10 flex items-center justify-center w-9 h-9 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Render actual Sidebar in mobile mode */}
            <Sidebar isMobile={true} />
          </div>

          {/* Inject slide-in keyframe */}
          <style>{`
            @keyframes sb-slide-in {
              from { transform: translateX(-100%); opacity: 0.6; }
              to   { transform: translateX(0);     opacity: 1; }
            }
          `}</style>
        </>
      )}
    </>
  );
}

/* ─── Dropdown menu item ────────────────────────────────────── */
function DropdownItem({ icon, label, as: Tag = "button", danger = false, onClick, ...props }) {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    textDecoration: "none",
    color: danger ? "#f43f5e" : "#334155",
    transition: "background 0.15s, color 0.15s",
    fontFamily: "'DM Sans', sans-serif",
    textAlign: "left",
  };

  return (
    <Tag
      {...props}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={e => {
        e.currentTarget.style.background = danger ? "rgba(244,63,94,0.07)" : "rgba(99,102,241,0.06)";
        e.currentTarget.style.color      = danger ? "#f43f5e" : "#6366f1";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color      = danger ? "#f43f5e" : "#334155";
      }}
    >
      <span style={{ color: danger ? "#f43f5e" : "#94a3b8", flexShrink: 0 }}>{icon}</span>
      {label}
    </Tag>
  );
}

export default Topbar;