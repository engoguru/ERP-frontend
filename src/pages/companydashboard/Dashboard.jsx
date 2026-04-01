
import React, { useEffect, useState } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import IPConfigure from "./teamConfiguration/IPConfigure";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardLeadData, fetchDashboardUserData } from "../../redux/slice/dashbaordSlice";
import { Link } from "react-router-dom";
import { employeeDetails } from "../../redux/slice/employee/loginSlice";
import { base_URL } from "../../utils/BaseUrl";




/* ─── Animated counter ──────────────────────────────────────── */
function AnimatedNumber({ target = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start = null;
    const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setVal(Math.floor(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{val.toLocaleString()}</>;
}

/* ─── Animated bar ──────────────────────────────────────────── */
function Bar({ pct = 0, color = "#6366f1", h = 5, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 350 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="bar-track" style={{ height: h }}>
      <div className="bar-fill-el" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

/* ─── Avatar initials ───────────────────────────────────────── */
function Avatar({ name = "", i = 0, size = 34 }) {
  const palettes = [
    ["#e0e7ff","#4f46e5"],["#fef3c7","#d97706"],["#d1fae5","#059669"],
    ["#ffe4e6","#e11d48"],["#e0f2fe","#0284c7"],["#f3e8ff","#9333ea"],["#fce7f3","#be185d"],
  ];
  const [bg, fg] = palettes[i % palettes.length];
  const ini = name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();
  return (
    <div
      className="font-mono-dm flex items-center justify-center flex-shrink-0 font-bold rounded-full"
      style={{ width: size, height: size, background: bg, color: fg, border: `1.5px solid ${fg}25`, fontSize: size * 0.33 }}
    >
      {ini}
    </div>
  );
}

/* ─── Glow orb ──────────────────────────────────────────────── */
function Orb({ color, size = 140, top, left, blur = 70, opacity = 0.18 }) {
  return (
    <div className="orb" style={{ width: size, height: size, background: color, top, left, filter: `blur(${blur}px)`, opacity }} />
  );
}

/* ─── Section header ────────────────────────────────────────── */
function SectionHeader({ icon, title, accent, animClass = "anim-up-7" }) {
  return (
    <div className={`flex items-center gap-2.5 mb-[18px] ${animClass}`}>
      <div
        className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm"
        style={{ background: accent + "14", border: `1px solid ${accent}20` }}
      >
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight" style={{ color: "#0f172a", letterSpacing: "-0.2px" }}>
        {title}
      </span>
      <div className="section-accent-line" style={{ background: `linear-gradient(90deg, ${accent}25, transparent)` }} />
    </div>
  );
}

/* ─── Role colors ───────────────────────────────────────────── */
const ROLE_COLORS = ["#6366f1","#10b981","#f59e0b","#f43f5e","#0ea5e9","#8b5cf6","#06b6d4"];

/* ─── Main Dashboard ────────────────────────────────────────── */
function Dashboard() {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state?.reducer.dashbaord);
  const { leads }    = useSelector((state) => state?.reducer.dashbaord);
  const { employeeData, initialized } = useSelector((state) => state.reducer.login);
  const [eventData, setEventData] = useState();

  const fetchEvents = async () => {
    const res  = await fetch(`${base_URL}event/upcoming`);
    const data = await res.json();
    setEventData(data);
  };

  useEffect(() => { if (!initialized) dispatch(employeeDetails()); }, [dispatch, initialized]);
  useEffect(() => { dispatch(fetchDashboardUserData()); dispatch(fetchDashboardLeadData()); fetchEvents(); }, [dispatch]);

  const permissionArray = employeeData?.permissionArray || [];
  const isAdmin = employeeData?.role === "Admin";

  const totalEmp    = userData?.data?.totalEmployees || 0;
  const activeEmp   = userData?.data?.license?.activeUser || 0;
  const inactiveEmp = totalEmp - activeEmp;
  const activePct   = Math.round((activeEmp / (totalEmp || 1)) * 100);
  const monthlyEmps = userData?.data?.monthlyEmployees || [];
  const totalLeads  = leads?.data?.totalleads || 0;
  const monthLeads  = leads?.data?.monthlyleads || 0;
  const roleWise    = leads?.data?.roleWise || [];
  const maxLeads    = Math.max(...roleWise.map(l => l.leads), 1);

  const now      = new Date();
  const hour     = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr  = now.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const [tick, setTick] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTick(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = tick.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" });

  return (
    <CompanyLayout pageTitle="Dashboard">


      <div className="ent min-h-screen" style={{ background: "#f0f4f8" }}>

        {/* ══ HERO BANNER ══ */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0b1120 0%, #0f1f3de3 50%, #0b1627 100%)", padding: "32px 36px 64px" }}
        >
          <Orb color="#6366f1" size={260} top={-60} left={-40} blur={90} opacity={0.14} />
          <Orb color="#8b5cf6" size={200} top={20} left="45%" blur={80} opacity={0.1} />
          <Orb color="#0ea5e9" size={160} top={-20} left="78%" blur={70} opacity={0.08} />
          <div className="grid-overlay" />
          <div className="hero-curve" />

          {/* Top row */}
          <div className="relative flex items-start justify-between flex-wrap gap-4">
            {/* Greeting */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-[7px] h-[7px] rounded-full pulse-dot" style={{ background: "#10b981" }} />
                <span className="text-[11px] font-semibold uppercase tracking-[1.2px]" style={{ color: "rgba(148,163,184,0.65)" }}>
                  All systems operational
                </span>
              </div>
              <h1 className="m-0 font-bold" style={{ fontSize: 27, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.2 }}>
                {greeting}{employeeData?.name ? `, ${employeeData.name.split(" ")[0]}` : ""}<span
                  style={{
    display: "inline-block", // ❗ important
    animation: "wave 0.6s ease-in-out infinite"
  }}>👋</span>
              </h1>
              <p className="mt-2 text-[13px]" style={{ color: "rgba(148,163,184,0.55)" }}>{dateStr}</p>
            </div>

            {/* Clock + Events */}
            <div className="flex gap-3">
              {/* Live clock */}
              <div
                className="rounded-[13px] px-[18px] py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", maxHeight: "60px" }}
              >
                <div className="font-mono-dm font-semibold" style={{ fontSize: 22, color: "#fff", letterSpacing: "2px", lineHeight: 1 }}>{timeStr}</div>
                <div className="font-semibold mt-[3px]" style={{ fontSize: 6, color: "rgba(148,163,184,0.45)", letterSpacing: "4px" }}>INDIAN STANDARD TIME</div>
              </div>

              {/* Upcoming events */}
              <div
                className="flex flex-col gap-1 rounded-[13px] px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
              >
                <p className="text-base font-bold m-0" style={{ color: "#f2f3f5" }}>Upcoming Events</p>
                {eventData?.map((event) => {
                  const fmtStart = new Date(event?.startDate).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
                  const fmtEnd   = new Date(event?.endDate).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
                  const single   = event?.totaldays === 1;
                  return (
                    <div key={event._id}>
                      <div className="text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                        <Link to="/company/event">
                          <span style={{ color: "#f59e0b" }}>{event?.eventName}</span>
                        </Link>
                      </div>
                      {single ? (
                        <p className="m-0 text-[8px]" style={{ color: "rgba(148,163,184,0.55)" }}>
                          <span style={{ color: "#f59e0b" }}>{fmtStart}</span>
                        </p>
                      ) : (
                        <>
                          <p className="m-0 mt-2 text-[8px]" style={{ color: "rgba(148,163,184,0.55)" }}>Start: {fmtStart}</p>
                          <p className="m-0 mt-2 text-[8px]" style={{ color: "rgba(148,163,184,0.55)" }}>End: {fmtEnd}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* KPI strip */}
          {isAdmin && (
            <div className="relative flex flex-wrap gap-3 mt-7">
              {[
                { label: "Total Staff",  val: totalEmp,          color: "#818cf8" },
                { label: "Active Now",   val: activeEmp,         color: "#10b981" },
                { label: "This Month",   val: monthlyEmps.length,color: "#f59e0b" },
                { label: "Total Leads",  val: totalLeads,        color: "#f43f5e", hidden: employeeData?.role === "HR" },
              ].filter(k => !k.hidden).map((k, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-5 py-3 anim-kpi-${i}`}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(6px)" }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-1" style={{ color: "rgba(148,163,184,0.55)" }}>{k.label}</div>
                  <div className="font-mono-dm font-bold text-[22px]" style={{ color: k.color, letterSpacing: "-0.5px" }}>
                    <AnimatedNumber target={k.val} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══ PAGE BODY ══ */}
        <div className="px-8 pb-12 -mt-4">

          {/* ════ SECTION 1: EMPLOYEES ════ */}
          <SectionHeader icon="👥" title="Employee Overview" accent="#6366f1" />

          <div className="grid gap-4 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>

            {/* Dark hero — Total Employees */}
            <div className="dark-card rounded-2xl p-[26px] anim-up-2 relative overflow-hidden">
              <Orb color="#6366f1" size={180} top={-50} left={-30} blur={80} opacity={0.2} />
              <Orb color="#8b5cf6" size={100} top="50%" left="55%" blur={60} opacity={0.12} />
              <div className="relative flex justify-between items-center">
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>🏢</div>
                <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>Live</span>
              </div>
              <div className="relative mt-5">
                <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1.5" style={{ color: "rgba(148,163,184,0.65)" }}>Total Employees</div>
                {isAdmin
                  ? <div className="font-mono-dm font-bold text-white" style={{ fontSize: 48, lineHeight: 1, letterSpacing: "-2.5px" }}><AnimatedNumber target={totalEmp} /></div>
                  : <div className="font-mono-dm" style={{ fontSize: 28, color: "rgba(255,255,255,0.2)" }}>—</div>
                }
                {isAdmin && (
                  <div className="mt-5">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-[7px] h-[7px] rounded-full pulse-dot-sm" style={{ background: "#10b981" }} />
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Active</span>
                        <span className="font-mono-dm text-[11px] font-bold" style={{ color: "#10b981" }}>{activeEmp}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>Inactive</span>
                        <span className="font-mono-dm text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>{inactiveEmp}</span>
                      </div>
                    </div>
                    <Bar pct={activePct} color="linear-gradient(90deg, #10b981, #06b6d4)" h={5} />
                    <div className="text-[10px] text-right mt-1.5" style={{ color: "#15803d" }}>{activePct}% utilisation</div>
                  </div>
                )}
              </div>
            </div>

            {/* Light — Monthly change */}
            <div className="white-card rounded-2xl p-[26px] anim-up-3 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: "#10b98112", border: "1px solid #10b98120" }}>📈</div>
                <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>This Month</span>
              </div>
              <div className="mt-5">
                <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1.5" style={{ color: "#94a3b8" }}>Joined This Month</div>
                {isAdmin
                  ? <div className="font-mono-dm font-bold" style={{ fontSize: 48, color: "#0f172a", lineHeight: 1, letterSpacing: "-2px" }}><AnimatedNumber target={monthlyEmps.length} /></div>
                  : <div className="font-mono-dm" style={{ fontSize: 28, color: "#d1d5db" }}>—</div>
                }
                <div className="text-xs mt-2" style={{ color: "#94a3b8" }}>New hires compared to last month</div>
              </div>
            </div>

            {/* Light — Active licences */}
            <div className="white-card rounded-2xl p-[26px] anim-up-4 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: "#0ea5e912", border: "1px solid #0ea5e920" }}>✅</div>
                <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd" }}>{activePct}% rate</span>
              </div>
              <div className="mt-5">
                <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1.5" style={{ color: "#94a3b8" }}>Active Licences</div>
                {isAdmin
                  ? <div className="font-mono-dm font-bold" style={{ fontSize: 48, color: "#0f172a", lineHeight: 1, letterSpacing: "-2px" }}><AnimatedNumber target={activeEmp} /></div>
                  : <div className="font-mono-dm" style={{ fontSize: 28, color: "#d1d5db" }}>—</div>
                }
                <div className="text-xs mt-2" style={{ color: "#94a3b8" }}>Licensed &amp; active accounts</div>
              </div>
            </div>
          </div>

          {/* Recently Joined table */}
          {isAdmin && (
            <div className="white-card rounded-2xl mb-9 anim-up-6 overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-[18px] pb-4">
                <div>
                  <div className="text-sm font-bold" style={{ color: "#0f172a" }}>Recently Joined Employees</div>
                  <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>Latest new hires this month</div>
                </div>
                <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>This Month</span>
              </div>
              <div className="grad-divider" />

              {/* Table head */}
              <div className="grid gap-3 px-6 pt-3 pb-2" style={{ gridTemplateColumns: "44px 1fr 120px 90px" }}>
                {["No.", "Employee", "Status", "Profile"].map((h, i) => (
                  <div key={h} className="text-[10px] font-bold uppercase tracking-[0.8px] pb-2.5" style={{ color: "#94a3b8", textAlign: i === 3 ? "right" : "left" }}>{h}</div>
                ))}
              </div>

              <div className="px-3 pb-3">
                {monthlyEmps.slice(-5).length > 0
                  ? monthlyEmps.slice(-5).map((emp, idx) => (
                    <div key={idx} className="tr-hover grid gap-3 px-3 py-[11px] items-center" style={{ gridTemplateColumns: "44px 1fr 120px 90px" }}>
                      <div className="font-mono-dm text-xs font-medium" style={{ color: "#94a3b8" }}>{String(idx + 1).padStart(2, "0")}</div>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={emp.name} i={idx} size={34} />
                        <div>
                          <div className="text-[13px] font-semibold" style={{ color: "#0f172a", letterSpacing: "-0.1px" }}>{emp.name}</div>
                          <div className="text-[11px] mt-px" style={{ color: "#94a3b8" }}>New employee</div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>● Active</span>
                      </div>
                      <div className="text-right">
                        {(employeeData?.role === "Admin" || employeeData?.role === "HR") && (
                          <Link
                            to={`/company/employe/profile/${emp?._id}`}
                            className="text-[11px] font-bold px-3 py-[5px] rounded-[7px] no-underline whitespace-nowrap"
                            style={{ color: "#6366f1", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", transition: "all .15s" }}
                          >
                            View →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                  : <div className="py-6 text-center text-[13px]" style={{ color: "#94a3b8" }}>No recent joins this month</div>
                }
              </div>
            </div>
          )}

          {/* ════ SECTION 2: LEADS ════ */}
          {employeeData?.role !== "HR" && (
            <section>
              <SectionHeader icon="🎯" title="Leads Overview" accent="#f59e0b" />

              <div className="grid gap-4 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>

                {/* Dark hero — Total Leads */}
                <div className="dark-card rounded-2xl p-[26px] anim-up-2 relative overflow-hidden">
                  <Orb color="#f59e0b" size={180} top={-40} left={-30} blur={80} opacity={0.18} />
                  <Orb color="#f43f5e" size={120} top="40%" left="50%" blur={60} opacity={0.1} />
                  <div className="relative flex justify-between items-center">
                    <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.3)" }}>🎯</div>
                    <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}>All Time</span>
                  </div>
                  <div className="relative mt-5">
                    <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1.5" style={{ color: "rgba(148,163,184,0.65)" }}>Total Leads</div>
                    {isAdmin
                      ? <div className="font-mono-dm font-bold text-white" style={{ fontSize: 48, lineHeight: 1, letterSpacing: "-2.5px" }}><AnimatedNumber target={totalLeads} /></div>
                      : <div className="font-mono-dm" style={{ fontSize: 28, color: "rgba(255,255,255,0.2)" }}>—</div>
                    }
                    <div className="text-xs mt-2" style={{ color: "rgba(148,163,184,0.45)" }}>Across all acquisition channels</div>
                  </div>
                </div>

                {/* Light — Monthly Leads */}
                <div className="white-card rounded-2xl p-[26px] anim-up-3 overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: "#f43f5e12", border: "1px solid #f43f5e20" }}>📅</div>
                    <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3" }}>This Month</span>
                  </div>
                  <div className="mt-5">
                    <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1.5" style={{ color: "#94a3b8" }}>Monthly Leads</div>
                    {isAdmin
                      ? <div className="font-mono-dm font-bold" style={{ fontSize: 48, color: "#0f172a", lineHeight: 1, letterSpacing: "-2px" }}><AnimatedNumber target={monthLeads} /></div>
                      : <div className="font-mono-dm" style={{ fontSize: 28, color: "#d1d5db" }}>—</div>
                    }
                    <div className="text-xs mt-2" style={{ color: "#94a3b8" }}>New leads acquired this month</div>
                  </div>
                </div>

                {/* Light — By Department mini chart */}
                <div className="white-card rounded-2xl p-[26px] anim-up-4 overflow-hidden">
                  <div className="flex justify-between items-center mb-[18px]">
                    <div className="text-sm font-bold" style={{ color: "#0f172a" }}>By Department</div>
                    <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#fefce8", color: "#a16207", border: "1px solid #fde68a" }}>Role-wise</span>
                  </div>
                  {isAdmin && roleWise.length > 0
                    ? <div className="flex flex-col gap-2.5">
                        {roleWise.slice(0, 5).map((lead, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-[5px]">
                              <span className="text-xs font-medium" style={{ color: "#334155" }}>{lead.role}</span>
                              <span className="font-mono-dm text-xs font-bold" style={{ color: "#0f172a" }}>{lead.leads}</span>
                            </div>
                            <Bar pct={Math.round((lead.leads / maxLeads) * 100)} color={ROLE_COLORS[idx % ROLE_COLORS.length]} delay={idx * 80} />
                          </div>
                        ))}
                      </div>
                    : <div className="text-[13px] text-center py-4" style={{ color: "#94a3b8" }}>No leads data</div>
                  }
                </div>
              </div>

              {/* Full distribution table */}
              {isAdmin && roleWise.length > 0 && (
                <div className="white-card rounded-2xl mb-9 anim-up-5 overflow-hidden">
                  <div className="flex items-center justify-between px-6 pt-[18px] pb-4">
                    <div>
                      <div className="text-sm font-bold" style={{ color: "#0f172a" }}>Lead Distribution by Role</div>
                      <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>Complete breakdown across all departments</div>
                    </div>
                    <span className="inline-flex items-center text-[10px] font-bold tracking-[0.7px] uppercase px-2.5 py-[3px] rounded-full" style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" }}>{roleWise.length} Roles</span>
                  </div>
                  <div className="grad-divider" />

                  <div className="grid gap-3 px-6 pt-3 pb-2" style={{ gridTemplateColumns: "44px 1fr 180px 64px" }}>
                    {["No.", "Department", "Distribution", "Leads"].map((h, i) => (
                      <div key={h} className="text-[10px] font-bold uppercase tracking-[0.8px] pb-2.5" style={{ color: "#94a3b8", textAlign: i === 3 ? "right" : "left" }}>{h}</div>
                    ))}
                  </div>

                  <div className="px-3 pb-3">
                    {roleWise.slice(0, 10).map((lead, idx) => (
                      <div key={idx} className="tr-hover grid gap-3 px-3 py-[11px] items-center" style={{ gridTemplateColumns: "44px 1fr 180px 64px" }}>
                        <div className="font-mono-dm text-xs" style={{ color: "#94a3b8" }}>{String(idx + 1).padStart(2, "0")}</div>
                        <div className="text-[13px] font-semibold" style={{ color: "#0f172a" }}>{lead.role}</div>
                        <div><Bar pct={Math.round((lead.leads / maxLeads) * 100)} color={ROLE_COLORS[idx % ROLE_COLORS.length]} delay={idx * 50} /></div>
                        <div className="font-mono-dm text-[13px] font-bold text-right" style={{ color: "#0f172a" }}>{lead.leads}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ════ SECTION 3: IP CONFIG ════ */}
          {employeeData?.role === "Admin" && (
            <section>
              <SectionHeader icon="⚙️" title="IP Configuration" accent="#334155" />
              <div className="white-card rounded-2xl anim-up-1 overflow-visible">
                <div className="flex items-center gap-2.5 px-6 py-3.5 border-b" style={{ background: "#f8fafc", borderColor: "rgba(226,232,240,0.8)" }}>
                  <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#10b981" }} />
                  <span className="text-xs font-semibold tracking-[0.3px]" style={{ color: "#64748b" }}>Team Access Control Panel</span>
                </div>
                <div className="py-1">
                  <IPConfigure />
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </CompanyLayout>
  );
}

export default Dashboard;
