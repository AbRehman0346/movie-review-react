import React from "react";
import player from "../Player";

function Content({ title, desc, image, video }) {
  return (
    <div
      className='d-flex flex-column align-items-center w90p'
      id='content-page-main-div'
    >
      {/* title */}
      <h1 className='title'>{title}</h1>
      {/* Image */}
      <img
        id='display-cover-image'
        src={image}
        alt='Cover'
        width={500}
        height={500}
      />

      <div className='m-3' id='display-page-video-player'>
        {player(video)}
      </div>

      {/* Description */}
      <div id='display_page_description_div' className=''>
        <p className='font-20'>{desc}</p>
      </div>
    </div>
  );
}

export default Content;
