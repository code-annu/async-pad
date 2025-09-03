import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./presentation/pages/auth/LoginPage";
import RegisterPage from "./presentation/pages/auth/RegisterPage";
import HomePage from "./presentation/pages/dashboard/HomePage";
import DashboardLayout from "./presentation/layouts/DashboardLayout";
import DocumentsPage from "./presentation/pages/dashboard/DocumentsPage";
import ProfilePage from "./presentation/pages/dashboard/ProfilePage";

export const enum AppRoute {
  HOME = "/",
  DOCUMENTS = "/:username/documents",
  PROFILE = "/:username",
  LOGIN = "/login",
  REGISTER = "/register",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoute.HOME,
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      { path: AppRoute.DOCUMENTS, Component: DocumentsPage },
      { path: AppRoute.PROFILE, Component: ProfilePage },
    ],
  },
  // { path: AppRoute.HOME, Component: HomePage },
  { path: AppRoute.REGISTER, Component: RegisterPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
]);
