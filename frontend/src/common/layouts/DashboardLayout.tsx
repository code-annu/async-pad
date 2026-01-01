import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SideNavbar } from "../components/navbar/SideNavbar";
import { useAppDispatch, useAppSelector } from "../../app/app-hook";
import { StorageUtil } from "../../util/StorageUtil";
import { AppRoutes } from "../../router";
import { getProfileThunk } from "../../features/profile/profile-thunk";
import { CircularLoadingBar } from "../components/progress/CircularLoadingBar";
import { refreshToken } from "../../features/authentication/auth-thunk";

export const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, error, isLoading } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    console.log("Profile: ", profile);
    if (!StorageUtil.getAccessToken()) {
      navigate(AppRoutes.LOGIN);
      return;
    }
    if (!profile) {
      dispatch(getProfileThunk());
    }
  });

  if (isLoading && !profile) {
    return (
      <div className="flex bg-white h-screen w-full items-center justify-center">
        <CircularLoadingBar size={48} />
      </div>
    );
  }

  if (error && !profile) {
    if (error.code === 401) {
      dispatch(refreshToken())
        .unwrap()
        .then(() => {
          dispatch(getProfileThunk());
        })
        .catch(() => {
          navigate(AppRoutes.LOGIN);
        });
    }
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-red-500">
        Error: {error.error.message}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

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
