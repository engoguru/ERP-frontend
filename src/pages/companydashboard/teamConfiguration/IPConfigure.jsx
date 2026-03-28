// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";
// import { createIp } from "../../../redux/slice/employee/ipSlice";

// function IPConfigure() {
//   const dispatch = useDispatch();
//   const { employeeList, loading, error } = useSelector(
//     (state) => state.reducer.employee
//   );

//   const [formData, setFormData] = useState({
//     employeeId: "",
//     licenseId: "",
//     ip: "",
//   });

//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     dispatch(viewEmployees());
//   }, [dispatch]);

//   const handleEmployeeChange = (e) => {
//     const employeeId = e.target.value;
//     const selectedEmployee = employeeList.find((emp) => emp._id === employeeId);
//     setFormData({
//       employeeId,
//       licenseId: selectedEmployee?.licenseId || "",
//       ip: "",
//     });
//   };

//   const handleIpChange = (e) => {
//     setFormData((prev) => ({ ...prev, ip: e.target.value }));
//   };

//   const handleCopyIp = () => {
//     if (!formData.ip) return;
//     navigator.clipboard.writeText(formData.ip).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.employeeId || !formData.licenseId || !formData.ip) {
//       alert("Employee and IP are required");
//       return;
//     }
//     dispatch(createIp(formData));
//     setFormData({ employeeId: "", licenseId: "", ip: "" });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Configure IP</h2>

//       {loading && <p className="text-gray-500 mb-2">Loading employees...</p>}
//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Employee dropdown */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Employee</label>
//           <select
//             value={formData.employeeId}
//             onChange={handleEmployeeChange}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select Employee</option>
//             {employeeList?.map((emp) => (
//               <option key={emp._id} value={emp._id}>
//                 {emp.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* IP input with copy button */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">IP Address</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Enter IPv4 from ipconfig"
//               value={formData.ip}
//               onChange={handleIpChange}
//               className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               type="button"
//               onClick={handleCopyIp}
//               className={`px-3 py-2 rounded text-white transition ${
//                 copied ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
//               }`}
//             >
//               {copied ? "Copied!" : "Copy"}
//             </button>
//           </div>
//           <p className="text-gray-500 text-sm mt-1">Copy the IPv4 from your cmd (ipconfig)</p>
//         </div>

//         {/* Submit button */}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded shadow transition"
//         >
//           Save IP
//         </button>
//       </form>
//     </div>
//   );
// }

// export default IPConfigure;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";
import { createIp } from "../../../redux/slice/employee/ipSlice";

/* ── Design tokens (same as Dashboard) ─────────────────────── */
const T = {
  indigo:     "#6366f1",
  indigoLight:"#818cf8",
  emerald:    "#10b981",
  rose:       "#f43f5e",
  amber:      "#f59e0b",
  slate:      "#334155",
  muted:      "#64748b",
  subtle:     "#94a3b8",
  border:     "rgba(226,232,240,0.9)",
};

