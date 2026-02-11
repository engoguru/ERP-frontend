import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { viewEmployeesProfile } from "../../redux/slice/employee/employeeCreateSlice";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Users,
  Home,
  FileText,
  CreditCard,
  File,
  ClipboardCheck,
} from "lucide-react";
import PayrollProfile from "./payroll/PayrollProfile";
import AttendanceProfile from "./attendance/AttendanceProfile";
import LeavesProfile from "./leaves/LeavesProfile";

function EmployeeProfile() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { employeeProfile: employee, loading, error } = useSelector(
    (state) => state.reducer.employee
  );

  useEffect(() => {
    dispatch(viewEmployeesProfile(employeeId));
  }, [dispatch, employeeId]);


  console.log(employee)
  const tabs = ["Profile", "Leaves", "Attendance", "Payroll"];

  if (loading)
    return (
      <CompanyLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-gray-500 font-semibold">
            Loading employee profile...
          </div>
        </div>
      </CompanyLayout>
    );

  if (error)
    return (
      <CompanyLayout>
        <p className="text-center py-20 text-red-500 font-semibold">{error}</p>
      </CompanyLayout>
    );

  if (!employee)
    return (
      <CompanyLayout>
        <p className="text-center py-20 text-gray-500 font-semibold">
          No employee data found
        </p>
      </CompanyLayout>
    );

  return (
    <CompanyLayout pageTitle={"Employee Detail"}>
      <div className="max-w-7xl mx-auto px-6 py-4 space-y-5">

        {/* ===== HEADER ===== */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-center gap-6">

          {/* Left: Profile pic + info */}
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-white shadow-md" onClick={() => setIsModalOpen(true)}>
              <img
                src={employee.profilePic?.url || "/default-avatar.png"}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${employee.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${employee.status === "ACTIVE"
                      ? "bg-green-500"
                      : "bg-red-500"
                      }`}
                  ></span>
                  {employee.status}
                </span>
              </div>
              <p className="opacity-90">{employee.role} • {employee.department}</p>
              <p className="mt-1 text-sm flex items-center gap-2">
                <FileText size={18} /> Qualification: <span className="font-medium">{employee.qualification}</span>
              </p>
              <p className="mt-1 text-sm">
                Father: <span className="font-medium">{employee.fatherName}</span> • Mother: <span className="font-medium">{employee.motherName}</span>
              </p>
            </div>
          </div>

          {/* Right: Employee Code */}
          <p className="absolute right-6  -mt-36 text-sm opacity-90 font-semibold bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md">
            Employee Code: {employee.employeeCode}
          </p>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap gap-3 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === idx
                ? "bg-emerald-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-emerald-500 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="bg-white rounded-xl shadow border p-6 space-y-6">

          {/* PROFILE TAB */}
          {activeTab === 0 && (
            <div className="grid md:grid-cols-3 gap-6 ">
              {/* Basic Info */}
              <CardSection title="Basic Info">
                <InfoItem icon={<Mail size={18} className="text-[hsl(168,76%,42%)]" />} label="Email" value={employee.employeeEmail?.email} />
                <InfoItem icon={<Phone size={18} className="text-[hsl(168,76%,42%)]" />} label="Contact" value={employee.employeeContact?.contact} />
                <InfoItem icon={<Building size={18} className="text-[hsl(168,76%,42%)]" />} label="Department" value={employee.department} />



                <InfoItem icon={<Users size={18} className="text-[hsl(168,76%,42%)]" />} label="Reporting Manager" value={employee.reportingManager ? (<Link
                  to={`/company/employe/profile/${employee.reportingManager._id}`}
                  className="inline-block px-3 py-1 mt-1 bg-white border border-[hsl(168,76%,42%)] rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-sm transition"
                >
                  {employee.reportingManager.name} - {employee.reportingManager.employeeCode}
                </Link>
                ) : "N/A"} />




                <InfoItem icon={<Calendar size={18} className="text-[hsl(168,76%,42%)]" />} label="Joining Date" value={new Date(employee.dateOfJoining).toLocaleDateString()} />
                <InfoItem icon={<FileText size={18} className="text-[hsl(168,76%,42%)]" />} label="Qualification" value={employee.qualification} />
                <InfoItem icon={<FileText size={18} className="text-[hsl(168,76%,42%)]" />} label="Blood Group" value={employee.bloodGroup} />
                <InfoItem icon={<FileText size={18} className="text-[hsl(168,76%,42%)]" />} label="DOB" value={new Date(employee.dob).toLocaleDateString()} />

              </CardSection>

              {/* Address */}
              <CardSection title="Other Detail">
                <InfoItem icon={<User size={18} className="text-[hsl(168,76%,42%)]" />} label="Father Name" value={employee.fatherName} />
                <InfoItem icon={<User size={18} className="text-[hsl(168,76%,42%)]" />} label="Mother Name" value={employee.motherName} />
                <InfoItem icon={<Home size={18} className="text-[hsl(168,76%,42%)]" />} label="Permanent Address" value={employee.permanentAddress} />
                <InfoItem icon={<Home size={18} className="text-[hsl(168,76%,42%)]" />} label="Local Address" value={employee.localAddress} />
                <InfoItem icon={<Home size={18} className="text-[hsl(168,76%,42%)]" />} label="Emg. Contact Person Name" value={employee.localAddress} />
                <InfoItem icon={<Home size={18} className="text-[hsl(168,76%,42%)]" />} label="Emg. contact" value={employee.emgContact.contact} />
                <InfoItem icon={<Home size={18} className="text-[hsl(168,76%,42%)]" />} label="Relation-Ship" value={employee.emgContact.relation} />
              </CardSection>

              {/* Documents */}
              <CardSection title="Documents">
                {/* Aadhar (multiple images) */}
                {/* {employee?.aadhar?.map((aadharDoc, index) => (
                  <img
                    key={`aadhar-${index}`}
                    src={aadharDoc.url}
                    alt={`Aadhar ${index + 1}`}
                    className="w-full h-30 object-cover rounded-md shadow-sm mb-2"
                    onClick={() => setIsModalOpen(true)}
                  />
                ))} */}
                {employee?.aadhar?.map((aadharDoc, index) => {
                  const isPdf = aadharDoc.public_id.toLowerCase().endsWith('.pdf');
                  console.log(isPdf, "h")

                  return isPdf ? (
                    <object
                      data={`${aadharDoc.url}#toolbar=0`}
                      type="application/pdf"
                      className="w-full h-60 rounded-md mb-2"
                    >
                      <p>
                        PDF cannot be displayed. <a href={aadharDoc.url} target="_blank" rel="noopener noreferrer">Download PDF</a>
                      </p>
                    </object>
                  ) : (
                    <img
                      key={`aadhar-${index}`}
                      src={aadharDoc.url}
                      alt={`Aadhar ${index + 1}`}
                      className="w-full h-30 object-cover rounded-md shadow-sm mb-2"
                      onClick={() => setIsModalOpen(true)}
                    />
                  );
                })}


                {/* PAN (multiple images) */}
                {/* {employee?.pan?.map((panDoc, index) => (
                  <img
                    key={`pan-${index}`}
                    src={panDoc.url}
                    alt={`PAN ${index + 1}`}
                    className="w-full h-30 object-cover rounded-md shadow-sm mb-2"
                    onClick={() => setIsModalOpen(true)}
                  />
                ))} */}
                {employee?.pan?.map((panDoc, index) => {
                  const isPdf = panDoc?.public_id?.toLowerCase().endsWith('.pdf');
                  console.log(isPdf, "h");

                  return isPdf ? (
                    <object
                      key={`pan-${index}`}
                      data={`${panDoc.url}#toolbar=0`}
                      type="application/pdf"
                      className="w-full h-60 rounded-md mb-2 "
                    >
                      <p>
                        PDF cannot be displayed.{" "}
                        <a href={panDoc.url} target="_blank" rel="noopener noreferrer">
                          Download PDF
                        </a>
                      </p>
                    </object>
                  ) : (
                    <img
                      key={`pan-${index}`}
                      src={panDoc.url}
                      alt={`PAN ${index + 1}`}
                      className="w-full h-30 object-cover rounded-md shadow-sm mb-2"
                      onClick={() => setIsModalOpen(true)}
                    />
                  );
                })}

              </CardSection>

            </div>
          )}

          {/* LEAVES TAB */}
          {activeTab === 1 && <LeavesProfile balanceLeave={employee.balanceLeave} />}

          {/* ATTENDANCE TAB */}
          {activeTab === 2 && <AttendanceProfile shiftDetail={employee.shiftDetail} />}

          {/* PAYROLL TAB */}

          {activeTab === 3 &&
            <PayrollProfile salaryStructure={employee.salaryStructure} bankDetail={employee?.bankDetail} />
          }

        </div>
      </div>


      {/* {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.85)] flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-3/5 p-1"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <img
              src={employee.profilePic?.url || "/default-avatar.png"}
              alt={employee.name}
              className="w-4/5 h-[80%] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )} */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={employee.profilePic?.url || "/default-avatar.png"}
              alt={employee.name}
              className="w-[80%] max-h-[90vh] object-contain rounded-lg shadow-lg"
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white bg-black/60 rounded-full px-3 py-1 text-xl hover:bg-black transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}


    </CompanyLayout>
  );
}

/* ===== REUSABLE COMPONENTS ===== */
const CardSection = ({ title, children }) => (
  <div className="bg-gray-200 p-6 rounded-xl shadow-sm space-y-3">
    <h3 className="font-semibold text-lg border-b border-gray-400 pb-2 mb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon && <div className="text-gray-400 ">{icon}</div>}
    <div className="mt-4">
      <p className="text-sm text-start text-gray-500">{label}</p>
      <p className="font-normal text-gray-800">{value || "—"}</p>
    </div>
  </div>
);


export default EmployeeProfile;
