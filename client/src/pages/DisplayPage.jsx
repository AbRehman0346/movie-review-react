import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Content from "../components/display_page_components/Content";
import Comments from "../components/display_page_components/comment/Comments";
import * as db from "../services/mongodb";
import { Navbar } from "react-bootstrap";
import * as consts from "../constants.js";
import userStore from "../user_redux/user";
import * as nav from "../xnavigate";

function DisplayPage() {
  const state = userStore.getState();
  const [useData, setData] = useState();
  const params = useParams();

  const getData = async () => {
    const data = await db.getById(params.id);
    setData(data[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  const if_login = () => {
    if (!state.email) {
      return <Link to={nav.RoutePaths.LOGIN}>Sign Up</Link>;
    }
    return <></>;
  };

  if (useData) {
    return (
      <>
        <Navbar className='navbar-bg d-flex justify-content-center w10p'>
          <div className='d-flex justify-content-sb w98p'>
            <h3 className='text-white'>{consts.site_name}</h3>
            {if_login()}
          </div>
        </Navbar>
        <div className='d-flex align-items-center flex-column'>
          {/* Title, Image And Description */}
          <Content
            title={useData.title}
            desc={useData.desc}
            image={useData.images}
            video={useData.videos}
          />
          {/* Comments Section */}
          <Comments doc_id={params.id} />
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default DisplayPage;
