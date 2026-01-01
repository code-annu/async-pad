import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Edit2, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { AppRoutes } from "../../../router";
import { CircularLoadingBar } from "../../../common/components/progress/CircularLoadingBar";
import { deleteProfileThunk, updateProfileThunk } from "../profile-thunk";
import { PrimaryButton } from "../../../common/components/buttons/PrimaryButton";
import { DangerButton } from "../../../common/components/buttons/DangerButton";
import { logout } from "../../authentication/auth-slice";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useAppSelector(
    (state) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    about: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname,
        about: profile.about || "",
      });
    }
  }, [profile]);

  const handleUpdate = async () => {
    if (!profile) return;
    try {
      await dispatch(
        updateProfileThunk({
          fullname: formData.fullname,
          about: formData.about,
        })
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await dispatch(deleteProfileThunk()).unwrap();
        dispatch(logout());
        navigate(AppRoutes.LOGIN);
      } catch (error) {
        console.error("Failed to delete profile:", error);
      }
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="flex bg-white h-screen w-full items-center justify-center">
        <CircularLoadingBar size={48} />
      </div>
    );
  }

  if (error && !profile) {
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
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          {/* Avatar Section */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullname}
                className="h-32 w-32 rounded-full object-cover border-4 border-gray-50"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-600 border-4 border-gray-50">
                {profile.fullname.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-xl font-semibold text-gray-900">
                    {profile.fullname}
                  </p>
                )}
              </div>

              {/* Username (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-gray-900">@{profile.username}</p>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={formData.about}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us a bit about yourself..."
                  />
                ) : (
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {profile.about || "No bio added yet."}
                  </p>
                )}
              </div>

              {/* Joined Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joined On
                </label>
                <p className="text-gray-900">
                  {new Date(profile.joinedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <PrimaryButton
                  onClick={handleUpdate}
                  isLoading={isLoading}
                  className="w-full md:w-auto"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </PrimaryButton>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      fullname: profile.fullname,
                      about: profile.about || "",
                    });
                  }}
                  className="flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors w-full md:w-auto"
                  disabled={isLoading}
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-100 bg-red-50 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">
              Delete Account
            </h3>
            <p className="text-red-700">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <DangerButton
            onClick={handleDelete}
            isLoading={isLoading}
            className="w-full md:w-auto flex-shrink-0"
          >
            <Trash2 size={18} className="mr-2" />
            Delete Account
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
