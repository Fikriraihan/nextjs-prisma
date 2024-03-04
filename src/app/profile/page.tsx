"use client";

import React from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        // Render profile page for logged-in users
        <div>Profile Page Content for {session.user.email}</div>
      ) : (
        // Render message for guests
        <div>Please log in to view your profile.</div>
      )}
    </div>
  );
};

export default ProfilePage;
