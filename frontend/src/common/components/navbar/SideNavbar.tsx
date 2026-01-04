import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, Bell, User, Settings, LogOut } from "lucide-react";
import { AppRoutes } from "../../../router";
import { SideNavButton } from "../buttons/SideNavButton";
import { useAppDispatch } from "../../../app/app-hook";
import { logout } from "../../../features/authentication/auth-slice";

export const SideNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
  };

  const topNavItems = [
    { label: "Home", icon: <Home size={20} />, path: AppRoutes.HOME },
    {
      label: "Documents",
      icon: <FileText size={20} />,
      path: AppRoutes.DOCUMENTS,
    },
    {
      label: "Notifications",
      icon: <Bell size={20} />,
      path: AppRoutes.NOTIFICATION,
    },
  ];

  const bottomNavItems = [
    { label: "Profile", icon: <User size={20} />, path: AppRoutes.PROFILE },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      path: AppRoutes.SETTING,
    },
  ];

  return (
    <div className="h-screen w-20 flex flex-col items-center py-6 bg-white border-r border-gray-100 shadow-sm">
      {/* Logo Area */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
          <span className="text-white font-bold text-xl">A</span>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex-1 flex flex-col gap-4 w-full px-4">
        {topNavItems.map((item) => (
          <Link to={item.path} key={item.label}>
            <SideNavButton
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-4 w-full px-4 mt-auto">
        {bottomNavItems.map((item) => (
          <Link to={item.path} key={item.label}>
            <SideNavButton
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          </Link>
        ))}

        {/* Logout Button */}
        <SideNavButton
          icon={<LogOut size={20} />}
          label="Logout"
          isActive={false}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
