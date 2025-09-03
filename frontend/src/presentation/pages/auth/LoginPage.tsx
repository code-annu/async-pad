import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../application/hooks/auth-hook";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { AppRoute } from "../../../router";

function LoginPage() {
  const { login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user) navigateTo(AppRoute.HOME);
  }, [navigateTo, user]);

  const onLogin = () => {
    login(username, password);
  };

  return (
    <div className=" w-1/2 mx-auto p-10 shadow-lg my-10 rounded flex flex-col space-y-5">
      <InputField
        value={username}
        onValueChange={setUsername}
        placeholder="Enter a username"
        label="Username"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        value={password}
        onValueChange={setPassword}
        placeholder="Enter password"
        label="Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <PrimaryButton
        text="Login"
        onClick={onLogin}
        buttonType="submit"
        height="h-12"
      />
      <Link to={AppRoute.REGISTER} className="mx-auto text-green-700">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default LoginPage;
