import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresView } from "../../redux/slice/companySlice";
import { createLead } from "../../redux/slice/leadSlice";
import { useNavigate } from "react-router-dom";

const HIDDEN_FIELDS = ["status"]; // 👈 hide Status from UI

function LeadForm() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { companyConfigureViewData } = useSelector(
    (state) => state.reducer.company
  );

  const [formData, setFormData] = useState({});
  const [bulkLeads, setBulkLeads] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  useEffect(() => {
    dispatch(companyConfiguresView());
  }, [dispatch]);

  const leadSchema = companyConfigureViewData?.data?.leadForm || [];

  /* -------------------- SINGLE FORM -------------------- */

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createLead(formData)).unwrap();
      alert("Lead created successfully");
      setFormData();
      navigate("/company/leadall")
    } catch (err) {
      alert("Failed to create lead");
      console.error(err);
    }
  };

  /* -------------------- BULK UPLOAD -------------------- */

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setBulkLeads(XLSX.utils.sheet_to_json(worksheet));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = async () => {
    try {
      for (const lead of bulkLeads) {
        await dispatch(createLead(lead)).unwrap();
      }
      alert("Bulk leads created");
      setBulkLeads([]);
    } catch (err) {
      alert("Bulk upload failed");
      console.error(err);
    }
  };

  /* -------------------- RENDER -------------------- */

  return (
    <CompanyLayout>
      <div className="p-6 bg-gray-50 min-h-screen">

        {/* TOGGLE */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsBulkMode(false)}
            className={`px-6 py-2 border rounded-l-xl ${
              !isBulkMode ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            Single Lead
          </button>
          <button
            onClick={() => setIsBulkMode(true)}
            className={`px-6 py-2 border rounded-r-xl ${
              isBulkMode ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            Bulk Upload
          </button>
        </div>

        {/* SINGLE LEAD FORM */}
        {!isBulkMode ? (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-6 text-center">Create Lead</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {leadSchema?.filter(
                  (field) =>
                    !HIDDEN_FIELDS.includes(field.fieldKey?.toLowerCase())
                )
                .map((field, idx) => (
                  <div key={idx}>
                    <label className="block font-medium mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={formData[field.fieldKey] || ""}
                        onChange={(e) =>
                          handleChange(field.fieldKey, e.target.value)
                        }
                        required={field.required}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        className="w-full border p-2 rounded"
                        value={formData[field?.fieldKey] || ""}
                        onChange={(e) =>
                          handleChange(field.fieldKey, e.target.value)
                        }
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        className="w-full border p-2 rounded"
                        value={formData[field?.fieldKey] || ""}
                        onChange={(e) =>
                          handleChange(field.fieldKey, e.target.value)
                        }
                        required={field.required}
                      />
                    )}
                  </div>
                ))}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl"
              >
                Submit Lead
              </button>
            </form>
          </div>
        ) : (
          /* BULK */
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4 text-center">Bulk Upload</h2>

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleExcelUpload}
              className="w-full border p-2 rounded"
            />

            {bulkLeads.length > 0 && (
              <button
                onClick={handleBulkSubmit}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              >
                Submit All Leads
              </button>
            )}
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}

export default LeadForm;
