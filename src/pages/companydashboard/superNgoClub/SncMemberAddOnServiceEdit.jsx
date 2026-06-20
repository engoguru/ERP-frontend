import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  sncServiceUpdateOne,
  sncServiceViewOne,
} from "../../../redux/slice/snc/sncserviceSlice";
import { useParams } from "react-router-dom";
import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────── tiny helpers ─────────────────────────── */
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

/* ── Section Header ── */
const SectionHeader = ({ icon, label, color }) => {
  const colorMap = {
    blue: { wrap: "bg-gray-50 border-gray-200", icon: "bg-blue-50 text-blue-600 ring-1 ring-blue-100" },
    green: { wrap: "bg-gray-50 border-gray-200", icon: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" },
    amber: { wrap: "bg-gray-50 border-gray-200", icon: "bg-amber-50 text-amber-600 ring-1 ring-amber-100" },
    purple: { wrap: "bg-gray-50 border-gray-200", icon: "bg-violet-50 text-violet-600 ring-1 ring-violet-100" },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div className={`flex items-center gap-3 px-5 py-3 border-b ${c.wrap}`}>
      <span className={`w-7 h-7 rounded-lg ${c.icon} inline-flex items-center justify-center text-sm flex-shrink-0`}>
        {icon}
      </span>
      <span className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">
        {label}
      </span>
    </div>
  );
};

/* ── Card ── */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 overflow-hidden mb-px shadow-sm ${className}`}>
    {children}
  </div>
);

/* ── Label ── */
const Label = ({ children }) => (
  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 tracking-wide uppercase">
    {children}
  </label>
);

/* ── TextInput ── */
const TextInput = ({ prefix, readOnly, computed, className = "", ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold pointer-events-none z-10">
          {prefix}
        </span>
      )}
      <input
        {...props}
        readOnly={readOnly}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "w-full h-10 rounded-lg text-sm outline-none font-[inherit] transition-all duration-150",
          "border",
          prefix ? "pl-7 pr-3" : "px-3",
          readOnly
            ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-900 border-gray-300 hover:border-gray-400",
          computed ? "border-dashed text-blue-600 bg-blue-50/40" : "",
          focused && !readOnly ? "border-gray-900 ring-2 ring-gray-900/10" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
};

/* ── SelectInput ── */
const SelectInput = ({ children, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <select
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "w-full h-10 rounded-lg text-sm outline-none font-[inherit] transition-all duration-150 cursor-pointer",
          "appearance-none bg-white text-gray-900 border pr-8 pl-3",
          "border-gray-300 hover:border-gray-400",
          focused ? "border-gray-900 ring-2 ring-gray-900/10" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        width="12" height="8" viewBox="0 0 12 8" fill="none"
      >
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/* ── Summary Chip ── */
const SummaryChip = ({ label, value, accent }) => {
  const accentMap = {
    default: { val: "text-gray-900", bg: "bg-white border-gray-200" },
    green: { val: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
    red: { val: "text-red-700", bg: "bg-red-50 border-red-200" },
    blue: { val: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  };
  const a = accentMap[accent] || accentMap.default;
  return (
    <div className={`flex-1 ${a.bg} border rounded-xl p-3.5 shadow-sm transition-shadow hover:shadow-md`}>
      <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</div>
      <div className={`text-[17px] font-bold tracking-tight ${a.val}`}>{value}</div>
    </div>
  );
};

/* ── Doc Thumb ── */
const DocThumb = ({ src, onRemove }) => (
  <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
    <img src={src} alt="" className="w-full h-full object-cover block" />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-150" />
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-red-600 cursor-pointer"
    >
      ✕
    </button>
  </div>
);

/* ── Upload Zone ── */
const UploadZone = ({ onChange }) => {
  const [hover, setHover] = useState(false);
  return (
    <label
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        "block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
        hover
          ? "border-gray-400 bg-gray-50"
          : "border-gray-200 bg-gray-50/50 hover:border-gray-300",
      ].join(" ")}
    >
      <input type="file" multiple accept="image/*,.pdf" onChange={onChange} className="hidden" />
      <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg transition-colors duration-200 ${hover ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-400"}`}>
        ↑
      </div>
      <div className="text-sm text-gray-500">
        <span className="text-gray-800 font-semibold">Click to upload</span>{" "}or drag files here
      </div>
      <div className="text-xs text-gray-400 mt-1">PNG, JPG, PDF — up to 10 MB each</div>
    </label>
  );
};

