// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import { employeeDetails } from "../redux/slice/employee/loginSlice";

// function ProtectRoute() {
//   const dispatch = useDispatch();

//   // Add "initialized" flag in slice for robust control
//   const { employeeData, loading, initialized } = useSelector(
//     (state) => state.reducer.login
//   );

//   useEffect(() => {
//     // Only fetch if not initialized
//     if (!employeeData) {
//       dispatch(employeeDetails());
//     }
//   }, []);

//   console.log(employeeData, "employeeData");

//  // Show loader while fetching user
//   if (loading) return <div>Loading...</div>;

//   // 2️⃣ Redirect if no user after initialized
//   if (!employeeData) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3️⃣ Authorized → render child routes
//   return <Outlet />;
// }

// export default ProtectRoute;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { employeeDetails } from "../redux/slice/employee/loginSlice";

function ProtectRoute() {
  const dispatch = useDispatch();

  // Grab state
  const { employeeData, loading, initialized } = useSelector(
    (state) => state.reducer.login
  );

  // Fetch employee details only if not initialized
  useEffect(() => {
    if (!initialized) {
      dispatch(employeeDetails());
    }
  }, [dispatch, initialized]);

  // console.log(employeeData, "employeeData");

  // 1️⃣ Show loader while fetching or uninitialized
  if (loading || !initialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading your profile...</p>
      </div>
    );
  }

  // 2️⃣ Redirect if fetch is done but no user
  if (!employeeData) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Authorized → render child routes
  return <Outlet />;
}

export default ProtectRoute;