/* ── Inject styles once ─────────────────────────────────────── */
const IP_CSS = `
  @keyframes ip-up {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ip-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ip-pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.08); }
    100% { transform: scale(1); }
  }

  .ip-select, .ip-input {
    width: 100%;
    background: #f8fafc;
    border: 1px solid rgba(226,232,240,0.9);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #0f172a;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    appearance: none;
    -webkit-appearance: none;
  }
  .ip-select:focus, .ip-input:focus {
    border-color: #6366f1;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }
  .ip-select:hover, .ip-input:hover {
    border-color: rgba(99,102,241,0.3);
    background: #fff;
  }
  .ip-select option { color: #0f172a; background: #fff; }

  .ip-submit {
    width: 100%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 13px 24px;
    font-size: 13px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: opacity .2s, transform .15s, box-shadow .2s;
    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
  }
  .ip-submit:hover  { opacity: .92; box-shadow: 0 6px 20px rgba(99,102,241,0.45); }
  .ip-submit:active { transform: scale(0.985); }
  .ip-submit:disabled { opacity:.5; cursor:not-allowed; box-shadow:none; }

  .ip-copy-btn {
    flex-shrink: 0;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .15s;
    white-space: nowrap;
    letter-spacing: 0.3px;
  }
  .ip-copy-btn:hover  { background: #dcfce7; border-color: #86efac; }
  .ip-copy-btn:active { transform: scale(0.96); }
  .ip-copy-btn.copied {
    background: #10b981;
    border-color: #10b981;
    color: #fff;
    animation: ip-pop .3s ease;
  }

  .ip-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .ip-field { animation: ip-up .4s ease both; }
  .ip-field:nth-child(1) { animation-delay: 60ms; }
  .ip-field:nth-child(2) { animation-delay: 120ms; }
  .ip-field:nth-child(3) { animation-delay: 180ms; }

  .ip-info-row {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 12px;
    background: #f8fafc;
    border: 1px solid rgba(226,232,240,0.8);
    border-radius: 8px;
    margin-top: 8px;
  }

  .ip-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(99,102,241,0.2);
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: ip-spin .7s linear infinite;
    display: inline-block;
  }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("ip-cfg-css")) return;
    const el = document.createElement("style");
    el.id = "ip-cfg-css";
    el.textContent = IP_CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ── Avatar (reused pattern) ────────────────────────────────── */
function Avatar({ name = "", size = 28 }) {
  const palettes = [
    ["#e0e7ff","#4f46e5"],["#fef3c7","#d97706"],["#d1fae5","#059669"],
    ["#ffe4e6","#e11d48"],["#e0f2fe","#0284c7"],["#f3e8ff","#9333ea"],
  ];
  const [bg, fg] = palettes[(name.charCodeAt(0) || 0) % palettes.length];
  const ini = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: fg, border: `1.5px solid ${fg}25`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.34, flexShrink: 0,
      fontFamily: "'DM Mono', monospace",
    }}>{ini}</div>
  );
}

/* ── Selected employee chip ─────────────────────────────────── */
function EmployeeChip({ name, licenseId }) {
  if (!name) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px",
      background: "rgba(99,102,241,0.05)",
      border: "1px solid rgba(99,102,241,0.15)",
      borderRadius: 10, marginTop: 8,
      animation: "ip-up .3s ease both",
    }}>
      <Avatar name={name} size={28} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{name}</div>
        {licenseId && (
          <div style={{ fontSize: 10, color: T.subtle, fontFamily: "'DM Mono', monospace", marginTop: 1 }}>
            LIC · {licenseId.slice(0, 8)}…
          </div>
        )}
      </div>
      <div style={{ marginLeft: "auto" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.7px",
          background: "#f0fdf4", color: "#15803d",
          border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 99,
        }}>● Selected</span>
      </div>
    </div>
  );
}

/* ── Custom select arrow ────────────────────────────────────── */
function SelectWrapper({ children }) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      {/* Custom arrow */}
      <div style={{
        position: "absolute", right: 12, top: "50%",
        transform: "translateY(-50%)", pointerEvents: "none",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

/* ── IP Dot indicator ───────────────────────────────────────── */
function IpDots({ ip }) {
  if (!ip) return null;
  const parts = ip.split(".");
  const valid = parts.length === 4 && parts.every(p => !isNaN(p) && +p >= 0 && +p <= 255);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      marginTop: 8, padding: "8px 12px",
      background: valid ? "rgba(16,185,129,0.05)" : "rgba(244,63,94,0.05)",
      border: `1px solid ${valid ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"}`,
      borderRadius: 8, animation: "ip-up .25s ease both",
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: valid ? T.emerald : T.rose, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: valid ? "#15803d" : "#be123c", fontFamily: "'DM Mono', monospace" }}>
        {valid ? `Valid IPv4 — ${ip}` : "Invalid IPv4 format"}
      </span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
