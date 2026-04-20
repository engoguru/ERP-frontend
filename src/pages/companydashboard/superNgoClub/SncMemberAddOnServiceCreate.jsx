import React from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'

function SncMemberAddOnServiceCreate() {
    return (
        <>
            <CompanyLayout>
                <div className="">
                    <h1 className='text-xl font-bold pt-2'>Add New Service</h1>
                    <div className="flex justify-center">
                        <form action="w-full max-w-10xl">
                            <div className="flex max-w-10xl flex-col  gap-4 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label className='text-sm text-gray-500'>Service Name</label>
                                    <input type="text" name="" id="" placeholder='e.g Service 1' className='border px-2 py-1.5 rounded-xl' />
                                </div>
                                </div>
                        </form>
                    </div>
                </div>
            </CompanyLayout>
        </>

    )
}

export default SncMemberAddOnServiceCreate