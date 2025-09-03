import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../../application/hooks/auth-hook";
import { useApp } from "../../application/context/AppContext";
import { useEffect } from "react";
import { AppRoute } from "../../router";

function DashboardLayout() {
  const { user } = useApp();
  const { refreshToken } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user) {
      refreshToken().then((result) => {
        if (!result) navigateTo(AppRoute.LOGIN);
      });
    }
  });

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
