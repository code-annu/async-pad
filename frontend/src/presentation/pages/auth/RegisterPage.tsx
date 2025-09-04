import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useEffect, useState } from "react";
import { AppRoute } from "../../../router";
import { useAuth } from "../../../application/hooks/auth-hook";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const navigateTo = useNavigate();
  const { register, user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigateTo(AppRoute.HOME);
  }, [navigateTo, user]);

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Password and confirm password should match");
      return;
    }
    register({
      username: username,
      name: fullname,
      password: password,
      bio: bio,
    });
  };
  return (
    <div className=" w-1/2 mx-auto p-10 shadow-lg my-10 rounded flex flex-col space-y-5">
      <InputField
        value={fullname}
        onValueChange={setFullname}
        placeholder="Enter your fullname"
        label="Fullname"
        paddingY="py-2"
        paddingX="px-2"
      />

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
        placeholder="Enter a password"
        label="Create Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        placeholder="Re-Enter  password"
        label="Confirm Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        value={bio}
        onValueChange={setBio}
        placeholder="Tell us about yourself"
        label="Bio"
        type="text"
        paddingY="py-2"
        paddingX="px-2"
      />

      <PrimaryButton
        text="Register"
        onClick={onRegister}
        buttonType="submit"
        height="h-12"
      />
      <Link to={AppRoute.LOGIN} className="mx-auto text-blue-700">
        Already have an account? Login
      </Link>

      {error ? <h1 className="text-red-600 mt-10">{error}</h1> : null}
    </div>
  );
}

export default RegisterPage;
