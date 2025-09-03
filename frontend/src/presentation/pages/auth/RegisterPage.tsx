// import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
// import { AppRoute } from "../../../routes";

function RegisterPage() {
  return (
    <form
      className=" w-1/2 mx-auto p-10 shadow-lg my-10 rounded flex flex-col space-y-5"
      method="post"
    >
      <InputField
        placeholder="Enter your fullname"
        label="Fullname"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        placeholder="Enter a username"
        label="Username"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        placeholder="Enter a password"
        label="Create Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        placeholder="Re-Enter  password"
        label="Confirm Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <PrimaryButton
        text="Register"
        onClick={() => 15}
        buttonType="submit"
        height="h-12"
      />
      {/* <Link to={AppRoute.LOGIN} className="mx-auto text-blue-700">
        Already have an account? Login
      </Link> */}
      <a href="" className="mx-auto text-blue-700">
        Already have an account? Login
      </a>
    </form>
  );
}

export default RegisterPage;
