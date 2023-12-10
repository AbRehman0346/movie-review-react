import React from "react";
import ProfileImage from "../components/profile_image";
import * as mdb_user from "../services/mongodb_user.js";
import * as mdb from "../services/mongodb.js";
import userStore from "../user_redux/user";
import { dev_login } from "./dev/dev_login";
import * as fun from "../functions/general_functions.js";
import { useState, useEffect } from "react";
import Header from "../components/index_page_components/Header";
import { Navbar } from "react-bootstrap";
import * as nav from "../xnavigate.js";
import { useNavigate } from "react-router-dom";

let isReadytoRender = false;
function Manage() {
  const navigate = useNavigate();
  const [useUser, setUser] = useState();
  const [usePosts, setPosts] = useState();

  const getData = async () => {
    let user_data = await mdb_user.getUser(userStore.getState().email);
    let posts = await mdb.getUserUploadedPosts();
    setUser(user_data);
    setPosts(fun.generateCards(posts, true));
  };

  useEffect(() => {
    getData();
    isReadytoRender = true;
  }, []);

  if (isReadytoRender) {
    const data = useUser.data[0];
    isReadytoRender = false;
    return (
      <>
        <Navbar className='navbar-bg color-white pl-2'>
          <div id='manage-navbar-items'>
            <button
              className='link-button'
              onClick={() => {
                nav.Navigate_to(navigate, nav.RoutePaths.ROOT);
              }}
            >
              <h2>Movie Review</h2>
            </button>
            <button
              onClick={() => {
                nav.Navigate_to(navigate, nav.RoutePaths.ADD_REVIEW);
              }}
              className='link-button font-22'
            >
              Add Review
            </button>
          </div>
        </Navbar>
        <div className='d-flex align-items-center flex-column'>
          <ProfileImage />
          <h1>{`${data.firstname} ${data.lastname}`}</h1>
          <h2>{data.email}</h2>
        </div>
        <div className='d-flex flex-wrap justify-content-center p-2'>
          {usePosts}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default Manage;
