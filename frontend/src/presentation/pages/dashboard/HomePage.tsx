import { useApp } from "../../../application/context/AppContext";

function HomePage() {
  const { user } = useApp();

  // if (!user) return <div>This is home page</div>;

  return (
    <div className="flex justify-center items-center m-auto h-screen flex-col space-y-5">
      <h1 className="text-amber-700 text-3xl font-semibold">Hello, {user?.name}</h1>
      <p className="text-gray-700 text-lg">
        Here, you can create documents and invite your friends to contribute to them.
      </p>
    </div>
  );
}

export default HomePage;
