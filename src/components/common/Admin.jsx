import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyCompany } from "../../redux/slice/adminSlice";

function Admin({he}) {
    console.log(he,"hgh")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyEmail: "",
    companyPhone: "",
    licenseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState({ emailOtp: "", phoneOtp: "" });
  const [testOtp, setTestOtp] = useState({ email: "", phone: "" }); // for demo / test mode

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
    const response = await dispatch(verifyCompany(formData));

    if (response.payload?.success) {
      console.log("Test OTP:", response.payload.testOtp);

      setTestOtp({ email: response.payload.testOtp, phone: response.payload.testOtp });
      setShowOtpModal(true);
    } else {
      alert(response.payload?.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  const handleVerifyOtp = () => {
    // ✅ Simple validation for demo
    if (otp.emailOtp === testOtp.email || otp.phoneOtp === testOtp.phone) {
      alert("OTP verified successfully!");
      setShowOtpModal(false);
      navigate("/company/Admin");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== BANNER ===== */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Your Admin Panel
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Securely manage your SaaS license and company settings. Enter your license
          details below to continue.
        </p>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="flex justify-center items-center flex-1 bg-gray-50 py-12 px-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Admin License Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Company Phone</label>
              <input
                type="text"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">License ID</label>
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {loading ? "Validating..." : "Validate License"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== OTP MODAL ===== */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Enter OTP</h3>
            <p className="text-gray-600 mb-4 text-center">
              Enter the OTP sent to your Email or Phone
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Email OTP</label>
                <input
                  type="text"
                  name="emailOtp"
                  value={otp.emailOtp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone OTP</label>
                <input
                  type="text"
                  name="phoneOtp"
                  value={otp.phoneOtp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setShowOtpModal(false)}
                className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
