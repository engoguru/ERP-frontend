import React from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'

function SncCreate() {
    return (
        <>
            <CompanyLayout pageTitle={"SNC Register"}>
                <div className="w-full bg-gray-300  h-full">
                    <h1 className='text-xl font-bold pt-2 '>Register New SNC Member</h1>
                    <form className='w-full max-w-xl mx-auto  text-center mt-4  border-2 border-gray-400 rounded-lg bg-gray-200'>
                        <div className='flex flex-wrap -mx-3 mb-6 p-5'>
                            <div className='w-full md:w-1/1 px-3 pb-7 mb- md:mb-0 flex flex-col'>

                                <label className="text-gray-500 text-sm">Join Status</label>
                                <select className='w-full border border-gray-300 rounded px-3 py-2 text-sm '>
                                    <option value="" disabled>Select Join Status</option>
                                    <option value="joined">Joined</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className='w-full md:w-1/1 px-3 pb-7 flex flex-col'>
                                <label className='text-gray-500 text-sm'>Type of SNC  Member</label>
                                <select className='w-full border px-2 py-1.5 rounded-xl text-sm'>
                                    <option>Select SNC Type</option>
                                    <option value={"A"}>A-Type SNC Member</option>
                                    <option value={"B"}>B-Type SNC Member</option>
                                    <option value={"C"}>C-Type SNC Member</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/1 px-3 pb-7 flex flex-col">
                                <label className='text-sm text-gray-500'>Total Service Amount</label>
                                <input type="number" name="" id="" placeholder='e.g 45000' className='border px-2 py-1.5 rounded-xl' />
                            </div>
                            <div className="w-full md:w-1/1 px-3 pb-7 flex flex-col">
                                <label className='text-sm text-gray-500'>Paid Amount</label>
                                <input type="number" name="" id="" placeholder='e.g 15000' className='border px-2 py-1.5 rounded-xl' />
                            </div>
                            <div className="w-full md:w-1/1 px-3 pb-7 flex flex-col">
                                <label className='text-sm text-gray-500'>Unpaid Amount</label>
                                <input type="number" name="" id="" placeholder='e.g 30000' className='border px-2 py-1.5 rounded-xl' />
                            </div>
                            <div className="w-full md:w-1/1 px-3 pb-7 flex flex-col">
                                <label className='text-sm text-gray-500'>GST Amount</label>
                                <input type="number" name="" id="" placeholder='e.g 8100' className='border px-2 py-1.5 rounded-xl' />

                            </div>
                            <div className='w-full md:w-1/1 px-3 pb-7 flex flex-col'>
                                <label className='text-sm text-gray-500'>Upload Docs</label>
                                <input type="file" name="" className=' border px-2 py-1.5 rounded-xl text-sm' />
                            </div>
                            <div className="w-full">
                                <button className='border rounded-xl bg-green-600 text-white px-3 py-1 hover:bg-green-800'>Create Membership</button>
                            </div>
                        </div>
                    </form>
                </div>
            </CompanyLayout>
        </>
    )
}

export default SncCreate