function IPConfigure() {
  const dispatch = useDispatch();
  const { employeeList, loading, error } = useSelector(
    (state) => state.reducer.employee
  );

  const [formData, setFormData] = useState({ employeeId: "", licenseId: "", ip: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { dispatch(viewEmployees()); }, [dispatch]);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const selectedEmployee = employeeList.find((emp) => emp._id === employeeId);
    setFormData({ employeeId, licenseId: selectedEmployee?.licenseId || "", ip: "" });
  };

  const handleIpChange = (e) => {
    setFormData((prev) => ({ ...prev, ip: e.target.value }));
  };

  const handleCopyIp = () => {
    if (!formData.ip) return;
    navigator.clipboard.writeText(formData.ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.licenseId || !formData.ip) {
      alert("Employee and IP are required");
      return;
    }
    dispatch(createIp(formData));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setFormData({ employeeId: "", licenseId: "", ip: "" });
  };

  const selectedEmployee = employeeList?.find(e => e._id === formData.employeeId);
  const isFormReady = formData.employeeId && formData.ip;

  return (
    <>
      <StyleInjector />
      <div style={{ padding: "24px 28px 28px", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Header row ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.2px" }}>
              Configure IP Address
            </div>
            <div style={{ fontSize: 12, color: T.subtle, marginTop: 3 }}>
              Assign a static IPv4 address to a team member's licence
            </div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>🌐</div>
        </div>

        {/* ── Status banners ── */}
        {loading && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 14px", borderRadius: 10, marginBottom: 16,
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
            animation: "ip-up .3s ease both",
          }}>
            <span className="ip-spinner" />
            <span style={{ fontSize: 12, color: T.indigo, fontWeight: 600 }}>Loading employees…</span>
          </div>
        )}
        {error && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 14px", borderRadius: 10, marginBottom: 16,
            background: "rgba(244,63,94,0.06)",
            border: "1px solid rgba(244,63,94,0.2)",
            animation: "ip-up .3s ease both",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.rose, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: T.rose, fontWeight: 600 }}>{error}</span>
          </div>
        )}
        {submitted && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 14px", borderRadius: 10, marginBottom: 16,
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.2)",
            animation: "ip-up .3s ease both",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.emerald, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#15803d", fontWeight: 600 }}>IP address saved successfully ✓</span>
          </div>
        )}

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Employee dropdown */}
          <div className="ip-field">
            <label className="ip-label">Employee</label>
            <SelectWrapper>
              <select
                className="ip-select"
                value={formData.employeeId}
                onChange={handleEmployeeChange}
              >
                <option value="">Select an employee…</option>
                {employeeList?.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>
            </SelectWrapper>
            <EmployeeChip name={selectedEmployee?.name} licenseId={formData.licenseId} />
          </div>

          {/* IP Address input */}
          <div className="ip-field">
            <label className="ip-label">IP Address</label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1 }}>
                {/* Network icon inside input */}
                <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={formData.ip ? T.indigo : "#94a3b8"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 192.168.1.10"
                  value={formData.ip}
                  onChange={handleIpChange}
                  className="ip-input"
                  style={{ paddingLeft: 34, fontFamily: "'DM Mono', monospace", fontSize: 13 }}
                />
              </div>
              <button
                type="button"
                onClick={handleCopyIp}
                className={`ip-copy-btn${copied ? " copied" : ""}`}
              >
                {copied ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Copied!
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                  </span>
                )}
              </button>
            </div>

            {/* Live IP validation */}
            {formData.ip && <IpDots ip={formData.ip} />}

            {/* Helper hint */}
            <div className="ip-info-row">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.subtle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ fontSize: 11, color: T.subtle }}>
                Run <code style={{ fontFamily: "'DM Mono', monospace", background: "#f1f5f9", padding: "1px 5px", borderRadius: 4, fontSize: 10, color: T.slate }}>ipconfig</code> in CMD → copy the IPv4 address
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, rgba(226,232,240,0.8), rgba(226,232,240,0.2), transparent)" }} />

          {/* Submit */}
          <div className="ip-field">
            <button
              type="submit"
              className="ip-submit"
              disabled={!isFormReady}
            >
              {submitted ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  IP Saved Successfully
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save IP Configuration
                </span>
              )}
            </button>
            {!isFormReady && (
              <div style={{ fontSize: 11, color: T.subtle, textAlign: "center", marginTop: 8 }}>
                Select an employee and enter an IP address to continue
              </div>
            )}
          </div>

        </form>
      </div>
    </>
  );
}

export default IPConfigure;
