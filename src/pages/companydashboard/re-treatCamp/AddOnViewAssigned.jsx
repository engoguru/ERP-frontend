import React, { useEffect, useState } from "react";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";
import { Link } from "react-router-dom";

function AddOnViewAssigned() {
    const [assignedData, setAssignedData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${base_URL}service/services/assigned`,
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            setAssignedData(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching assigned services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleView = (item, assignedUser) => {
        console.log("View", item, assignedUser);
    };

    const handleEdit = (item, assignedUser) => {
        console.log("Edit", item, assignedUser);
    };

    return (
        <CompanyLayout>
            <div className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-5 border-b">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Assigned Services
                        </h2>
                    </div>



                    

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-6 py-3">#</th>

                                    <th className="px-6 py-3">Client</th>
                                    <th className="px-6 py-3">Employee</th>
                                    <th className="px-6 py-3">Service</th>
                                    <th className="px-6 py-3">Assigned Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : assignedData.length > 0 ? (
                                    assignedData.map((service, index) => (
                                        <tr
                                            key={service._id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">{index + 1}</td>
                                              <td className="px-6 py-4">{service?.reTreat_Id?.name}</td>

                                            <td className="px-6 py-4 font-medium">
                                                {service?.assigned?.[0]?.userName || (
                                                    <span className="text-red-500">Not Assigned</span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                {service?.serviceName}
                                            </td>

                                            <td className="px-6 py-4">
                                                {service?.assigned?.[0]?.date
                                                    ? new Date(
                                                        service.assigned[0].date
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${service?.assigned?.[0]?.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {service?.assigned?.[0]?.status || "Pending"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                         to={`/company/service/addon/edit/${service._id}`}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        to={`/company/service/addon/edit/${service._id}`}
                                                        className="px-3 py-1 bg-amber-500 text-white rounded-md hover:bg-amber-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No assigned services found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
}

export default AddOnViewAssigned;