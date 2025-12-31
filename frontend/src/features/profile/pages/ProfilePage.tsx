import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { AppRoutes } from "../../../router";
import { CircularLoadingBar } from "../../../common/components/progress/CircularLoadingBar";
import { getProfileThunk } from "../profile-thunk";
import { StorageUtil } from "../../../util/StorageUtil";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { profile, isLoading, error } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (!accessToken && !StorageUtil.getAccessToken()) {
      navigate(AppRoutes.LOGIN);
      return;
    }
    dispatch(getProfileThunk());
  }, [accessToken, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="flex bg-white h-screen w-full items-center justify-center">
        <CircularLoadingBar size={48} />
      </div>
    );
  }

  if (error) {
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
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">My Profile</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center space-x-6">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullname}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
              {profile.fullname.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.fullname}
            </h2>
            <p className="text-gray-500">@{profile.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              About
            </h3>
            <p className="mt-1 text-gray-900">
              {profile.about || "No bio added yet."}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Joined On
            </h3>
            <p className="mt-1 text-gray-900">
              {new Date(profile.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
