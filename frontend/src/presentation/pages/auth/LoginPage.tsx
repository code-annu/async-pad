// import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
// import { AppRoute } from "../../../routes";

function LoginPage() {
  return (
    <form
      className=" w-1/2 mx-auto p-10 shadow-lg my-10 rounded flex flex-col space-y-5"
      method="post"
    >
      <InputField
        placeholder="Enter a username"
        label="Username"
        paddingY="py-2"
        paddingX="px-2"
      />

      <InputField
        placeholder="Enter password"
        label="Password"
        type="password"
        paddingY="py-2"
        paddingX="px-2"
      />

      <PrimaryButton
        text="Login"
        onClick={() => 15}
        buttonType="submit"
        height="h-12"
      />
      {/* <Link to={AppRoute.REGISTER} className="mx-auto text-green-700">
        Don't have an account? Register
      </Link> */}
      <a href="" className="mx-auto text-green-700">
        Don't have an account? Register
      </a>
    </form>
  );
}

export default LoginPage;
