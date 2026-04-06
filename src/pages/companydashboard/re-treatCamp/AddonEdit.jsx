import React, { useEffect, useState } from 'react';
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateServices, viewOneService } from '../../../redux/slice/serviceAddSlice';

function AddonEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate=useNavigate()

  const { oneservice } = useSelector((state) => state.reducer.service);

  const [formData, setFormData] = useState({
    serviceName: '',
    totalAmount: '',
    paidAmount: '',
    unpaidAmount: 0,
    docs: [], // new uploads
    existingDocs: [] // old docs
  });

  // Fetch service data
  useEffect(() => {
    if (id) {
      dispatch(viewOneService(id));
    }
  }, [id, dispatch]);

  // Populate form data
  useEffect(() => {
    if (oneservice?.data) {
      setFormData({
        serviceName: oneservice.data.serviceName || '',
        totalAmount: oneservice.data.totalAmount || '',
        paidAmount: oneservice.data.paidAmount || '',
        unpaidAmount: oneservice.data.unpaidAmount || 0,
        docs: [],
        existingDocs: oneservice.data.docs || []
      });
    }
  }, [oneservice]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-calculate unpaid amount
  useEffect(() => {
    const total = Number(formData.totalAmount || 0);
    const paid = Number(formData.paidAmount || 0);
    const unpaid = total - paid;

    setFormData((prev) => ({
      ...prev,
      unpaidAmount: unpaid >= 0 ? unpaid : 0
    }));
  }, [formData.totalAmount, formData.paidAmount]);

  // Handle new file uploads
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      docs: [...prev.docs, ...Array.from(e.target.files)]
    }));
  };

  // Remove an existing document
  const removeExistingDoc = (index) => {
    const updated = formData.existingDocs.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, existingDocs: updated }));
  };

  // Submit updated service
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("serviceName", formData.serviceName);
    payload.append("totalAmount", formData.totalAmount);
    payload.append("paidAmount", formData.paidAmount);
    payload.append("unpaidAmount", formData.unpaidAmount);

    // Append new files
    formData.docs.forEach((file) => payload.append("docs", file));

    // Append existing docs only if user kept them
    if (formData.existingDocs.length > 0) {
      payload.append("existingDocs", JSON.stringify(formData.existingDocs));
    }

    try {
      const res = await dispatch(updateServices({ id, data: payload })).unwrap();
      if(res.success){
        alert("Service updated successfully!");
        navigate(0)
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <CompanyLayout pageTitle="Edit Service">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Edit Service</h2>

          {/* Service Name */}
          <div>
            <label className="text-sm text-gray-600">Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="text-sm text-gray-600">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Paid Amount */}
          <div>
            <label className="text-sm text-gray-600">Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Unpaid Amount */}
          <div>
            <label className="text-sm text-gray-600">Unpaid Amount</label>
            <input
              type="number"
              value={formData.unpaidAmount}
              readOnly
              className="mt-1 w-full border rounded-lg p-3 bg-gray-100 font-semibold"
            />
          </div>

          {/* Existing Documents */}
          <div>
            <label className="text-sm text-gray-600">Existing Documents</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.existingDocs.map((doc, index) => (
                <div key={index} className="relative">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={doc.url}
                      alt="doc"
                      className="w-16 h-16 object-cover border rounded"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={() => removeExistingDoc(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Uploads Preview */}
          <div>
            <label className="text-sm text-gray-600">New Uploads</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.docs.map((file, index) => (
                <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {file.name}
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm text-gray-600">Update Documents</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full border rounded-lg p-3 file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Update Service
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </CompanyLayout>
  );
}

export default AddonEdit;