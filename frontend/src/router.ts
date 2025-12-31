import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/authentication/pages/LoginPage";
import { SignupPage } from "./features/authentication/pages/SignupPage";
import { DashboardLayout } from "./common/layouts/DashboardLayout";
import { HomePage } from "./features/home/pages/HomePage";
import { ProfilePage } from "./features/profile/pages/ProfilePage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    Component: DashboardLayout,
    children: [
      { path: AppRoutes.HOME, Component: HomePage },
      { path: AppRoutes.PROFILE, Component: ProfilePage },
    ],
  },
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
]);
