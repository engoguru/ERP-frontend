import React from 'react'
import CompanyLayout from '../../../components/layout/companydashboard/CompanyLayout'
import { Link } from 'react-router-dom';
function SncMemberAddOnService() {
    const type = "Amit-SNC-A"; // dynamic value

    let colorClass = "";

    if (type.endsWith("A")) {
        colorClass = "text-green-600";
    } else if (type.endsWith("B")) {
        colorClass = "text-blue-600";
    } else if (type.endsWith("C")) {
        colorClass = "text-red-600";
    }
    return (
        <>
            <CompanyLayout pageTitle={"SNC Add-On"}>
                <div className="w-full   border ">
                    <h1 className={`text-xl font-bold pt-2 `}>
                        Add-On Service for <span className={`${colorClass}`}>{type}</span>
                    </h1>

                    <Link className=' flex justify-end  ' to={"/company/addon/service/create"}>
                        <span className='bg-green-700 border  px-3 py-1 my-4 mx-4 text-white rounded-lg hover:bg-green-900'>
                            Add New Services
                        </span>
                    </Link>

                </div>
                <div className="w-full bg-gray-200 p-2">
                    {/* <h1>Services</h1> */}
                    <div className="w-full max-w-10xl  grid  ">
                        <table>
                            <thead className='border-b'>
                                <th>S.No.</th>
                                <th>Service Name</th>
                                <th>Total amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Other Expanses</th>
                                <th>GST</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr className='border-b '>
                                    <td className='px-1 py-2'>1</td>
                                    <td className='px-1 py-2'>Service 1</td>
                                    <td className='px-1 py-2'>45000</td>
                                    <td className='px-1 py-2'>15000</td>
                                    <td className='px-1 py-2'>30000</td>
                                    <td className='px-1 py-2'>1000</td>
                                    <td className='px-1 py-2'>8100</td>
                                    <td className='gap-2'>
                                        <button className='px-4 py-1 bg-green-700 text-white text-sm rounded-lg mx-3'>Edit</button>
                                        <button className='px-4 py-1 bg-red-700 text-white text-sm rounded-lg '>View</button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </CompanyLayout>
        </>
    )
}

export default SncMemberAddOnService