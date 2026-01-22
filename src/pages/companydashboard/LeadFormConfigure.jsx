import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresUpdate, companyConfiguresView } from "../../redux/slice/companySlice";
import { Save, Plus } from "lucide-react";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "select", label: "Select" },
  { value: "multiselect", label: "Multi Select" },
  { value: "file", label: "File Upload" },
];

function LeadFormConfigure() {
  const dispatch = useDispatch();
  const { companyConfigureViewData } = useSelector((state) => state?.reducer?.company);

  const [fields, setFields] = useState([]);

  // Prefill with existing leadForm data
  useEffect(() => {
    if (companyConfigureViewData?.data?.leadForm) {
      setFields(companyConfigureViewData.data.leadForm);
    }
  }, [companyConfigureViewData]);

  const addField = () => {
    setFields([
      ...fields,
      {
        fieldKey: "",
        label: "",
        type: "",
        required: false,
        options: [],
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;

    // Clear options if type no longer supports them
    if (key === "type" && !["select", "multiselect"].includes(value)) {
      newFields[index].options = [];
    }

    setFields(newFields);
  };

  const addOption = (index) => {
    const newFields = [...fields];
    newFields[index].options.push("");
    setFields(newFields);
  };

  const updateOption = (fieldIndex, optIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optIndex] = value;
    setFields(newFields);
  };

  const removeOption = (fieldIndex, optIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.splice(optIndex, 1);
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    for (let f of fields) {
      if (!f.fieldKey.trim() || !f.label.trim() || !f.type) {
        alert("Every field must have a name, label, and type.");
        return;
      }
      if (["select", "multiselect"].includes(f.type) && f.options.length === 0) {
        alert("Select or Multi Select fields must have at least one option.");
        return;
      }
    }

    const payload = { leadForm: fields };
    await dispatch(companyConfiguresUpdate(payload));

    alert("Lead form schema saved successfully!");
  };

  return (
    <CompanyLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* ===== HEADER ===== */}
        <h2 className="text-3xl font-bold text-gray-800">Lead Form Builder</h2>

        {/* ===== FIELD LIST ===== */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="bg-white border p-4 rounded-lg shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Field {index + 1}
                </span>
                <button
                  className="text-red-500"
                  onClick={() => removeField(index)}
                >
                  Remove
                </button>
              </div>

              {/* Field Key */}
              <input
                type="text"
                placeholder="Field Name (e.g. company_name)"
                value={field.fieldKey}
                onChange={(e) =>
                  updateField(index, "fieldKey", e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />

              {/* Label */}
              <input
                type="text"
                placeholder="Label (Shown to user)"
                value={field.label}
                onChange={(e) =>
                  updateField(index, "label", e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />

              {/* Type */}
              <select
                value={field.type}
                onChange={(e) => updateField(index, "type", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Type</option>
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              {/* Required Toggle */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(index, "required", e.target.checked)
                  }
                />
                Required
              </label>

              {/* Options for Select / MultiSelect */}
              {["select", "multiselect"].includes(field.type) && (
                <div className="space-y-2">
                  <label className="font-medium">Options</label>
                  {field.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) =>
                          updateOption(index, optIndex, e.target.value)
                        }
                        className="flex-1 border px-3 py-2 rounded"
                      />
                      <button
                        onClick={() => removeOption(index, optIndex)}
                        className="text-red-500"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(index)}
                    className="text-blue-600"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex gap-4">
          <button
            onClick={addField}
            className="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <Plus /> Add Field
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <Save /> Save Schema
          </button>
        </div>

        {/* ===== LIVE PREVIEW ===== */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Live Preview</h3>

          {fields.length === 0 && (
            <p className="text-gray-400">No fields added yet.</p>
          )}

          {fields.map((field, index) => (
            <div key={index} className="mb-3">
              <label className="font-medium block text-gray-800">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "select" || field.type === "multiselect" ? (
                <select className="w-full border px-3 py-2 rounded">
                  <option>Select option</option>
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="w-full border px-3 py-2 rounded"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </CompanyLayout>
  );
}

export default LeadFormConfigure;
