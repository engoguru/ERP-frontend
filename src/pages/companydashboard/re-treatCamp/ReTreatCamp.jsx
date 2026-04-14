// import React from 'react'
// import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
// import { Edit, Trash2, Eye } from 'lucide-react' // React Lucide icons
// import { Link } from 'react-router-dom'

// const data = [
//   { id: 1, name: 'Yoga Retreat', location: 'Bali', date: '2026-04-15' },
//   { id: 2, name: 'Mindfulness Camp', location: 'Thailand', date: '2026-05-10' },
//   { id: 3, name: 'Adventure Re-Treat', location: 'Nepal', date: '2026-06-01' },
// ]

// function ReTreatCamp() {
//   return (
//     <CompanyLayout pageTitle="Re-Treat">
//       <div className="p-6 bg-white shadow rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Re-Treat Camps</h2>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Location
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((camp) => (
//               <tr key={camp.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{camp.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{camp.location}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{camp.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
//                   <button className="text-blue-500 hover:text-blue-700">
//                     <Eye size={18} />
//                   </button>
//                   <Link
//                     to={`/company/re-treat/update/${1}`}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     <Edit size={18} />
//                   </Link>
//                   <button className="text-red-500 hover:text-red-700">
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </CompanyLayout>
//   )
// }

// export default ReTreatCamp




import React, { useEffect, useState } from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { Edit, Trash2, Eye, MapPin, Calendar, Search, Plus, FileDiff, BadgeIndianRupee, NotebookPen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCamp } from '../../../redux/slice/campslice'


function ReTreatCamp() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [seminar, setSeminar] = useState()

  // const filtered = data.filter(
  //   (c) =>
  //     c.name.toLowerCase().includes(search.toLowerCase()) ||
  //     c.location.toLowerCase().includes(search.toLowerCase())
  // )
  const { AllCamp } = useSelector((state) => state.reducer.camp)
  useEffect(() => {
    dispatch(getAllCamp())
  }, [])
  // console.log(seminar, "ppopop")
  return (
    <CompanyLayout pageTitle="Services">
      <div className="p-6 space-y-5">

        {/* ── Header bar ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All List</h2>
            <p className="text-xs text-slate-500 mt-0.5">{ } camps registered</p>
          </div>

          <div className="flex items-center gap-3">
            <select name="" id="" onChange={(e) => setSeminar(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="Mumbai Seminar">Mumbai Seminar</option>
              <option value="Delhi Seminar">Delhi Seminar</option>
              <option value="Indore Seminar">Indore Seminar</option>
              <option value="Lucknow Seminar">Lucknow Seminar</option>
              <option value="Patna Seminar">Patna Seminar</option>
            </select>
            {seminar &&
              <select name="" id="">
                <option value="Retreat Camp">Retreat Camp</option>
                <option value="Review Meeting">Review Meeting</option>
                <option value="Advance Classes">Advance Classes</option>

              </select>
            }
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search camps…"
                className="pl-8 pr-4 py-2.5 text-sm rounded-lg border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 w-52"
              />
            </div>

            {/* Add button */}
            {/* <Link
              to="/company/re-treat/create"
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow shadow-indigo-300 whitespace-nowrap"
            >
              <Plus size={14} /> Add Camp
            </Link> */}
          </div>
        </div>

        {/* ── Table card ── */}
        <div className="bg-white shadow-sm ring-1 ring-slate-300 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-200 ">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600">S.No</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Email</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Service</th>
                <th className="px-5 py-3.5 text-start text-xs font-bold uppercase tracking-wider text-slate-600">Due Amt.</th>
                <th className="px-5 py-3.5 text-start text-xs font-bold uppercase tracking-wider text-slate-600">Created</th>
                <th className="px-5 py-3.5 text-start text-xs font-bold uppercase tracking-wider text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                AllCamp?.data?.map((camp, i) => (
                  <tr
                    key={camp._id}
                    className="border-b text-start border-slate-200 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    {/* Index */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    </td>

                    {/* Name */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800">{camp.name}</span>
                    </td>

                    {/* email*/}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                        <MapPin size={13} className="text-slate-400" />
                        {camp.email}
                      </span>
                    </td>
                    {/* service*/}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                        <MapPin size={13} className="text-slate-400" />
                        {camp.service}
                      </span>
                    </td>
                    {/* unpaidAmount*/}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                        < BadgeIndianRupee size={13} className="text-slate-400" />
                        {camp.unpaidAmount}
                      </span>
                    </td>


                    {/* Date */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                        <Calendar size={13} className="text-slate-400" />
                        {new Date(camp.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">

                        <Link
                          to={`/company/service/addon/${camp._id}`}
                          title="Add-On New Services"
                          className="p-2 rounded-lg text-green-300  hover:bg-emerald-200 hover:text-emerald-600 border border-transparent hover:border-emerald-200 transition-all"
                        >< NotebookPen size={15} /></Link>
                        <Link
                          to={`/company/re-treat/update/${camp._id}`}
                          title="Edit"
                          className="p-2 rounded-lg text-green-300  hover:bg-emerald-200 hover:text-emerald-600 border border-transparent hover:border-emerald-200 transition-all"
                        >
                          <Edit size={15} />
                        </Link>

                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          {/* Footer */}
          {/* {filtered.length > 0 && (
            <div className="px-5 py-3 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500">
                Showing {filtered.length} of {data.length} camps
              </p>
            </div>
          )} */}
        </div>

      </div>
    </CompanyLayout>
  )
}

export default ReTreatCamp