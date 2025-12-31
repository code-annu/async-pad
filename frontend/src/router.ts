import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/authentication/pages/LoginPage";
import { SignupPage } from "./features/authentication/pages/SignupPage";
import { DashboardLayout } from "./common/layouts/DashboardLayout";
import { HomePage } from "./features/home/pages/HomePage";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { SettingPage } from "./features/home/pages/SettingPage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
  SETTING = "/setting",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    Component: DashboardLayout,
    children: [
      { path: AppRoutes.HOME, Component: HomePage },
      { path: AppRoutes.PROFILE, Component: ProfilePage },
      { path: AppRoutes.SETTING, Component: SettingPage },
    ],
  },
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
]);
