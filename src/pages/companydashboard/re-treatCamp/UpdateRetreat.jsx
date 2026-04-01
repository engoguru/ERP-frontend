// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'

// function UpdateRetreat() {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     source: '',
//     service: '',
//     totalAmount: '',
//     paidAmount: '',
//     unpaidAmount: 0,
//     status: '',
//   })

//   const [feedback, setFeedback] = useState([])
//   const [newFeedback, setNewFeedback] = useState('')
//   const [action, setAction] = useState('Pending')

//   useEffect(() => {
//     const mock = {
//       name: 'Yoga Retreat',
//       email: 'test@mail.com',
//       contact: '9876543210',
//       source: 'Instagram',
//       service: 'Wellness',
//       totalAmount: 1000,
//       paidAmount: 400,
//       status: 'Processing',
//       feedback: [
//         { message: 'Client contacted', action: 'Processing', date: new Date() }
//       ]
//     }

//     setFormData({
//       ...mock,
//       unpaidAmount: mock.totalAmount - mock.paidAmount
//     })

//     setFeedback(mock.feedback)
//   }, [id])

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value }
//       updated.unpaidAmount =
//         Number(updated.totalAmount || 0) - Number(updated.paidAmount || 0)
//       return updated
//     })
//   }

//   const handleAddFeedback = () => {
//     if (!newFeedback) return

//     setFeedback((prev) => [
//       ...prev,
//       {
//         message: newFeedback,
//         action,
//         date: new Date(),
//       },
//     ])

