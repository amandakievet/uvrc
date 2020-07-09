import React from "react";
import RichText from "./richtext";

const Profile = ({ name, description, profile_picture }) => (
  <div className="flex">
    <img src={profile_picture.url} className="rounded-full w-16 h-16 mr-4" />
    <div>
      <h5 className="font-display text-lg mb-2">{name}</h5>
      <RichText html={description.html} className="text-sm" />
    </div>
  </div>
);

export default Profile;
