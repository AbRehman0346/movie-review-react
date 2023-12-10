import React, { useState } from "react";
import * as db from "../services/mongodb.js";
import userStore from "../user_redux/user";
import imageCompression from "browser-image-compression";
import player from "../components/Player.jsx";
import * as fun from "../functions/general_functions.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as nav from "../xnavigate.js";

function UpdateReview() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [selectVideo, setSelectedVideo] = useState();
  const [usePost, setPost] = useState();
  const state = userStore.getState();
  const params = useParams();

  async function submit() {
    const tags = fun.getArrayOfCommaSeparatedValues(
      document.getElementById("tags").value
    );
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    const data = {
      _id: params.id,
      title,
      desc,
      images: [selectedImage],
      videos: selectVideo,
      creator: state.email,
      tags,
    };

    const response = await db.update(data);
    if (response) {
      alert("Data Updated Sucessfully");
      nav.Navigate_to(navigate, nav.RoutePaths.MANAGE);
    } else {
      alert("Data Could not be Updated.");
    }
  }
  const handleChangeImage = async (event) => {
    const file = event.target.files[0];
    const blob = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      setSelectedImage(e.target.result);
    });
    reader.readAsDataURL(blob);
  };

  const handleAddVideo = () => {
    setSelectedVideo(document.getElementById("video-input").value);
  };

  const getData = async () => {
    let post = await db.getById(params.id);
    post = post[0];
    setPost(post);
    setSelectedImage(post.images);
    if (post.videos[0]) setSelectedVideo(post.videos[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  if (usePost) {
    if (usePost.creator === userStore.getState().email)
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          {/* Title */}
          <input
            className='my-3 w50p font28'
            type='text'
            id='title'
            placeholder='Enter Title Here'
            defaultValue={usePost.title}
          />
          {/* Image Displaying */}
          {selectedImage && <img src={selectedImage} alt='Loading Failed' />}
          <input type='file' onChange={handleChangeImage} />
          {/* Finish (Image Display) */}
          {/* Video Section */}
          {selectVideo != null ? <div>{player(selectVideo)}</div> : <dev></dev>}

          {/* Add Video */}
          <div className='align-items-right full-width'>
            <input type='text' id='video-input' className='mx-5' />
            <button className='btn-primary btn my-5' onClick={handleAddVideo}>
              Add Video
            </button>
          </div>
          {/* Description */}
          <div className='full-width d-flex flex-column'>
            <textarea
              rows='50'
              className='mx-3 font22'
              placeholder='Description Here'
              id='desc'
              defaultValue={usePost.desc}
            />
            {/* Tags Input */}
            <input
              type='text'
              className='mx-3 my-3 font22'
              placeholder='Tags: Separated By Comma'
              id='tags'
              defaultValue={usePost.tags}
            />
          </div>

          <div className='full-width d-flex flex-column'>
            <button
              type='submit'
              onClick={submit}
              className='btn btn-primary height60 m-5 font28'
            >
              Submit
            </button>
          </div>
        </div>
      );
    else {
      return <h1>You don't have permissions to edit this post.</h1>;
    }
  } else {
    return null;
  }
}

export default UpdateReview;
