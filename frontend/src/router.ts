import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/authentication/pages/LoginPage";
import { SignupPage } from "./features/authentication/pages/SignupPage";
import { DashboardLayout } from "./common/layouts/DashboardLayout";
import { HomePage } from "./features/home/pages/HomePage";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { SettingPage } from "./features/home/pages/SettingPage";
import { DocumentsPage } from "./features/documents/pages/DocumentsPage";
import { EditDocumentPage } from "./features/documents/pages/EditDocumentPage";
import { NotificationPage } from "./features/home/pages/NotificationPage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
  NOTIFICATION = "/notification",
  SETTING = "/setting",
  DOCUMENTS = "/documents",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    Component: DashboardLayout,
    children: [
      { path: AppRoutes.HOME, Component: HomePage },
      { path: AppRoutes.PROFILE, Component: ProfilePage },
      { path: AppRoutes.SETTING, Component: SettingPage },
      { path: AppRoutes.DOCUMENTS, Component: DocumentsPage },
      { path: AppRoutes.DOCUMENTS + "/:id", Component: EditDocumentPage },
      { path: AppRoutes.NOTIFICATION, Component: NotificationPage },
    ],
  },
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
]);
