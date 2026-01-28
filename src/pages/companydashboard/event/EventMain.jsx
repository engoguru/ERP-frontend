import React, { useState, useEffect } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Plus, CalendarDays, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, viewEvent } from "../../../redux/slice/employee/eventSlice";
import { toast } from "react-toastify";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";

function EventMain() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const [form, setForm] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    totaldays: 0,
    description: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { eventAll, loading, error } = useSelector((state) => state.reducer.event);
  console.log(eventAll)
   // Grab state
  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );
  // ---------------- CALCULATE TOTAL DAYS ----------------
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) return 0;
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const days = calculateDays(form.startDate, form.endDate);
    setForm((prev) => ({ ...prev, totaldays: days }));
  }, [form.startDate, form.endDate]);

  // ---------------- FETCH EVENTS ----------------
  const fetchEvents = () => {
    dispatch(viewEvent({ page, limit }));
  };

    useEffect(() => {
      if (!initialized) {
        dispatch(employeeDetails());
      }
    }, [dispatch, initialized]);
  
    const permissionArray = employeeData?.permissionArray
    const isAdmin = employeeData?.role === "Admin";
  useEffect(() => {
    fetchEvents();
  }, [page, limit]);

  // ---------------- FILTER EVENTS BY MONTH/YEAR ----------------
  const filteredEvents = eventAll?.filter((event) => {
    const d = new Date(event.startDate);
    const m = month ? d.getMonth() + 1 === Number(month) : true;
    const y = year ? d.getFullYear() === Number(year) : true;
    return m && y;
  }) || [];

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!form.eventName || !form.startDate || !form.endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.totaldays <= 0) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      await dispatch(createEvent(form)).unwrap();
      toast.success("Event created successfully");
      setOpenModal(false);
      setForm({
        eventName: "",
        startDate: "",
        endDate: "",
        totaldays: 0,
        description: "",
      });
      fetchEvents(); // refresh events
    } catch (err) {
      toast.error(err || "Failed to create event");
    }
  };

  // ---------------- PAGINATION HANDLERS ----------------
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (eventAll && eventAll.data && page < eventAll.data.totalPages) setPage(page + 1);
  };

  return (
    <CompanyLayout pageTitle="Company Events">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="text-emerald-600" />
            Company Events
          </h2>
             {(isAdmin || permissionArray.includes("etCreate")) && (
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            <Plus size={16} />
            Create Event
          </button>
             )}
        </div>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Year"
          />
        </div>

        {/* EVENTS TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Event Name</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3 text-center">Total Days</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">Loading...</td>
                </tr>
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">No events found</td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event._id || event.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{event.eventName}</td>
                    <td className="px-4 py-3">{new Date(event.startDate).toISOString().split("T")[0]}</td>
                    <td className="px-4 py-3">{new Date(event.endDate).toISOString().split("T")[0]}</td>
                    <td className="px-4 py-3 text-center">{event.totaldays}</td>
                    <td className="px-4 py-3">{event.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {eventAll?.data?.totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              <ChevronLeft /> Prev
            </button>
            <span className="px-4 py-2 border rounded-lg">
              Page {page} of {eventAll.data.totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === eventAll.data.totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next <ChevronRight />
            </button>
          </div>
        )}

        {/* CREATE EVENT MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create Event</h3>
                <button onClick={() => setOpenModal(false)}><X /></button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <input
                  name="eventName"
                  value={form.eventName}
                  onChange={handleChange}
                  placeholder="Event Name *"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2"
                  />
                </div>
                <input
                  value={`Total Days: ${form.totaldays}`}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}

export default EventMain;
