import React, { useState, useEffect } from 'react';
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout';
import { useDispatch } from 'react-redux';
import { createService } from '../../../redux/slice/serviceAddSlice';
import { useNavigate, useParams } from 'react-router-dom';

function AddonNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { id } = useParams()

const [formData, setFormData] = useState({
  serviceName: '',
  customServiceName: '', // 👈 for "Others"
  totalAmount: '',
  paidAmount: '',
  unpaidAmount: 0,
  docs: [],
  existingDocs: []
});
  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // auto calculate unpaid
  useEffect(() => {
    const total = Number(formData.totalAmount || 0);
    const paid = Number(formData.paidAmount || 0);

    const unpaid = total - paid;

    setFormData((prev) => ({
      ...prev,
      unpaidAmount: unpaid >= 0 ? unpaid : 0
    }));
  }, [formData.totalAmount, formData.paidAmount]);

  // file handler
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      docs: e.target.files
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

  // ✅ Decide final service name
  const finalServiceName =
    formData.serviceName === "Others"
      ? formData.customServiceName
      : formData.serviceName;

  payload.append("serviceName", finalServiceName);
  payload.append("totalAmount", formData.totalAmount);
  payload.append("paidAmount", formData.paidAmount);
  payload.append("unpaidAmount", formData.unpaidAmount);

    for (let i = 0; i < formData.docs.length; i++) {
      payload.append("docs", formData.docs[i]);
    }

    const res = await dispatch(createService({ id, data: payload })).unwrap();

    if (res?.success) {
      alert("Service Created Successfully !")
      const initialState = {
        serviceName: '',
        paidAmount: '',
        totalAmount: '',
        unpaidAmount: 0,
        docs: []
      };
      setFormData(initialState)
      navigate(-1);
      // Reset form or redirect if needed
    } else {
      console.error("Service Created failed:", res.payload?.message);
    }
  };

  return (
    <CompanyLayout pageTitle={"Add New Service"}>
      <div className="min-h-screen bg-gray-300 flex items-center justify-center p-6 ">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Service
          </h2>

      <div>
  <label className="text-sm text-gray-600">Service Name</label>

  {/* Select Box */}
  <select
    name="serviceName"
    value={formData.serviceName}
    onChange={handleChange}
    className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    required
  >
    <option value="">Select Service</option>
    <option value="Web Development">Web Development</option>
    <option value="App Development">App Development</option>
    <option value="SEO">SEO</option>
    <option value="Marketing">Marketing</option>
    <option value="Others">Others</option>
  </select>

  {/* Show only when Others is selected */}
  {formData.serviceName === "Others" && (
    <input
      type="text"
      name="customServiceName"
      placeholder="Enter custom service"
      value={formData.customServiceName}
      onChange={handleChange}
      className="mt-3 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  )}
</div>

          {/* Total Amount */}
          <div>
            <label className="text-sm flex text-gray-600">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="Enter total amount"
              className="mt-1 w-full border rounded-lg p-1 text-sm focus:ring-1 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Paid Amount */}
          <div>
            <label className="text-sm  flex text-gray-600">Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
              placeholder="Enter paid amount"
              className="mt-1 w-full border rounded-lg p-1 focus:ring-1 text-sm focus:ring-green-300 outline-none"
            />
          </div>

          {/* Unpaid Amount (Auto) */}
          <div>
            <label className="text-sm flex text-gray-600">Unpaid Amount</label>
            <input
              type="number"
              value={formData.unpaidAmount}
              readOnly
              className="mt-1 w-full border rounded-lg p-1 text-sm bg-gray-100 text-gray-700 font-medium"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm flex text-gray-600">Upload Documents</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-500 rounded-lg p-1 file:bg-blue-400 file:text-white file:px-2 file:py-1 file:rounded-md file:text-xs"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Create Service
          </button>
        </form>
      </div>
    </CompanyLayout>
  );
}

export default AddonNew;