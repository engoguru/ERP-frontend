import React from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { Link } from 'react-router-dom'

function AllSnc() {
    return (
        <>
            <CompanyLayout pageTitle={"SNC"}>
                <h1 className='text-xl font-bold text-center pt-5 pb-8'>All Super NGO Club Members</h1>
                <div className="w-full max-w-10xl overflow-hidden mx-auto grid gap-1 p-4 text-center">

                    <table>
                        <thead className="border-b-2 border-t-2 rounded-lg border-gray-300">
                            <tr className='mx-2 py-2 text-left'>
                                <th className='px-2 py-2'>S.No</th>
                                <th className='px-2 py-2'>Name</th>
                                <th className='px-2 py-2'>Email</th>
                                <th className='px-2 py-2'>contact</th>
                                <th className='px-2 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-left border-b border-gray-300 hover:bg-gray-300'>
                            <td className='px-2 py-2'>1</td>
                            <td className='px-2 py-2'>Amit</td>
                            <td className='px-2 py-2'>amit@gmail.com</td>
                            <td className='px-2 py-2'>6307131152</td>
                            <td className='px-2 py-2 flex flex-row gap-2'>
                                <Link to={`/company/createsnc?id=${1}`} className='px-4 py-1 bg-green-700 text-white text-sm rounded-lg '>Club+</Link>
                                     <Link to={`/company/addon/service/${1}`} className='px-4 py-1 bg-green-700 text-white text-sm rounded-lg '>Add-On</Link>
                                <Link to={`/company/updatesnc/${1}`} className='px-4 py-1 bg-blue-600 text-white rounded-lg text-sm'>Edit</Link>

                            </td>
                        </tbody>

                    </table>
                </div>
            </CompanyLayout>
        </>
    )
}

export default AllSnc