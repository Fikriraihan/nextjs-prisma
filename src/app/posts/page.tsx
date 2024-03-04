import React from "react";
import { useSession } from "next-auth/react";
import PostScreen from "../Modules/Posts/PostScreen";

const ProfilePage = () => {
  return (
    <div>
      <PostScreen />
    </div>
  );
};

export default ProfilePage;
