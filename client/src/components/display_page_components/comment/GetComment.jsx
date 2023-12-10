import React from "react";
import userStore from "../../../user_redux/user";
import { post_comment } from "../../../services/mongodb_comments";

function GetComment({ doc_id }) {
  let state = userStore.getState();
  const getEmail = () => {
    if (state.email) {
      return state.email;
    }
    return "Sign in to Comment";
  };
  return (
    <div className='d-flex'>
      <img
        src={require("../../../assets/hero_background.jpg")}
        alt='Profile'
        className='rounded-circle'
        width={50}
        height={50}
      />

      <div className='width-min-content ml-1'>
        {/* Email of the Comment writter */}
        <h6>{getEmail()}</h6>

        {/* Text Area for comment to write. */}
        <textarea
          type='text'
          name='comment'
          id='getComment'
          cols={30}
          rows={3}
          placeholder='Comment'
        />
        <button
          type='Submit'
          className={state.email ? "btn-primary" : "btn-secondary" + "rounded"}
          onClick={() => {
            if (state.email) {
              const textfield = document.getElementById("getComment");
              post_comment(doc_id, textfield.value);
              alert("Comment Posted");
              textfield.value = "";
            } else {
              alert("Sign in to Comment");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default GetComment;
