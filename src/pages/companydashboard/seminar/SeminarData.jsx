
import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import { base_URL } from "../../../utils/BaseUrl";
import { Eye, EyeOff } from "lucide-react"; // Lucide icons
import { Link, useNavigate } from "react-router-dom";
const seminar = ["Mumbai Seminar", "Delhi Seminar", "Patna Seminar", "Ahmedabad Seminar", "Lucknow Seminar", "Indore Seminar","Meeting","website","Trust Registration"];

function SeminarData() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate()
  // separate states for each column
  const [attendance, setAttendance] = useState()
  const [visibleRows, setVisibleRows] = useState({});

  const toggleField = (id, field) => {
    setVisibleRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  // State
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    contact: "",
    city: "",
    state: "",
    email: "",
    ngoName: "",
    year: currentYear,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Redux
  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );
  const isAdmin = employeeData?.role === "Admin";

  // Fetch employee details if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  // Allowed seminars
  const allowedSeminars = isAdmin
    ? seminar
    : seminar.filter((s) =>
      employeeData?.permissionArray?.includes(s)
    );

  useEffect(() => {
    if (allowedSeminars.length > 0) setSelectedSeminar(allowedSeminars[0]);
  }, [employeeData]);

  // Debounce filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  // Fetch data
  const fetchData = async () => {

    if (!selectedSeminar) return;

    setLoading(true);
    try {
      const res = await axios.get(
        // "https://api.ngoguru.info/api/id/seminarData",
        `${base_URL}id/seminarData`,
        {
          params: {
            status: "Confirmed",
            source: selectedSeminar,
            page,
            limit,
            ...debouncedFilters,
          },
        }
      );
      setData(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, selectedSeminar, debouncedFilters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  // const [waitAccess, setWaitAccess] = useState(true);
  const [seminarDate, setSeminarDate] = useState(""); // store chosen date

  const handleGenerateCard = (item) => console.log("Generate Card for:", item);

  const [waitAccess, setWaitAccess] = useState(true)
  const handleSeminarAccess = async () => {
    if (!seminarDate) {
      alert("Please select a seminar date first!");
      return;
    }
    try {
      setWaitAccess(false);
      // Convert YYYY-MM-DD → DD/MM/YY
      const [year, month, day] = seminarDate.split("-");
      const formattedDate = `${day}/${month}/${year}`; // e.g., "29/03/26"
      const response = await axios.post(
        `${base_URL}id`,
        null,
        {
          params: {
            status: "Confirmed",
            source: selectedSeminar,
            date: formattedDate,
          },
          responseType: "arraybuffer", // use this (more reliable)
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf", //  IMPORTANT
      });

      const url = window.URL.createObjectURL(blob);

      //  open to verify PDF
      window.open(url);

      //  download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "seminar-access-card.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setWaitAccess(true);
    } catch (error) {
      console.error(error);
      setWaitAccess(true);
    }
  };

  const [waitone, setWaitOne] = useState(true)
  const handleSeminarAccessOne = async (id) => {
    try {
      if (!id) return alert("User ID is required!");

      setWaitOne(false);

      // Make GET request to fetch PDF as arraybuffer
      const response = await axios.get(`${base_URL}id/one/${id}`, {
        params: {
          status: "Confirmed",
          source: selectedSeminar,
        },
        responseType: "arraybuffer", // IMPORTANT for PDF
      });

      // Convert binary response to Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create object URL
      const url = window.URL.createObjectURL(pdfBlob);

      // Optional: open PDF in new tab
      window.open(url);

      // Automatic download
      const link = document.createElement("a");
      link.href = url;
      link.download = `seminar-access-card-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Cleanup
      window.URL.revokeObjectURL(url);
      setWaitOne(true);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setWaitAccess(true);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const [waitblank, setWaitblank] = useState(true)
  const handleSeminarAccessblank = async () => {
    setWaitblank(false)
    try {
      const response = await axios.get(`${base_URL}id/blank/`, {
        responseType: "arraybuffer", // IMPORTANT for PDF
      })
      const blob = new Blob([response.data], {
        type: "application/pdf"
      })
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'seminar-access-card-blank.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      setWaitblank(true)
    } catch (error) {
      console.error("Error fetching PDF:", error);

      alert("Failed to download PDF. Please try again.");
    }
  }

  const handleAttendance = async (leadId, e) => {
    try {
      const status = e.target.value;

      setAttendance(status); // optional

      // console.log(status, leadId);

      const response = await axios.put(
        `${base_URL}lead/attendance/${leadId}`,
        { status },
        { withCredentials: true }
      );



      if (response.status === 200) {
        alert("Attendance Done !")
        const unpaidAmount =
          response?.data?.data?.OnConfirmed?.[0]?.unpaidAmount;

        if (unpaidAmount === 0 && status === "Present") {
          const params = new URLSearchParams({ id: leadId });

          navigate(`/company/re-treat/register?${params.toString()}`);
        } else if (unpaidAmount > 0 && status === "Present") {
          navigate(`/company/lead/update/${leadId}`);
        } else if (status === "Leave" || status === "Absent") {
          navigate(0);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isSeminar = selectedSeminar?.toLowerCase().includes("seminar");
  return (
    <CompanyLayout pageTitle={"Seminar"}>
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Seminar Data</h2>

          <div className="flex justify-center gap-6">




            <input
              type="date"
              value={seminarDate}
              onChange={(e) => setSeminarDate(e.target.value)}
              className="border rounded px-2 py-0.4 text-xs"
            />

            <div className="flex flex-col items-center gap-4">

              <button
                onClick={handleSeminarAccess}
                disabled={!seminarDate || !waitAccess}
                className={`px-4 py-1 text-xs rounded text-white ${waitAccess ? "bg-blue-500" : "bg-gray-400"}`}
              >
                {waitAccess
                  ? `Download Seminar Access Card${data?.length ? ` - ${data.length}` : ""}`
                  : "Please wait..."}
              </button>
            </div>

            <button onClick={handleSeminarAccessblank} className={`px-4  text-xs rounded text-white ${waitblank ? "bg-blue-500" : "bg-gray-400"}`}
            >Download Seminar Access Card - Blank</button>
          </div>
        </div>





        {/* TOP FILTERS INLINE */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            Show
            <select
              className="border rounded px-2 py-1"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
            entries
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} className="border px-2 py-0.5 rounded" />
            <input name="contact" placeholder="Contact" value={filters.contact} onChange={handleChange} className="border px-2 py-0.5 rounded" />
            <input name="city" placeholder="City" value={filters.city} onChange={handleChange} className="border px-2 py-0.5 rounded" />
            <input name="state" placeholder="State" value={filters.state} onChange={handleChange} className="border px-2 py-0.5 rounded" />
            <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} className="border px-2 py-0.5 rounded" />
            <input name="ngoName" placeholder="NGO Name" value={filters.ngoName} onChange={handleChange} className="border px-2 py-0.5 rounded" />

            {/* Year selector */}
            {isAdmin && (
              <select name="year" value={filters.year} onChange={handleChange} className="border px-2 py-0.5 rounded">
                {[2026, 2025, 2024, 2023].map((y) => <option key={y}>{y}</option>)}
              </select>
            )}
            {/* Admin seminar select */}
            {isAdmin && (
              <select value={selectedSeminar} onChange={(e) => { setSelectedSeminar(e.target.value); setPage(1); }} className="border px-2 py-0.5 rounded">
                {seminar.map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* PAGE INFO */}
        <div className="text-sm text-gray-500 mb-2">
          Page {page} of {totalPages}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="">
                <th className="border px-1 py-2">S.No.</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">Organization</th>
                <th className="border px-1 py-2">Service</th>
                <th className="border px-1 py-2">Total</th>
                <th className="border px-1 py-2 text-green-600">Paid</th>
                <th className="border px-1 py-2 text-red-600">Unpaid</th>
                <th className="border px-1 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="text-center py-4">Loading...</td></tr>
              ) : data.length > 0 ? (
                data.map((lead, idx) => {
                  const f = lead.fields || {};
                  const oc = lead.OnConfirmed?.[0] || {};
                  const rowId = lead._id; // ✅ unique id
                  const atten = lead.attendance


                  const showTotal = visibleRows[rowId]?.total ?? false;
                  const showPaid = visibleRows[rowId]?.paid ?? false;
                  return (
                    <tr key={lead._id} className="text-start hover:bg-red-200">
                      <td className="border text-green-600 px-1 py-2">{(page - 1) * limit + idx + 1}</td>
                      <td className="border px-3 py-2">{f.Name}</td>
                      <td className="border px-1 py-2">{f.Contact}</td>
                      <td className="border px-1 py-2">{f.ngoName}</td>
                      <td className="border  px-1 py-2">{oc.nameOfService || "-"}</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <span>{showTotal ? oc.totalAmount || 0 : "*****"}</span>
                          {/* <button onClick={() => toggleField(oc.id, "total")}> */}
                          <button onClick={() => toggleField(rowId, "total")}>
                            {showTotal ? (
                              <Eye className="w-5 h-5 text-black-600" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-black-600" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="border px-2 py-2 text-green-600 font-semibold">
                        <div className="flex items-center gap-2">
                          <span>{showPaid ? oc.paidAmount || 0 : "*****"}</span>
                          {/* <button onClick={() => toggleField(oc.id, "paid")}> */}
                          <button onClick={() => toggleField(rowId, "paid")}>
                            {showPaid ? (
                              <Eye className="w-5 h-5 text-black-600" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-black-600" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="border px-2 py-2 text-red-600 font-semibold">{oc.unpaidAmount || 0}</td>
                      {isSeminar?
                         <td className="border-t px-2 py-1 flex gap-2 justify-center">
                        {!atten.status ? (
                          <select
                            onChange={(e) => handleAttendance(rowId, e)}
                           className="text-gray-700 text-xs font-semibold border-b rounded px-1 py-0.5"
                          >
                            <option value=""  disabled selected>
                              Mark Attendance
                            </option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                          </select>
                        ) : (
                          // Status as colored button with conditional navigation
                          <button
                            className={`px-3 py-1 text-xs rounded font-semibold text-white ${atten.status === "Present"
                                ? "bg-green-600"
                                : atten.status === "Absent"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                              }`}
                            onClick={() => {
                              if (atten.status === "Present") {
                                navigate(`/company/re-treat/register?id=${lead._id}`);
                              }
                              // You can add other navigation logic here for Absent or Leave if needed
                            }}
                          >
                            {atten.status}
                          </button>
                        )}
                        <button
                          onClick={() => handleSeminarAccessOne(lead._id)}
                          className={`bg-green-500 border text-white px-1 py-1 rounded font-medium text-xs${waitone ? "bg-blue-500" : "bg-gray-400"}`}
                        >
                          Card
                        </button>


                        {oc.unpaidAmount === 0 &&
                          <button onClick={() => handleGenerateCard(lead)} className="bg-green-700 hover:bg-green-900 text-white px-1 py-1 rounded text-xs">Certificate</button>}
                        {/* {oc.unpaidAmount === 0 &&
                          <Link to={`/company/re-treat/register?id=${lead._id}`} className="bg-green-700 hover:bg-green-900 text-white px-1 py-1 rounded text-xs">Camp</Link>} */}
                      </td>:
                      <td className="border-t px-2 py-1 flex gap-2 justify-center">
                     <Link to={`/company/lead/update/${rowId}`}>Update</Link>
                        </td>
                        }
                  
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="9" className="text-center py-4">No Data Found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button disabled={page <= 1} onClick={() => setPage(p => Math.max(p - 1, 1))} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(p + 1, totalPages))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </CompanyLayout >
  );
}

export default SeminarData;