// src/routes/CompanyProtectRoute.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { companyDetails } from "../redux/slice/adminSlice";

function ProtectedCompany() {
  const dispatch = useDispatch();

const { company, companyDetail, loading, initialized, error } = useSelector(
  (state) => state.reducer.admin
);



  useEffect(() => {
    if (!initialized) {
      dispatch(companyDetails());
    }
  }, [dispatch, initialized]);
     console.log(companyDetail,"f")
  // Loader while checking auth
  if (loading || !initialized) {
  
    return <div>Loading...</div>;
  }

  //  Not logged in as company
  if (!companyDetail) {
    return <Navigate to="/company/verify" replace />;
  }

  //  Authorized
  return <Outlet />;
}

export default ProtectedCompany;
