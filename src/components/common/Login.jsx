import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../layout/Footer";
import { employeeDetails, employeeLogin } from "../../redux/slice/employee/loginSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bannerText = "Welcome to the ERP Login Panel";

  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    licenseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState({ emailOtp: "", phoneOtp: "" });
  const [testOtp, setTestOtp] = useState({ email: "", phone: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(employeeLogin(formData));
      console.log(response, "ress")
      
      if (response.payload.success) {
        setTestOtp({ email: response.payload.testOtp, phone: response.payload.testOtp });
        setShowOtpModal(true);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

const handleVerifyOtp =async (e) => {
  e.preventDefault();

  if (
    otp.emailOtp === testOtp.email ||
    otp.phoneOtp === testOtp.phone
  ) {

    alert("OTP verified successfully!");
          await dispatch(employeeDetails());
    navigate("/company/dashboard", { replace: true });
  } else {
    alert("Invalid OTP. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== BANNER ===== */}
      <div className="bg-gradient-to-r from-[hsl(168_76%_42%)] to-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {bannerText}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Securely manage your company license, employees, payroll, and performance.
        </p>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="flex justify-center items-center flex-1 bg-gray-50 py-12 px-4">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            License Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="example@company.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">License ID</label>
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="LIC-XXXX-XXXX"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(168_76%_42%)] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-4"
            >
              {loading ? "Validating..." : "Validate License"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== OTP MODAL ===== */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              OTP Verification
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Enter the OTP sent to your Email or Phone
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email OTP</label>
                <input
                  type="text"
                  name="emailOtp"
                  value={otp.emailOtp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  placeholder="Enter Email OTP"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Phone OTP</label>
                <input
                  type="text"
                  name="phoneOtp"
                  value={otp.phoneOtp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  placeholder="Enter Phone OTP"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setShowOtpModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Login;
