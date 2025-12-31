import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getProfileThunk } from "../../profile/profile-thunk";
import { StorageUtil } from "../../../util/StorageUtil";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have an access token (either in state or storage) but no profile, fetch it
    const hasToken = accessToken || StorageUtil.getAccessToken();
    if (hasToken && !profile) {
      dispatch(getProfileThunk());
    }
  }, [accessToken, profile, dispatch]);

  const firstName = profile?.fullname.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Greeting Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Welcome back, <span className="text-blue-600">{firstName}!</span>
        </h1>
        <p className="text-xl text-gray-600">
          We're glad to see you again. Ready to collaborate?
        </p>
      </section>

      {/* App Info Section */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-6">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is AsyncPad?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            AsyncPad is a powerful collaborative writing tool designed for
            modern teams. Our platform allows you to create, edit, and share
            documents with your teammates in real-time or asynchronously,
            ensuring your projects stay on track no matter where you are.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-6">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Core Features
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Real-time collaboration
            </li>
            <li className="flex items-center">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Smart document organization
            </li>
            <li className="flex items-center">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Secure access controls
            </li>
            <li className="flex items-center">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Instant notifications
            </li>
          </ul>
        </div>
      </div>

      {/* Getting Started Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold">New here?</h2>
          <p className="text-blue-100 text-lg max-w-2xl">
            Check out your documents or head over to settings to customize your
            profile. AsyncPad is built to make your workflow smoother and more
            efficient.
          </p>
          <button className="mt-4 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
            Quick Start Guide
          </button>
        </div>
        {/* Subtle background shape */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl"></div>
      </section>
    </div>
  );
};
