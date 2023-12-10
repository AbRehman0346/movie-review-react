import React, { useState } from "react";
import * as db from "../services/mongodb.js";
import userStore from "../user_redux/user";
import imageCompression from "browser-image-compression";
import player from "../components/Player.jsx";
import * as fun from "../functions/general_functions.js";
import * as nav from "../xnavigate.js";
import { useNavigate } from "react-router-dom";
import { TAG_LIMIT_PER_POST } from "../constants.js";
import { AiFillCloseSquare } from "react-icons/ai";

function AddReview() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [selectVideo, setSelectedVideo] = useState();
  const [usetags, settags] = useState([]);
  const [useTagErrorMsg, setTagErrorMsg] = useState("");
  const state = userStore.getState();

  async function submit() {
    const title = document.getElementById("add-review-page-title").value;
    const desc = document.getElementById("add-review-page-desc").value;

    const data = {
      title,
      desc,
      images: [selectedImage],
      videos: selectVideo,
      creator: state.email,
      tags: usetags,
    };

    const status = await db.add_reivew(data);
    if (status === 200) {
      alert("Data Added Sucessfully");
      navigate(nav.RoutePaths.MANAGE);
    } else if (status === 201) {
      alert("Authentication Failed!\nPlz Login Again.");
      navigate(nav.RoutePaths.LOGIN);
    } else {
      alert("Data Could not be added.");
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

  const generate_tags = () => {
    return usetags.map((item) => (
      <>
        <div
          className='d-flex justify-content-center align-items-center'
          id='add-review-tag-item'
        >
          <p id='add-review-tag-view-text' className='font-bold'>
            {item}
          </p>
          <button
            className='link-button reset'
            onClick={() => {
              settags(usetags.filter((element) => element !== item));
            }}
          >
            <AiFillCloseSquare id='add-review-close-icon' />
          </button>
        </div>
      </>
    ));
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {/* Title */}
      <input
        className='my-3 w50p font28'
        type='text'
        id='add-review-page-title'
        placeholder='Enter Title Here'
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
      <div
        className='full-width d-flex flex-column'
        id='add-review-description-dev'
      >
        <textarea
          id='add-review-page-desc'
          rows='50'
          className='mx-3 font-2rem'
          placeholder='Description Here'
        />
        {/* Tags Input */}
        <div>
          <input
            id='add-review-page-tags'
            type='text'
            className='mt-5 mx-3 font-22'
            placeholder='TAG'
          />
          <button
            id='add-review-tag-button'
            className='btn btn-primary'
            onClick={() => {
              const input = document.getElementById("add-review-page-tags");
              const value = input.value.trim();
              if (value) {
                if (!usetags.includes(value)) {
                  if (usetags.length < TAG_LIMIT_PER_POST) {
                    settags([...usetags, value]);
                    input.value = "";
                    setTagErrorMsg("");
                  } else {
                    setTagErrorMsg(
                      `Maximum Tag Limit is ${TAG_LIMIT_PER_POST}`
                    );
                  }
                } else {
                  setTagErrorMsg("Same Tag Can't be used twice");
                }
              } else {
                setTagErrorMsg("Write Tag First");
              }
            }}
          >
            ADD TAG
          </button>
        </div>

        <div className='d-flex'>{generate_tags()}</div>
        <p id='add-review-tag-error-p' className='text-danger'>
          {useTagErrorMsg}
        </p>
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
}

export default AddReview;
