import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, FileText, Settings, Briefcase } from "lucide-react";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { companyDetailData } from "../../../redux/slice/companySlice";



function Sidebar({ isMobile }) {
  const location = useLocation();

  const dispatch = useDispatch();

  // Grab state
  const { employeeData, loading, initialized } = useSelector(
    (state) => state.reducer.login
  );
  const { companyDetailSpecific } = useSelector((state) => state?.reducer?.company)
  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    dispatch(companyDetailData())
  }, [])

  // console.log(companyDetailSpecific, "pp")
  // Hardcoded company info
  const companyName =companyDetailSpecific?.data?.companyName;
  const role = employeeData?.role; // Hardcoded role
  const permissionArray = employeeData?.permissionArray

  // Hardcoded role label mapping
  const roleLabels = {
    Administrator: "Admin",
    Manager: "Manager",
    Employee: "Employee",
  };
  // console.log(permissionArray)
  // Hardcoded menu items
  const isAdmin = role === "Admin";

  const menu = [
    { label: "Dashboard", path: "/company/dashboard", icon: Home },

    // Visible to Admin OR users with permission
    ...(isAdmin || permissionArray.includes("etView")
      ? [{ label: "Event", path: "/company/event", icon: Briefcase }]
      : []),

    ...(isAdmin || permissionArray.includes("atnView")
      ? [{ label: "Attendance", path: "/company/attendance", icon: Briefcase }]
      : []),

    ...(isAdmin || permissionArray.includes("payView")
      ? [{ label: "Payroll", path: "/company/payroll", icon: Briefcase }]
      : []),

    ...(isAdmin || permissionArray.includes("empView")
      ? [{ label: "Employees", path: "/company/employe/view", icon: Users }]
      : []),

    ...(isAdmin || permissionArray.includes("ldView")
      ? [{ label: "Leads", path: "/company/leadall", icon: Briefcase }]
      : []),
    { label: "Apply Leaves", path: "/company/applyLeave", icon: Briefcase },
    { label: "Raised Issues", path: "/company/raised", icon: Briefcase },
    //  Admin-only menus
    ...(isAdmin
      ? [
        { label: "Lead-form Configure", path: "/company/form-configure", icon: FileText },
        { label: "Role Configure", path: "/company/role-configure", icon: Briefcase },
        { label: "Permission Configure", path: "/company/permission-configure", icon: Settings },
        { label: "Leave Configure", path: "/company/leave-configure", icon: Settings },
      ]
      : []),
  ];


  return (
    <aside
      className={`flex flex-col w-64 bg-[#1b365d] min-h-screen border-r border-sidebar-border
        ${isMobile ? "fixed top-0 left-0 h-full z-50" : "hidden lg:flex"}
      `}
    >
      {/* Logo / Company Info */}
      <div className="p-4 border-b border-white/60">
        <Link to="/" className="flex items-center gap-1">
          <div className="w-10 h-10 rounded-xl bg-[hsl(168_76%_42%)] flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {companyDetailSpecific?.data?.companyLogo?.url ? (
                <img src={companyDetailSpecific.data.companyLogo.url} alt="Company Logo" />
              ) : (
                "CA"
              )}
            </span>

          </div>
          <div className="px-2 rounded">
            <p className="text-md font-bold font-display text-white">{companyName}</p>
            <p className="text-xs text-white">{employeeData?.role}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-sidebar-accent text-white"
                : "text-white/60 hover:text-sidebar-foreground hover:bg-red-700/50"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-red-700"
                />
              )}
              {Icon && typeof Icon === "function" && <Icon className="w-5 h-5" />}
              {item.label}
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Support */}
      <div className="p-4 border-t border-white/60">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
          <p className="text-xs text-white/90">Need help?</p>
          <p className="text-sm font-medium text-white/90">Contact Support</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
