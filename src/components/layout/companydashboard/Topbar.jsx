import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu, Bell, User, ChevronDown, Settings, LogOut, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";


function Topbar({pageTitle}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
 const dispatch = useDispatch();
const navigate = useNavigate();
  // Grab state
  const { employeeData, loading, initialized } = useSelector(
    (state) => state.reducer.login
  );

  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);
  // Hardcoded values
  // const pageTitle = "Dashboard";
  const userName = "Admin";
  const userRole = "Administrator";

  // Dummy sidebar items (hardcoded)
  const sidebarItemsByRole = {
    Administrator: [
      { label: "Dashboard", href: "/", icon: Menu },
      { label: "Employees", href: "/employees", icon: User },
      { label: "Leads", href: "/leads", icon: User },
      { label: "Projects", href: "/projects", icon: Menu },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  };

  const getDashboardLink = () => "/";

const HandleLogout = async (e) => {
  e?.preventDefault();

  try {
    await axios.post(
      `${base_URL}employee/logout`,
      {},
      { withCredentials: true } 
    );

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-gray-300">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpenMenu(true)}
            className="lg:hidden p-2 rounded-md hover:bg-[hsl(168_76%_42%)]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-semibold font-display text-foreground lg:text-2xl">
            {pageTitle}
          </h1>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
            {/* <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-[hsl(168_76%_42%)]" />
              <input
                placeholder="Search..."
                className="pl-10 pr-3 py-2 text-sm rounded-md border border-[hsl(168_76%_42%)] focus:outline-none focus:ring-[hsl(168_76%_42%)]"
              />
            </div> */}

            {/* Notifications */}
            <button className="relative p-2 rounded-md hover:bg-secondary">
              <Bell className="w-5 h-5 text-[hsl(168_76%_42%)]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-[hsl(168_76%_42%)]" />
                  {/* <img src={employeeData?.profilePic?.url} alt={employeeData?.name} className="w-4 h-4 text-[hsl(168_76%_42%)]" /> */}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{employeeData?.name}</span>
                <ChevronDown className="w-4 h-4 text-[hsl(168_76%_42%)]" />
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-[hsl(168_76%_42%)] border border-[hsl(168_76%_42%)] rounded-lg shadow-lg">
                  <Link
                    to={`/company/employe/profile/${employeeData?.id}`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
                  >
                    <User className="w-4 h-4 text-white" />
                    Profile
                  </Link>
                  {employeeData?.role==="Admin"?
                    <Link
                    to={`/company/edit`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
                  >
                    <User className="w-4 h-4 text-white" />
                    Edit Company
                  </Link>
                  :null}
                  <div className="flex items-center gap-2 px-4 py-2 hover:bg-secondary cursor-pointer text-white">
                    <Settings className="w-4 h-4 text-white" />
                    Settings
                  </div>
                  <Link
                  
                    className="flex items-center gap-2 px-4 py-2 hover:bg-secondary text-white"
                    onClick={HandleLogout}
                  >
                    <LogOut className="w-4 h-4 text-white" />
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar overlay */}
      {/* {openMenu && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-64 bg-sidebar">
            <UserDashboardSidebar
              items={sidebarItemsByRole[userRole]}
              userRole={userRole}
            />
            <button
              onClick={() => setOpenMenu(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Topbar;
