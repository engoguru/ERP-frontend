import React from "react";
import { CreditCard } from "lucide-react"; // Bank icon replaced with CreditCard

function PayrollProfile({ salaryStructure, bankDetail }) {
    return (
        <div className="space-y-6">
            {/* ===== Bank Details ===== */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4 w-full">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <CreditCard size={20} />
                    Bank Details
                </h2>

                {bankDetail && bankDetail.length > 0 ? (
                    <div className="grid gap-6">
                        {bankDetail.map((bank, index) => (
                            <BankCard key={index} bank={bank} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No bank details found.</p>
                )}
            </div>

            {/* ===== Payroll Details ===== */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <CreditCard size={20} />
                    Payroll Details
                </h2>

                {salaryStructure ? (

 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow hover:shadow-md transition flex gap-4">
    
    {/* Icon */}
    <div className="text-emerald-600 mt-1">
     
    </div>

    {/* Content */}
    <div className="flex-1 space-y-2 text-sm">


      <Row className="" label="CTC" value={salaryStructure?.ctc} />
      <Row label="Gross Salary" value={salaryStructure?.grossSalary} />
      <Row label="Net Salary" value={salaryStructure?.netSalary} />
      <Row label="Provident Fund" value={salaryStructure?.pf} />
      <Row label="HRA" value={salaryStructure?.hra} />
       <Row label="Other Allowance" value={salaryStructure?.otherAllowance} />
        <Row label="Professional Tax" value={salaryStructure?.professionalTax} />
        <Row label="ESI Code" value={salaryStructure?.esiCode} />
        <Row label="PF Code" value={salaryStructure?.pfCode} />
          </div>
  </div>
        //   <div className="grid md:grid-cols-3 gap-6">
        //     <StatCard title="CTC" value={salaryStructure?.ctc} icon={<CreditCard size={18} />} />
        //     <StatCard title="Gross Salary" value={salaryStructure?.grossSalary} icon={<CreditCard size={18} />} />
        //     <StatCard title="Net Salary" value={salaryStructure?.netSalary} icon={<CreditCard size={18} />} />
        //     <StatCard title="PF" value={salaryStructure?.pf} icon={<CreditCard size={18} />} />
        //     <StatCard title="HRA" value={salaryStructure?.hra} icon={<CreditCard size={18} />} />
        //     <StatCard title="Other Allowance" value={salaryStructure?.otherAllowance} icon={<CreditCard size={18} />} />
        //     <StatCard title="Professional Tax" value={salaryStructure?.professionalTax} icon={<CreditCard size={18} />} />
        //   </div>
                ) : (
                    <p className="text-gray-500">No payroll data found.</p>
                )}
            </div>
        </div>
    );
}

const StatCard = ({ title, value, icon }) => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-3">
        {icon && <div className="text-emerald-600">{icon}</div>}
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-emerald-600">{value ?? 0}</p>
        </div>
    </div>
);

const BankCard = ({ bank }) => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl shadow hover:shadow-md transition flex gap-4">

        {/* Icon */}
        <div className="text-emerald-600 mt-1">

        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 text-sm">

            <Row className="" label="Bank Name" value={bank.bankName} />
            <Row label="IFSC Code" value={bank.bankIfscCode} />
            <Row label="Branch Name" value={bank.branchName} />
            <Row label="Account Number" value={bank.accountNumber} />
            <Row label="Account Type" value={bank.accountType} />

        </div>
    </div>
);

/* Reusable Row */
const Row = ({ label, value }) => (
    <div className="flex justify-between gap-4 border border-gray-300 p-2 rounded-lg">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-800 text-right">{value || "—"}</span>
    </div>
);


export default PayrollProfile;
