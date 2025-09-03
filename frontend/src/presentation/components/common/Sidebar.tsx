import { Link } from "react-router-dom";
import { useApp } from "../../../application/context/AppContext";
import { AppRoute } from "../../../router";

function Sidebar() {
  const { user } = useApp();

  return (
    <div className="shadow-xl px-5 pr-15 h-screen">
      <h1 className="text-amber-600 font-medium text-lg mb-10 mt-10">
        Hello,
        <span className="ml-2">{user ? user.name.split(" ")[0] : ""}</span>
      </h1>
      <ul className="flex flex-col space-y-5">
        <Link to={AppRoute.HOME} className="border-b-1 pb-3 border-amber-500">
          Home
        </Link>
        <Link
          to={`/${user?.username}/documents`}
          className="border-b-1 pb-3 border-amber-500"
        >
          Documents
        </Link>
        <Link
          to={`/${user?.username}`}
          className="border-b-1 pb-3 border-amber-500"
        >
          Profile
        </Link>
        <Link to={""} className="border-b-1 pb-3 border-amber-500">
          Invitation
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
