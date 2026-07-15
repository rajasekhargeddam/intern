import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { username, profilePicture, firstname, lastname, bio } = user;
  console.log(profilePicture);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex justify-center md:justify-start md:w-1/3">
          <img
            src={profilePicture}
            alt="profile"
            className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-light">{username}</h1>

            <EditProfile />
          </div>

          {firstname && (
            <h2 className="mt-6 font-semibold text-lg">{`${firstname.toLowerCase()} ${lastname ? lastname.toLowerCase() : ""}`}</h2>
          )}

          {bio && (
            <p className="mt-2 text-gray-700 leading-7 max-w-lg">{bio}</p>
          )}
        </div>
      </div>

      <div className="border-t mt-12"></div>
    </div>
  );
};

export default Profile;
