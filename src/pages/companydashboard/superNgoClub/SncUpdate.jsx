import React, { useEffect, useState } from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { useDispatch, useSelector } from 'react-redux'
import { sncUpdate, sncViewOne } from '../../../redux/slice/snc/sncregisterSlice'
import { useParams } from 'react-router-dom'

function SncUpdate() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [existingDocs, setExistingDocs] = useState([])
  const [newDocs, setNewDocs] = useState([])
  const [form, setForm] = useState({
    joinStatus: "",
    sncType: "",
    totalServiceAmount: "",
    paidAmount: "",
    unpaidAmount: "",
    gstAmount: "",
    docs: []
  })

  const { sncViewOneDetail } = useSelector((state) => state.reducer.snc)

  // Fetch data
  useEffect(() => {
    dispatch(sncViewOne(id))
  }, [dispatch, id])

  // Populate form when data arrives
  useEffect(() => {
    if (sncViewOneDetail?.data) {
      setForm({
        joinStatus: sncViewOneDetail.data.joinStatus || "",
        sncType: sncViewOneDetail.data.sncType || "",
        totalServiceAmount: sncViewOneDetail.data.totalServiceAmount || "",
        paidAmount: sncViewOneDetail.data.paidAmount || "",
        unpaidAmount: sncViewOneDetail.data.unpaidAmount || "",
        gstAmount: sncViewOneDetail.data.gstAmount || "",

      })
      setExistingDocs(sncViewOneDetail.data.docs || [])
    }
  }, [sncViewOneDetail])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    // setForm((prev) => ({

    //   ...prev,
    //   [name]: value
    // }))
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value
      }

      const total = Number(updated.totalServiceAmount) || 0
      const paid = Number(updated.paidAmount) || 0
      updated.unpaidAmount = total - paid || ""
      return updated
    })
  }

  const handleFileChange = (e) => {
    const { files } = e.target
    setNewDocs((prev) => [...prev, ...Array.from(files)])
  }
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = new FormData()

    // append form fields
    Object.keys(form).forEach((key) => {
      payload.append(key, form[key])
    })

    // append only new docs
    if (newDocs.length > 0) {
      newDocs.forEach((file) => {
        payload.append("docs", file)
      })
    }

    try {
      await dispatch(
        sncUpdate({ id, data: payload })
      ).unwrap()

      alert("Update successful")
      setNewDocs()
    } catch (err) {
      console.error("Update failed:", err)
    }
  }
  console.log(newDocs)
  return (
    <CompanyLayout pageTitle={"SNC-Update"}>
      
      <h1 className='text-xl font-bold text-center my-2'>
        Update Super NGO Club Member
      </h1>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl mx-auto text-center mt-4 border-2 border-gray-400 rounded-lg bg-gray-200'
      >
        <div className='flex flex-wrap -mx-3 mb-6 p-5'>

          {/* Join Status */}
          <div className='w-full px-3 pb-7 flex flex-col'>
            <label className="text-gray-500 text-sm font-semibold text-start py-2">Join Status</label>
            <select
              name="joinStatus"
              value={form.joinStatus}
              onChange={handleChange}
              className='border px-5 py-1.5 text-sm rounded-xl'
            >
              <option value="" disabled>Select Join Status</option>
              <option value="joined">Joined</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* SNC Type */}
          <div className='w-full px-3 pb-4 flex flex-col'>
            <label className='text-gray-500 text-sm'>Type of SNC Member</label>
            <select
              name="sncType"
              value={form.sncType}
              onChange={handleChange}
              className='border px-5 py-1.5 rounded-xl text-sm'
            >
              <option value="">Select SNC Type</option>
              <option value="A">A-Type</option>
              <option value="B">B-Type</option>
              <option value="C">C-Type</option>
            </select>
          </div>

          {/* Inputs */}
          {["totalServiceAmount", "paidAmount", "unpaidAmount", "gstAmount"].map((field) => (
            <div key={field} className="w-full px-3 pb-7 flex flex-col">
              <label className='text-sm text-gray-500'>{field}</label>
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className='border px-5 py-1.5 rounded-xl'
              />
            </div>
          ))}

          {/* Docs */}
          <div className='w-full px-3 pb-7 flex flex-col'>
            <label className='text-sm text-gray-500'>Uploaded Docs</label>
            <div className="flex flex-row">


              {existingDocs?.map((doc, index) => (
                <img
                  key={index}
                  src={doc.url}
                  alt={`doc-${index}`}
                  className="w-25 h-27 object-cover mb-2 "
                />
              ))}
            </div>
            {/* New Docs Preview */}
            {newDocs.length > 0 && <label className='text-sm text-gray-500'>Preview Docs</label>}
            <div className="flex flex-row">
              {newDocs?.map((file, index) => (
                <img
                  key={`new-${index}`}
                  src={URL.createObjectURL(file)}
                  className="w-25 h-27 object-cover mb-2"
                />
              ))}
            </div>
            <input type="file" className='border px-2 py-1.5 rounded-xl text-sm' onChange={handleFileChange} />
          </div>

          <div className="w-full">
            <button className='bg-green-600 text-white px-3 py-1 rounded-xl'>
              Update Membership
            </button>
          </div>

        </div>
      </form>
    </CompanyLayout>
  )
}

export default SncUpdate