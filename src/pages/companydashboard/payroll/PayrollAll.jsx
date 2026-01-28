import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyLayout from "../../../components/layout/companydashboard/CompanyLayout";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { employeeDetails } from "../../../redux/slice/employee/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { viewEmployees } from "../../../redux/slice/employee/employeeCreateSlice";

function PayrollAll() {
  const dispatch=useDispatch()
  const navigate = useNavigate();

  // Sample static payroll data
  const [payrolls] = useState([
    {
      id: 1,
      empCode: "EMP001",
      name: "John Doe",
      netSalary: 45000,
      ctc: 60000,
      grossSalary: 50000,
      abs: 2,
    },
    {
      id: 2,
      empCode: "EMP002",
      name: "Jane Smith",
      netSalary: 50000,
      ctc: 70000,
      grossSalary: 60000,
      abs: 0,
    },
    {
      id: 3,
      empCode: "EMP003",
      name: "Michael Johnson",
      netSalary: 40000,
      ctc: 55000,
      grossSalary: 48000,
      abs: 1,
    },
  ]);

   // Grab state
  const { employeeData, initialized } = useSelector(
    (state) => state.reducer.login
  );

    const { employeeList, loading, error } = useSelector(
      (state) => state.reducer.employee
    );
  
    useEffect(() => {
      dispatch(viewEmployees())
    }, []);
  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  const permissionArray = employeeData?.permissionArray
  const isAdmin = employeeData?.role === "Admin";
  const [search, setSearch] = useState("");

  // Filtered data
  const filteredPayrolls = employeeList.filter(
    (p) =>
      p.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );
console.log(employeeList,"pp")
  return (
    <CompanyLayout pageTitle={"Payroll Details"}>
      <div className="mx-auto max-w-6xl p-6">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Payrolls</h2>
          <button
            onClick={() => navigate("/company/payroll-form")}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600  text-sm font-medium text-white hover:bg-blue-700"
          >
            {/* <Plus size={16} /> */}
            {/* Add Payroll */}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 w-full md:w-1/3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by employee code or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-left text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3">Emp Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Net Salary</th>
                <th className="px-4 py-3">CTC</th>
                <th className="px-4 py-3">Gross Salary</th>
                <th className="px-4 py-3">Effective From</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayrolls.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-center text-sm text-gray-400">
                    No payroll data found
                  </td>
                </tr>
              ) : (
                filteredPayrolls?.map((pay) => (
                  <tr key={pay.id} className="border-t text-sm hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{pay?.employeeCode}</td>
                    <td className="px-4 py-3">{pay?.name}</td>
                    <td className="px-4 py-3">{pay?.salaryStructure?.netSalary}</td>
                    <td className="px-4 py-3">{pay?.salaryStructure?.ctc}</td>
                    <td className="px-4 py-3">{pay?.salaryStructure?.grossSalary
}</td>
                    <td className="px-4 py-3">{new Date( pay?.salaryStructure?.effectiveFrom).toISOString().split("T")[0]

}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {isAdmin||permissionArray.includes("payView")?[    <button className="text-blue-600 hover:text-blue-700">
                            <Link to={`/company/payroll/history/${pay._id}`}>
                          <Eye size={16} />
                          </Link>
                        </button>]:[]}
                    
                            {isAdmin||permissionArray.includes("payEdit")?[ <button className="text-green-600 hover:text-green-700">
                          <Edit size={16} />
                        </button>]:[]}
                       
                            {isAdmin||permissionArray.includes("payDelete")?[<button className="text-red-600 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>]:[]}
                        
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default PayrollAll;
