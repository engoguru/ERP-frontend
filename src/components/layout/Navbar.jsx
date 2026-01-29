import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";


  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);
  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-sm
        ${isHome && !scrolled ? "bg-transparent" : "bg-white shadow-md"}
      `}
    >
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">ERP</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors
                ${isHome && !scrolled ? "text-white" : "text-gray-800"}
              `}
            >
              HR Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center gap-8 text-sm font-medium
              ${isHome && !scrolled ? "text-white" : "text-gray-600"}
            `}
          >
            {/* <Link to="/dashboard" className="hover:text-green-500 transition">
              Dashboard
            </Link> */}
            <Link to="/features" className="hover:text-green-500 transition">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-green-500 transition">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-green-500 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={employeeData?.id ? "/company/dashboard" : "/login"}
              className={`px-4 py-2 border rounded font-medium transition
    ${isHome && !scrolled
                  ? "border-white text-white hover:bg-white hover:text-green-500"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                }`}
            >
              {employeeData?.id ? "Go to Dashboard" : "Sign In"}
            </Link>

            {employeeData?.id ?null
              :  <Link
              to="/register"
              className={`px-4 py-2 rounded font-medium transition
                ${isHome && !scrolled
                  ? "bg-white text-green-500 hover:bg-green-100"
                  : "bg-green-500 text-white hover:bg-green-600"
                }`}
            >
              Request Demo
            </Link>}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isHome && !scrolled ? "text-white" : "text-green-500"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isHome && !scrolled ? "text-white" : "text-green-500"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden ${isHome && !scrolled ? "bg-black/80" : "bg-white"} border-t border-gray-200`}>
          <div className={`max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-2
            ${isHome && !scrolled ? "text-white" : "text-gray-600"}`}
          >
            <Link to="/dashboard" className="py-2 hover:text-green-400 transition">Dashboard</Link>
            <Link to="/features" className="py-2 hover:text-green-400 transition">Features</Link>
            <Link to="/pricing" className="py-2 hover:text-green-400 transition">Pricing</Link>
            <Link to="/contact" className="py-2 hover:text-green-400 transition">Contact</Link>
            <Link
              to="/login"
              className="py-2 px-4 border border-green-500 rounded hover:bg-green-500 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              to="/demo"
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
