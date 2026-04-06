import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import {
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CreditCard,
  Wallet,
  AlertCircle,
  Activity,
  Plus
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCampOne, updateCamp } from "../../../redux/slice/campslice";
import { useParams } from "react-router-dom";

// ── Floating Field ─────────────────────────────
function Field({ icon: Icon, value, label, type = "text", onChange, name, children }) {
  return (
    <div className="relative w-full group">
      <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition">
        <Icon size={16} />
      </div>

      <input
        type={type}
        value={value || ""}
        name={name}
        onChange={onChange}
        placeholder=" "
        className="peer w-full pl-10 pr-3 pt-5 pb-2 text-sm rounded-xl border border-slate-300 bg-white/70 backdrop-blur-md
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      />

      {children}

      <label className="absolute left-10 top-2 text-xs text-slate-400 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm 
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">
        {label}
      </label>
    </div>
  );
}

function UpdateRetreat() {
  const dispatch = useDispatch();
  const { id } = useParams();
const[wait,setWait]=useState(false)
  const { oneCamp } = useSelector((state) => state.reducer.camp);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    source: "",
    status: "Pending",
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    service: "Retreat Camp",
  });

  const [paidPercentage, setPaidPercentage] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [action, setAction] = useState("Pending");
  const [documents, setDocuments] = useState([]);
  const [newDocs, setNewDocs] = useState([]);

  useEffect(() => {
    dispatch(getCampOne(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (oneCamp?.data) {
      setFormData({
        name: oneCamp.data.name || "",
        email: oneCamp.data.email || "",
        contact: oneCamp.data.contact || "",
        source: oneCamp.data.source || "",
        status: oneCamp.data.status || "Pending",
        totalAmount: oneCamp.data.totalAmount || 0,
        paidAmount: oneCamp.data.paidAmount || 0,
        unpaidAmount:
          (oneCamp.data.totalAmount || 0) -
          (oneCamp.data.paidAmount || 0),
        service: oneCamp.data.service || "",
      });
      setPaidPercentage(
        oneCamp.data.totalAmount
          ? Math.round(
              (oneCamp.data.paidAmount * 100) / oneCamp.data.totalAmount
            )
          : 0
      );
      setFeedback(oneCamp.data.feedback || []);
      setDocuments(oneCamp?.data.docs || []);
    }
  }, [oneCamp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      updated.unpaidAmount =
        Number(updated.totalAmount || 0) - Number(updated.paidAmount || 0);
      return updated;
    });

    if (name === "totalAmount" || name === "paidAmount") {
      const total = name === "totalAmount" ? Number(value) : Number(formData.totalAmount);
      const paid = name === "paidAmount" ? Number(value) : Number(formData.paidAmount);
      setPaidPercentage(total > 0 ? Math.round((paid * 100) / total) : 0);
    }
  };

  const handleAddFeedback = () => {
    if (!newFeedback) return;
    setFeedback((prev) => [
      ...prev,
      { message: newFeedback, action, date: new Date() },
    ]);
    setNewFeedback("");
    setAction("Pending");
  };

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      _id: Math.random().toString(36).substr(2, 9),
    }));
    setNewDocs((prev) => [...prev, ...previews]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
setWait(true)

    // Prepare form data 
    const updatedData = {
      ...formData,
      feedback,                  // include feedback array
      // combine existing and newly added docs
    };
         if (newDocs.length > 0) {
      // Append new docs
      updatedData.docs.push(...newDocs);
    }

// console.log(updatedData,id)
    // Dispatch the update action
   // Dispatch the thunk
    await dispatch(updateCamp({ id, finalData: updatedData })).unwrap();

    // Clear new docs after successful update
    setNewDocs([]);

    alert("Updated Successfully");
    setWait(false)
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update. Please try again.");
  }
};

  const inputCls =
    "w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 bg-white/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition";

  const getFileName = (publicId) => publicId?.split("/").pop() || "Document";

  return (
    <CompanyLayout pageTitle="Update Retreat">
      <div className="p-6 space-y-6">

        {/* ── RETREAT DETAILS ── */}
        <div className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-xl shadow-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Details</h2>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
              {formData.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field icon={User} label="Name" value={formData.name} name="name" onChange={handleChange}/>
            <Field icon={Mail} label="Email" value={formData.email} name="email" onChange={handleChange}/>
            <Field icon={Phone} label="Contact" value={formData.contact} name="contact" onChange={handleChange}/>
            <Field icon={Globe} label="Source" value={formData.source} name="source" onChange={handleChange}/>
            <Field icon={Briefcase} label="Service" value={formData.service} name="service" onChange={handleChange}/>
            <Field icon={Activity} label="Status" value={formData.status} name="status" onChange={handleChange}/>
            <Field icon={CreditCard} label="Total Amount" type="number" value={formData.totalAmount} name="totalAmount" onChange={handleChange}/>
            <Field icon={Wallet} label="Paid Amount" type="number" value={formData.paidAmount} name="paidAmount" onChange={handleChange}/>
          </div>

          {/* Unpaid + Docs + Progress */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1 relative">
                <Field icon={AlertCircle} label="Unpaid Amount" value={formData.unpaidAmount} readOnly/>
              </div>

              {/* Documents preview beside unpaid */}
              <div className="flex flex-wrap gap-2">
                {[...documents, ...newDocs].map((doc) => (
                  <div key={doc._id} className="w-20 h-20 border rounded-lg overflow-hidden cursor-pointer">
                    <img src={doc.url} alt={getFileName(doc.publicId)} className="w-full h-full object-cover" onClick={() => window.open(doc.url, '_blank')}/>
                  </div>
                ))}

                <label className="w-20 h-20 flex items-center justify-center border rounded-lg cursor-pointer text-indigo-500 hover:bg-indigo-50">
                  <Plus size={24} />
                  <input type="file" multiple className="hidden" onChange={handleDocUpload}/>
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-600">{paidPercentage}% Paid</span>
                <span className="text-rose-500">₹{formData.unpaidAmount} Due</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all"
                  style={{ width: `${paidPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 hover:bg-slate-100 transition">Cancel</button>
            <button onClick={handleSubmit} className="px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">{wait===true?<>Processing...</>:<>Update</>}</button>
          </div>
        </div>

        {/* ── FEEDBACK ── */}
        <div className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-xl shadow-xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-slate-800">Feedback History</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input value={newFeedback} onChange={(e)=>setNewFeedback(e.target.value)} placeholder="Write feedback..." className={`${inputCls} flex-1`} onKeyDown={(e)=>e.key==='Enter'&&handleAddFeedback()}/>
            <select value={action} onChange={(e)=>setAction(e.target.value)} className="text-sm border border-slate-300 rounded-xl px-4 py-2.5">
              <option>Pending</option>
              <option>Processing</option>
              <option>Complete</option>
            </select>
            <button onClick={handleAddFeedback} className="px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">Add</button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-300">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
                <tr>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-center">Action</th>
                  <th className="p-3 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedback.length===0?<tr><td colSpan={3} className="py-12 text-center text-slate-400">No feedback yet</td></tr>:feedback.map((fb,i)=>(
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-medium">{fb.message}</td>
                    <td className="p-3 text-center"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{fb.action}</span></td>
                    <td className="p-3 text-center text-xs text-slate-500">{new Date(fb.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <button onClick={handleSubmit} className="px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">{wait===true?<>Processing...</>:<>Update Feedback</>}</button>
        </div>

      </div>
    </CompanyLayout>
  );
}

export default UpdateRetreat;