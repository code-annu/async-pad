import { Link } from "react-router-dom";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useState } from "react";
import { AppRoute } from "../../../router";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  // const [name,setName] = useState("");

  const onButtonClick = async () => {};
  return (
    <form
      className=" w-1/2 mx-auto p-10 shadow-lg my-10 rounded flex flex-col space-y-5"
      method="post"
    >
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

      <PrimaryButton
        text="Register"
        onClick={onButtonClick}
        buttonType="submit"
        height="h-12"
      />
      <Link to={AppRoute.LOGIN} className="mx-auto text-blue-700">
        Already have an account? Login
      </Link>
    </form>
  );
}

export default RegisterPage;
