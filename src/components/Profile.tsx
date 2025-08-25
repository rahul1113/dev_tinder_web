import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Profile = () => {
  const profileData = useSelector((state: any) => state.user);

  return (
    <div>
      <EditProfile profileData={profileData} />
    </div>
  );
};

export default Profile;
