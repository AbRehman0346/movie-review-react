import React from "react";

function ProfileImage(data) {
  return (
    <>
      <img
        className='mt-3'
        id='rounded_profile_image_component'
        src={require("../assets/hero_background.jpg")}
        alt='Profile'
      />
    </>
  );
}

export default ProfileImage;
