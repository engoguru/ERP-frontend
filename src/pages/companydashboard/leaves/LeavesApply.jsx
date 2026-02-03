import React, { useState } from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { toDate } from 'date-fns'

function LeavesApply() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
   fromDate:"",
    toDate:"",  
    reason:"",
    totalDay:"",
    leaveType:""
  })

  const [leaves, setLeaves] = useState([])

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLeaves([
      ...leaves,
      { id: Date.now(), ...formData, status: 'Pending' }
    ])
    setFormData({ fromDate: '', toDate: '', reason: '' })
    setShowModal(false)
  }

  return (
    <CompanyLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Apply Leave</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-left">Approved By</th>
                <th className="p-3 text-left">Total Day</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-t">
                  <td className="p-3">{leave.fromDate}</td>
                  <td className="p-3">{leave.toDate}</td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${leave.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Apply Leave</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <select  >
                  <option></option>
                   <option></option>
                    <option></option>
                     <option></option>
                </select>
                <textarea
                  name="reason"
                  placeholder="Reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  )
}

export default LeavesApply