//     setNewFeedback('')
//     setAction('Pending')
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const finalData = {
//       ...formData,
//       feedback,
//     }

//     console.log(finalData)
//     alert('Updated Successfully')

//     navigate('/company/re-treat')
//   }

//   return (
//     <CompanyLayout pageTitle="Update Retreat">
//       <div className="p-6 space-y-6">

//         {/* 🔹 FORM TABLE */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <h2 className="text-lg font-semibold p-4 border-b">
//             Retreat Details
//           </h2>

//           <table className="w-full text-sm">
//             <tbody>
//               {[
//                 ['Name', 'name'],
//                 ['Email', 'email'],
//                 ['Contact', 'contact'],
//                 ['Source', 'source'],
//                 ['Service', 'service'],
//               ].map(([label, key]) => (
//                 <tr key={key} className="border-b">
//                   <td className="p-3 font-medium bg-gray-50 w-1/3">{label}</td>
//                   <td className="p-3">
//                     <input
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       className="w-full border px-3 py-2 rounded"
//                     />
//                   </td>
//                 </tr>
//               ))}

//               {/* Amounts */}
//               <tr className="border-b">
//                 <td className="p-3 font-medium bg-gray-50">Total Amount</td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     name="totalAmount"
//                     value={formData.totalAmount}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </td>
//               </tr>

//               <tr className="border-b">
//                 <td className="p-3 font-medium bg-gray-50">Paid Amount</td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     name="paidAmount"
//                     value={formData.paidAmount}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </td>
//               </tr>

//               <tr className="border-b">
//                 <td className="p-3 font-medium bg-gray-50">Unpaid Amount</td>
//                 <td className="p-3">
//                   <input
//                     value={formData.unpaidAmount}
//                     readOnly
//                     className="w-full border px-3 py-2 rounded bg-gray-100"
//                   />
//                 </td>
//               </tr>

//               {/* Status */}
//               <tr>
//                 <td className="p-3 font-medium bg-gray-50">Status</td>
//                 <td className="p-3">
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded"
//                   >
//                     <option value="">Select</option>
//                     <option>Pending</option>
//                     <option>Processing</option>
//                     <option>Complete</option>
//                   </select>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="p-4 flex justify-end gap-3">
//             <button
//               onClick={() => navigate('/company/re-treat')}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Update
//             </button>
//           </div>
//         </div>

//         {/* 🔹 FEEDBACK TABLE */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <h2 className="text-lg font-semibold p-4 border-b">
//             Feedback History
//           </h2>

//           {/* Add */}
//           <div className="p-4 flex gap-2">
//             <input
//               value={newFeedback}
//               onChange={(e) => setNewFeedback(e.target.value)}
//               placeholder="Enter feedback"
//               className="flex-1 border px-3 py-2 rounded"
//             />

//             <select
//               value={action}
//               onChange={(e) => setAction(e.target.value)}
//               className="border px-2 rounded"
//             >
//               <option>Pending</option>
//               <option>Processing</option>
//               <option>Complete</option>
//             </select>

//             <button
//               onClick={handleAddFeedback}
//               className="bg-green-500 text-white px-4 rounded"
//             >
//               Add
//             </button>
//           </div>

//           {/* Table */}
//           <table className="w-full text-sm border-t">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Message</th>
//                 <th className="p-3">Action</th>
//                 <th className="p-3">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {feedback.map((fb, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="p-3">{fb.message}</td>
//                   <td className="p-3 text-center">{fb.action}</td>
//                   <td className="p-3 text-center">
//                     {new Date(fb.date).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </CompanyLayout>
//   )
// }

// export default UpdateRetreat


import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import {
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquarePlus,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CreditCard,
  Wallet,
  AlertCircle,
  Activity,
} from 'lucide-react'

// ── Status Badge ──────────────────────────────────────────────────────────────

const statusStyles = {
  Pending:    'bg-amber-100 text-amber-800 border border-amber-300',
  Processing: 'bg-blue-100 text-blue-800 border border-blue-300',
  Complete:   'bg-emerald-100 text-emerald-800 border border-emerald-300',
}

const statusIcons = {
  Pending:    <Clock size={11} />,
  Processing: <TrendingUp size={11} />,
  Complete:   <CheckCircle2 size={11} />,
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusStyles[status] || statusStyles['Pending']}`}>
      {statusIcons[status] || statusIcons['Pending']}
      {status}
    </span>
  )
}

// ── Field Row ─────────────────────────────────────────────────────────────────

function FieldRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-stretch border-b border-slate-200 last:border-0">
      <div className="w-48 shrink-0 flex items-center gap-2.5 px-5 py-4 bg-slate-100 border-r border-slate-200">
        <Icon size={14} className="text-slate-500 shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span>
      </div>
      <div className="flex-1 px-4 py-3.5 flex items-center">
        {children}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

function UpdateRetreat() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    source: '',
    service: '',
    totalAmount: '',
    paidAmount: '',
    unpaidAmount: 0,
    status: '',
  })

  const [feedback, setFeedback] = useState([])
  const [newFeedback, setNewFeedback] = useState('')
  const [action, setAction] = useState('Pending')

  useEffect(() => {
    const mock = {
      name: 'Yoga Retreat',
      email: 'test@mail.com',
      contact: '9876543210',
      source: 'Instagram',
      service: 'Wellness',
      totalAmount: 1000,
      paidAmount: 400,
      status: 'Processing',
      feedback: [
        { message: 'Client contacted', action: 'Processing', date: new Date() }
      ]
    }
    setFormData({ ...mock, unpaidAmount: mock.totalAmount - mock.paidAmount })
    setFeedback(mock.feedback)
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      updated.unpaidAmount = Number(updated.totalAmount || 0) - Number(updated.paidAmount || 0)
      return updated
    })
  }

  const handleAddFeedback = () => {
    if (!newFeedback) return
    setFeedback((prev) => [...prev, { message: newFeedback, action, date: new Date() }])
    setNewFeedback('')
    setAction('Pending')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalData = { ...formData, feedback }
    console.log(finalData)
    alert('Updated Successfully')
    navigate('/company/re-treat')
  }

  const inputCls = 'w-full text-sm rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none transition-all hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
  const readonlyCls = 'w-full text-sm rounded-lg border-2 border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-700 font-semibold outline-none cursor-default'
  const selectCls = 'w-full text-sm rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-medium outline-none transition-all hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer'

  const paidPct = formData.totalAmount > 0
    ? Math.min(100, Math.round((Number(formData.paidAmount) / Number(formData.totalAmount)) * 100))
    : 0

  return (
    <CompanyLayout pageTitle="Update Retreat">
      <div className="p-6 space-y-6">

        {/* ── FORM ── */}
        <div className="bg-white shadow-sm ring-1 ring-slate-300 rounded-xl overflow-hidden">

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b-2 border-slate-200">
            <h2 className="text-base font-bold text-slate-800">Retreat Details</h2>
            <StatusBadge status={formData.status || 'Pending'} />
          </div>

          {/* Fields */}
          <div className="divide-y-0">
            <FieldRow icon={User} label="Name">
              <input name="name" value={formData.name} onChange={handleChange} className={inputCls} placeholder="Enter name" />
            </FieldRow>
            <FieldRow icon={Mail} label="Email">
              <input name="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="Enter email" type="email" />
            </FieldRow>
            <FieldRow icon={Phone} label="Contact">
              <input name="contact" value={formData.contact} onChange={handleChange} className={inputCls} placeholder="Enter contact" />
            </FieldRow>
            <FieldRow icon={Globe} label="Source">
              <input name="source" value={formData.source} onChange={handleChange} className={inputCls} placeholder="e.g. Instagram" />
            </FieldRow>
            <FieldRow icon={Briefcase} label="Service">
              <input name="service" value={formData.service} onChange={handleChange} className={inputCls} placeholder="e.g. Wellness" />
            </FieldRow>

            <FieldRow icon={CreditCard} label="Total Amount">
              <div className="relative w-full">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm select-none">₹</span>
                <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className={inputCls + ' pl-8'} placeholder="0" />
              </div>
            </FieldRow>

            <FieldRow icon={Wallet} label="Paid Amount">
              <div className="relative w-full">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm select-none">₹</span>
                <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleChange} className={inputCls + ' pl-8'} placeholder="0" />
              </div>
            </FieldRow>

            <FieldRow icon={AlertCircle} label="Unpaid Amount">
              <div className="w-full space-y-2">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm select-none">₹</span>
                  <input value={formData.unpaidAmount} readOnly className={readonlyCls + ' pl-8'} />
                </div>
                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-700">{paidPct}% paid</span>
                    <span className="text-rose-600">₹{Number(formData.unpaidAmount).toLocaleString()} due</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${paidPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </FieldRow>

            <FieldRow icon={Activity} label="Status">
              <select name="status" value={formData.status} onChange={handleChange} className={selectCls}>
                <option value="">Select status</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Complete</option>
              </select>
            </FieldRow>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t-2 border-slate-200 bg-slate-50 flex justify-end gap-3">
            <button
              onClick={() => navigate('/company/re-treat')}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow shadow-indigo-300"
            >
              Update
            </button>
          </div>
        </div>

        {/* ── FEEDBACK ── */}
        <div className="bg-white shadow-sm ring-1 ring-slate-300 rounded-xl overflow-hidden">

          {/* Card header */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b-2 border-slate-200">
            <MessageSquarePlus size={16} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">Feedback History</h2>
            <span className="ml-auto bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {feedback.length}
            </span>
          </div>

          {/* Add feedback */}
          <div className="p-4 bg-slate-50 border-b-2 border-slate-200 flex gap-3">
            <input
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddFeedback()}
              placeholder="Write a feedback note…"
              className={inputCls + ' flex-1'}
            />
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="text-sm rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-medium outline-none transition-all hover:border-slate-300 focus:border-indigo-500 cursor-pointer"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Complete</option>
            </select>
            <button
              onClick={handleAddFeedback}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow shadow-indigo-300 whitespace-nowrap"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Message</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-600">Action</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedback.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-sm font-medium text-slate-400">
                    No feedback yet
                  </td>
                </tr>
              ) : (
                feedback.map((fb, i) => (
                  <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 text-slate-800 font-medium">{fb.message}</td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusBadge status={fb.action} />
                    </td>
                    <td className="px-4 py-3.5 text-center text-xs font-semibold text-slate-500">
                      {new Date(fb.date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </CompanyLayout>
  )
}

export default UpdateRetreat