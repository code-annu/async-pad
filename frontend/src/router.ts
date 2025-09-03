import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./presentation/pages/auth/LoginPage";
import RegisterPage from "./presentation/pages/auth/RegisterPage";
import HomePage from "./presentation/pages/dashboard/HomePage";

export const enum AppRoute {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
}

export const appRouter = createBrowserRouter([
  { path: AppRoute.HOME, Component: HomePage },
  { path: AppRoute.REGISTER, Component: RegisterPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
]);
