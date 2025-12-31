import React, { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../common/components/buttons/PrimaryButton";
import { TextInputField } from "../../../common/components/inputs/TextInputField";
import { PasswordInputField } from "../../../common/components/inputs/PasswordInputField";
import { AppRoutes } from "../../../router";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { loginUser } from "../auth-thunk";
import { ErrorText } from "../../../common/components/texts/ErrorText";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const action = await dispatch(loginUser(formData));
    console.log(action);
    if (loginUser.fulfilled.match(action)) {
      navigate(AppRoutes.HOME);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={AppRoutes.SIGNUP}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <TextInputField
              label="Username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
            />
            <PasswordInputField
              label="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="securepassword"
              required
            />
          </div>

          <ErrorText error={auth.error?.error.message} />

          <PrimaryButton
            type="submit"
            className="w-full"
            isLoading={auth.isLoading}
          >
            Sign in
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};
