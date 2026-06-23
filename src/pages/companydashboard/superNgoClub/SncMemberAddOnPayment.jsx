import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPayment } from "../../../redux/slice/snc/sncpaymentSlice";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useNavigate, useParams } from "react-router-dom";
const PaymentForm = ({ sncId, licenseId }) => {
  const dispatch = useDispatch();
const { id } = useParams();
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    paymentMode: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sncId:id,
      paymentMode: formData.paymentMode,
      Amount: Number(formData.amount),
    };

    try {
      setLoading(true);
      await dispatch(createPayment(payload)).unwrap();
      setFormData({ paymentMode: "", amount: "" });
    } catch (err) {
      console.error("Payment failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      paymentMode: "",
      amount: "",
    });
  };

  return (
    <CompanyLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Mode
              </label>
              <input
                type="text"
                name="paymentMode"
                placeholder="UPI / Card / Cash"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Create Now"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default PaymentForm;