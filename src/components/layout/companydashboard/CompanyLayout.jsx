
import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function CompanyLayout({ children ,pageTitle}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar  pageTitle={pageTitle}/>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
     
        </main>
      </div>
    </div>
  );
}

export default CompanyLayout;