/* ─────────────────────────── main component ─────────────────────────── */
function SncMemberAddOnServiceEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
const navigate = useNavigate();
  const [existingDocs, setExistingDocs] = useState([]);
  const [newDocs, setNewDocs] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    serviceName: "",
    totalAmount: "",
    paidAmount: "",
    unpaidAmount: "",
    gstAmount: "",
    otherExpanses: "",
    status: "",
    assigned: []
  });

  const { employeeList, loading, error } = useSelector(
    (state) => state.reducer.employee
  );
  const { sncServiceOneDetail } = useSelector((state) => state.reducer.sncService);


  useEffect(() => { dispatch(sncServiceViewOne(id)); }, [id, dispatch]);

  useEffect(() => {
    if (sncServiceOneDetail?.data) {
      const d = sncServiceOneDetail.data;
      setForm({
        serviceName: d.serviceName || "",
        totalAmount: d.totalAmount || "",
        paidAmount: d.paidAmount || "",
        unpaidAmount: d.unpaidAmount || "",
        gstAmount: d.gstAmount || "",
        otherExpanses: d.otherExpanses || "",
        status: d.status || "",
        assigned: d.assigned || []
      });
      setExistingDocs(d.docs || []);
    }
  }, [sncServiceOneDetail]);

  useEffect(() => {
    dispatch(viewEmployees())
    // viewEmployees
  }, []);
  // console.log(employeeList, "list")
  useEffect(() => {
    const due = Number(form.totalAmount || 0) - Number(form.paidAmount || 0);
    if(due==0){
  setForm((prev) => ({ ...prev, unpaidAmount: 0 }));
    }else{
        setForm((prev) => ({ ...prev, unpaidAmount: due }));
    }
  
  }, [form.totalAmount, form.paidAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setNewDocs((prev) => [...prev, ...mapped]);
  };

  const removeExistingDoc = (index) => setExistingDocs((prev) => prev.filter((_, i) => i !== index));

  const removeNewDoc = (index) => {
    URL.revokeObjectURL(newDocs[index].preview);
    setNewDocs((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);
  //   try {
  //     // console.log(form)
  //     const payload = new FormData();
  //     Object.entries(form).forEach(([k, v]) => payload.append(k, v));
  //     newDocs?.forEach((d) => payload.append("docs", d.file));
  //     await dispatch(sncServiceUpdateOne({ id, data: payload })).unwrap();
  //     alert("Service updated successfully");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Update failed");
  //   } finally {
  //     setSaving(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const payload = new FormData();

    payload.append("serviceName", form.serviceName);
    payload.append("totalAmount", form.totalAmount);
    payload.append("paidAmount", form.paidAmount);
    payload.append("unpaidAmount", form.unpaidAmount);
    payload.append("gstAmount", form.gstAmount);
    payload.append("otherExpanses", form.otherExpanses);
    payload.append("status", form.status);

    // Array/Object must be stringified
    payload.append("assigned", JSON.stringify(form.assigned));

    newDocs?.forEach((d) => {
      payload.append("docs", d.file);
    });

    await dispatch(
      sncServiceUpdateOne({
        id,
        data: payload,
      })
    ).unwrap();

    alert("Service updated successfully");
    navigate(0);
  } catch (err) {
    console.error(err);
    alert("Update failed");
  } finally {
    setSaving(false);
  }
};
  const total = Number(form.totalAmount || 0);
  const paid = Number(form.paidAmount || 0);
  const due = total - paid;
  const gst = Number(form.gstAmount || 0);

  /* ── render ── */
  // const updateAssignedStatus = (userId, status) => {
  //   // setForm(prev => ({
  //   //   ...prev,
  //   //   assigned: prev.assigned.map(user =>
  //   //     user.userId === userId
  //   //       ? { ...user, status }
  //   //       : user
  //   //   )
  //   // }));
  // };

  return (
    <CompanyLayout pageTitle="Edit SNC Service">
      {/* Black outer background */}
      <div className="min-h-screen bg-gray-300">
        <div className="max-w-[800px] mx-auto px-5 py-8">

          {/* ── Page Header ── */}
          <div className="mb-7">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-medium">
              <span className="hover:text-gray-400 cursor-pointer transition-colors">SNC Members</span>
              <span className="text-gray-600">› Edit Add-On Service</span>
              <span className="text-gray-700">›</span>
              <span className="text-gray-600">Edit</span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[22px] font-bold  tracking-tight leading-tight text-gray-700">
                  Edit Add-On Service
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Update service details, financials and supporting documents
                </p>
              </div>
              {form.status && (
                <span className={[
                  "px-3 py-1 rounded-full text-xs font-semibold tracking-wide border mt-1",
                  form.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    form.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      form.status === "completed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-red-50 text-red-700 border-red-200",
                ].join(" ")}>
                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* ── Summary Chips — white/tinted on black ── */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <SummaryChip label="Total" value={`₹${fmt(total)}`} accent="default" />
            <SummaryChip label="Paid" value={`₹${fmt(paid)}`} accent="green" />
            <SummaryChip label="Due" value={`₹${fmt(due)}`} accent={due > 0 ? "red" : "green"} />
            <SummaryChip label="GST" value={`₹${fmt(gst)}`} accent="blue" />
          </div>

          {/* ── Form — white cards stacked on black bg ── */}
          <form onSubmit={handleSubmit} className="space-y-px">

            {/* ── Service Info ── */}
            <Card className="rounded-t-xl rounded-b-none">
              <SectionHeader icon="⚙" label="Service info" color="blue" />
              <div className="p-5">



                <div className="flex">
               
                  <div>
                    <select
                      onChange={(e) =>
                        setForm({
                          ...form,
                          assigned: [
                            {
                              userId: e.target.value,
                              userName:
                                employeeList.find(emp => emp._id === e.target.value)?.name || "",
                              status: "Active"
                            }
                          ]
                        })
                      }
                    >
                      <option value="">Select Employee</option>

                      {employeeList?.map((user, index) => (
                        <option key={index} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>




                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Service name</Label>
                    <TextInput
                      type="text"
                      name="serviceName"
                      value={form.serviceName}
                      onChange={handleChange}
                      placeholder="e.g. GST Filing, Annual Compliance"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <SelectInput name="status" value={form.status} onChange={handleChange}>
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </SelectInput>

                  </div>

                </div>
              </div>
            </Card>

            {/* ── Financial Details ── */}
            <Card className="rounded-none">
              <SectionHeader icon="₹" label="Financial details" color="green" />
              <div className="p-5">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Total amount</Label>
                    <TextInput prefix="₹" type="number" name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="0" />
                  </div>
                  <div>
                    <Label>Paid amount</Label>
                    <TextInput prefix="₹" type="number" name="paidAmount" value={form.paidAmount} onChange={handleChange} placeholder="0" />
                  </div>
                  <div>
                    <Label>Due (auto)</Label>
                    <TextInput prefix="₹" type="number" name="unpaidAmount" value={form.unpaidAmount} readOnly computed />
                  </div>
                  <div>
                    <Label>GST amount</Label>
                    <TextInput prefix="₹" type="number" name="gstAmount" value={form.gstAmount} onChange={handleChange} placeholder="0" />
                  </div>
                  <div className="col-span-2">
                    <Label>Other expenses</Label>
                    <TextInput prefix="₹" type="number" name="otherExpanses" value={form.otherExpanses} onChange={handleChange} placeholder="0" />
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Existing Documents ── */}
            <Card className="rounded-none">
              <SectionHeader icon="📄" label="Existing documents" color="amber" />
              <div className="p-5">
                {existingDocs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-5 text-center">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-base mb-2">📂</div>
                    <p className="text-sm text-gray-400">No existing documents attached</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2.5">
                    {existingDocs.map((doc, i) => (
                      <DocThumb key={i} src={doc.url} onRemove={() => removeExistingDoc(i)} />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* ── Upload New Documents ── */}
            <Card className="rounded-none">
              <SectionHeader icon="↑" label="Upload new documents" color="purple" />
              <div className="p-5">
                <UploadZone onChange={handleFileChange} />
                {newDocs.length > 0 && (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2.5 mt-4">
                    {newDocs.map((doc, i) => (
                      <DocThumb key={i} src={doc.preview} onRemove={() => removeNewDoc(i)} />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* ── Footer — white, black CTA ── */}
            <div className="bg-white border border-gray-200 rounded-b-xl rounded-t-none px-5 py-3.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                All changes are saved immediately on submit
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="h-9 px-4 rounded-lg text-sm font-medium cursor-pointer bg-white border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150 font-[inherit]"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={[
                    "h-9 px-5 rounded-lg text-sm font-semibold transition-all duration-150 font-[inherit] flex items-center gap-2",
                    saving
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                      : "bg-gray-900 text-white hover:bg-black shadow-sm hover:shadow-md cursor-pointer",
                  ].join(" ")}
                >
                  {saving ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>Save changes <span className="opacity-50">→</span></>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default SncMemberAddOnServiceEdit;