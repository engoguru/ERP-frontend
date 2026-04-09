// import React, { useEffect, useState } from 'react'
// import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
// import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
// import { fetchOneLead } from '../../../redux/slice/leadSlice'

// function RegisterCamp() {
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const query = new URLSearchParams(location.search)
//     const id = query.get("id")
//     // console.log(id)
//     const { leadDetail, loading } = useSelector(state => state.reducer.lead);
//     useEffect(() => {
//         if (id) dispatch(fetchOneLead(id));
//         //  fetchOneLead
//     }, [id])

// const sourcefilter=leadDetail?.source.toLowerCase()
//  const city = sourcefilter.split("seminar")[0].trim();
//    const treatCamp = `${city}-Re-treat-camp`;


//     const [form, setForm] = useState({
//         name: leadDetail?.fields.Name || "",
//         email: leadDetail?.fields.Email || "",
//         contact: leadDetail?.fields.Contact || "",
//         source:treatCamp|| "",
//         status: "Pending"||"",
//         paidAmount: 0,
//         unpaidAmount: 0,
//         totalAmount: 0
//     })
//     //   


//     console.log(form, "pp ")
//     return (
//         <CompanyLayout pageTitle={"Re-Treat Camp"}>
//             <div>RegisterCamp</div>
//             <form>
//                 <input type="text" value={form.name} name="name" placeholder='Type Name' required onChange={(e) => setForm(e.target.value)} />
//             </form>
//         </CompanyLayout>
//     )
// }

// export default RegisterCamp




import React, { useEffect, useState } from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchOneLead } from '../../../redux/slice/leadSlice'
import { registerCamp } from '../../../redux/slice/campslice'

function RegisterCamp() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate=useNavigate()
    const query = new URLSearchParams(location.search)
    const id = query.get("id")
    const [waitforSubmit, setWaitforSubmit] = useState(true)
    const { leadDetail, loading } = useSelector(state => state.reducer.lead)

    const isManual = !id

    const [form, setForm] = useState({
        leadId: "",
        name: "",
        email: "",
        contact: "",
        source: "",
        status: "Pending",
        paidAmount: 0,
        unpaidAmount: 0,
        totalAmount: 0,
        service: "Retreat Camp"
    })

    const [customService, setCustomService] = useState("")

    // Fetch lead
    useEffect(() => {
        if (id) dispatch(fetchOneLead(id))
    }, [id])

    // Prefill
    useEffect(() => {
        if (leadDetail && id) {
            const sourceText = leadDetail?.source?.toLowerCase() || "";
            let treatCamp = "";
            if (sourceText.includes("seminar")) {
                const city = sourceText.replace("seminar", "").trim();
                treatCamp = `${city}-re-treat-camp`;
            }

            setForm(prev => ({
                ...prev,          // keep any existing fields
                leadId: id,       // attach the lead id
                name: leadDetail?.fields?.Name || "",
                email: leadDetail?.fields?.Email || "",
                contact: leadDetail?.fields?.Contact || "",
                source: treatCamp,
                status: "Pending",
                paidAmount: 0,
                unpaidAmount: 0,
                totalAmount: 0,
                service: "Retreat Camp"
            }));
        }
    }, [leadDetail, id]);

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target

        // Reset custom service if user changes option
        if (name === "service" && value !== "Others") {
            setCustomService("")
        }

        setForm(prev => ({ ...prev, [name]: value }))
    }
    // handle file
    const handleFile = (e) => {
        const { name, files } = e.target;

        setForm((pre) => ({
            ...pre, [name]: Array.from(files)
        }))
    }
    // Auto unpaid calculation
    useEffect(() => {
        setForm(prev => ({
            ...prev,
            unpaidAmount: prev.totalAmount - prev.paidAmount
        }))
    }, [form.totalAmount, form.paidAmount])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setWaitforSubmit(false)
            // Determine the service value
            const finalService = form.service === "Others" ? customService : form.service;

            if (form.service === "Others" && !customService.trim()) {
                alert("Please enter custom service");
                return;
            }


            // Create FormData
            const formData = new FormData();

            // Add all text fields
            Object.keys(form).forEach((key) => {
                if (key !== "docs") {
                    formData.append(key, key === "service" ? finalService : form[key]);
                }
            });

            // Add files
            if (form.docs) {
                if (Array.isArray(form.docs)) {
                    form.docs.forEach((file) => formData.append("docs", file));
                } else {
                    formData.append("docs", form.docs); // single file
                }
            }

            // Optional: log FormData entries
            for (let pair of formData.entries()) console.log(pair[0], pair[1]);

            // Dispatch thunk
            const res = await dispatch(registerCamp(formData));

            if (res.payload?.success) {
               alert("Registered Successfully !")
               setForm()
                setCustomService("")
                navigate("/company/re-treat")
                // Reset form or redirect if needed
            } else {
                alert(res.payload?.message)
                console.error("Registration failed:", res.payload?.message);
            }
            setWaitforSubmit(true)
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return (
        <CompanyLayout pageTitle={"Services Camp"}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-semibold text-gray-800">
                            Register For Services
                        </h2>

                        {isManual ? (
                            <p className="text-yellow-600 text-sm mt-1">
                                Manual Entry Mode (No Lead Selected)
                            </p>
                        ) : (
                            <p className="text-green-600 text-sm mt-1">
                                Lead Data Loaded
                            </p>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <p className="text-blue-500 mb-4">Loading lead data...</p>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Source</label>
                            <input
                                type="text"
                                name="source"
                                value={form.source}
                                onChange={handleChange}
                                placeholder="e.g. delhi-re-treat-camp"
                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Total Amount</label>
                            <input
                                type="number"
                                name="totalAmount"
                                value={form.totalAmount}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Paid Amount</label>
                            <input
                                type="number"
                                name="paidAmount"
                                value={form.paidAmount}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Unpaid Amount</label>
                            <input
                                type="number"
                                value={form.unpaidAmount}
                                readOnly
                                className="mt-1 w-full p-3 border bg-gray-100 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Payment Proof Docs</label>
                            <input
                                type="file"
                                name="docs"
                                className="mt-1 w-full p-3 border bg-gray-100 rounded-lg"
                                multiple
                                accept=".pdf,image/*"
                                required
                                onChange={handleFile}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Service</label>
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border rounded-lg"
                            >
                                <option>Retreat Camp</option>
                                <option>Review Meeting</option>
                                <option>Advance Classes</option>
                                <option>Others</option>
                            </select>
                        </div>

                        {/* Dynamic Input */}
                        {form.service === "Others" && (
                            <div className="md:col-span-2">
                                <label className="text-sm text-gray-600">Enter Service</label>
                                <input
                                    type="text"
                                    value={customService}
                                    onChange={(e) => setCustomService(e.target.value)}
                                    placeholder="Enter custom service"
                                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:opacity-90"
                            >
                                {waitforSubmit === false ? <>Submitting</> : <> Submit Registration</>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </CompanyLayout>
    )
}
export default RegisterCamp