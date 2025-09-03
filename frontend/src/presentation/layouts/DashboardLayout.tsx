import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { useApp } from "../../application/context/AppContext";
import { useEffect } from "react";
import { AppRoute } from "../../router";

function DashboardLayout() {
  const { user } = useApp();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user) navigateTo(AppRoute.LOGIN);
  }, [user, navigateTo]);
  return (
    <div className="flex space-x-10">
      <Sidebar />
      <div className="bg-gray-50 w-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
