import React from 'react';
import EmployeeManage from '../../pages/companydashboard/EmployeeManage';

function AdminCreation() {
  // Example flag to hide company layout in EmployeeManage
  const hideCompanyLayout = true;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== BANNER ===== */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Admin</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Add a new admin to manage company operations. Provide accurate details
          to ensure proper access and permissions.
        </p>
      </div>

      {/* ===== EMPLOYEE MANAGEMENT FORM ===== */}
      <div className="py-8 px-4">
        <EmployeeManage
          role="Admin"
          department="Admin"
          hideCompanyLayout={hideCompanyLayout} // hide company layout inside component
        />
      </div>
    </div>
  );
}

export default AdminCreation;
