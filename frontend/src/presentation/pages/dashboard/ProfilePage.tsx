import { useApp } from "../../../application/context/AppContext";

function ProfilePage() {
  const { user } = useApp();

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Avatar Placeholder */}
        <div className="flex justify-center -mt-16 mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        {/* Name and Username */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.name || "Your Name"}
          </h2>
          <p className="text-gray-500">@{user?.username || "username"}</p>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium mb-2">Bio</h3>
          <p className="text-gray-600">
            {user?.bio || "This user hasn’t added a bio yet."}
          </p>
        </div>

        {/* Optional: Edit Button */}
        {/* <div className="text-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
