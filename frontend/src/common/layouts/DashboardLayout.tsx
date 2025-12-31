import React from "react";
import { Outlet } from "react-router-dom";
import { SideNavbar } from "../components/navbar/SideNavbar";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
