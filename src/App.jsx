import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------------- Client Pages ----------------


// ---------------- Company Dashboard ----------------
import Register from './components/common/Register';
import Dashboard from './pages/companydashboard/Dashboard';
import LeadFormConfigure from './pages/companydashboard/LeadFormConfigure';
import LeadForm from './pages/companydashboard/LeadForm';
import RoleConfigure from './pages/companydashboard/teamConfiguration/RoleConfigure';
import PermissionConfigure from './pages/companydashboard/teamConfiguration/PermissionConfigure';
import EmployeeAll from './pages/companydashboard/EmployeeAll';
import EmployeeManage from './pages/companydashboard/EmployeeManage';
import LeadAll from './pages/companydashboard/LeadAll';

import './App.css';
import EmployeeProfile from './pages/companydashboard/EmployeeProfile';
import PayrollAll from './pages/companydashboard/payroll/PayrollAll';
import PayrollHistory from './pages/companydashboard/payroll/PayrollHistory';
import AttendanceAll from './pages/companydashboard/attendance/AttendanceAll';
import AttendanceHistory from './pages/companydashboard/attendance/AttendanceHistory';
import EventMain from './pages/companydashboard/event/EventMain';
import Admin from './components/common/Admin';
import AdminCreation from './components/common/AdminCreation';
import Login from './components/common/Login';
import ProtectedCompany from './utils/ProtectedCompany';
import ProtectRoute from './utils/ProtectRoute';
import Home from './pages/client/Home';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDetails } from './redux/slice/employee/loginSlice';
import { useEffect } from 'react';
import MonthlyLeaveConfigure from './pages/companydashboard/MonthlyLeaveConfigure';
import LeadUpdate from './pages/companydashboard/LeadUpdate';


function App() {

const dispatch = useDispatch();

  const { employeeData, loading } = useSelector((state) => state.reducer.login);

  useEffect(() => {
    if (!employeeData) {
      dispatch(employeeDetails());
    }

   
  }, [dispatch, employeeData]);
  return (
    <>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* ---------------- Public/Register Routes ---------------- */}
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />




        {/* <Route element={<ProtectRoute />}> */}
          {/* ---------------- Company Dashboard Routes ---------------- */}
          <Route path="/company/dashboard" element={<Dashboard />} />
          <Route path="/company/form-configure" element={<LeadFormConfigure />} />
          <Route path="/company/lead-form" element={<LeadForm />} />
          <Route path="/company/leadall" element={<LeadAll />} />
          <Route path="/company/lead/update/:id" element={<LeadUpdate/>}/>

          <Route path="/company/role-configure" element={<RoleConfigure />} />
          <Route path="/company/permission-configure" element={<PermissionConfigure />} />

           <Route path='/company/leave-configure' element={<MonthlyLeaveConfigure/>}/>


          <Route path="/company/employe/view" element={<EmployeeAll />} />
          <Route path="/company/employe/create" element={<EmployeeManage />} />
          <Route path="/company/employe/profile/:id" element={<EmployeeProfile />} />


          {/* payroll */}
          <Route path="/company/payroll" element={<PayrollAll />} />
          <Route path="/company/payroll/history" element={<PayrollHistory />} />

          <Route path="/company/attendance" element={<AttendanceAll />} />
          <Route path="/company/attendance/history" element={<AttendanceHistory />} />

          <Route path="/company/event" element={<EventMain />} />

        {/* </Route> */}




        {/* protected company routes */}
        <Route path='/company/verify' element={<Admin />} />
        {/* <Route element={<ProtectedCompany />}> */}
          <Route path="/company/Admin" element={<AdminCreation />} />
        {/* </Route> */}






        {/* ---------------- Client Pages Routes ---------------- */}
      

      
       
      </Routes>

    </>
  );
}

export default App;
