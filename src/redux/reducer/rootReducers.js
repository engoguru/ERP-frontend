import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from '../slice/companySlice'; // import the slice reducer
import employeeReducer from '../slice/employee/employeeCreateSlice';
import adminReducer from "../slice/adminSlice";
import loginReducer from "../slice/employee/loginSlice";
import leadReducer from "../slice/leadSlice";
import eventReducer from "../slice/employee/eventSlice";
import attendanceReducer from "../slice/employee/attendanceSlice";
import ipReducer from "../slice/employee/ipSlice"


const rootReducer = combineReducers({
  company: companyReducer, 
  employee:employeeReducer,
  admin:adminReducer,
  login:loginReducer,
  lead:leadReducer,
  event:eventReducer,
  attendance:attendanceReducer,
  ip:ipReducer
});

export default rootReducer;
