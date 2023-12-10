import React from "react";
import image from "../assets/test.jpg";
import * as fun from "../functions/general_functions.js";
import { useNavigate } from "react-router-dom";
import * as db from "../services/mongodb.js";
import {
  AiOutlineStar as Star,
  AiFillStar as FilledStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import * as nav from "../xnavigate";

function Card({ id, title, desc, image, options = false }) {
  const navigate = useNavigate();
  const giveOptions = () => {
    if (options) {
      return (
        <div className='mt-2 full-width'>
          <button
            className='btn btn-secondary mr-1'
            style={{ width: "59%" }}
            onClick={() => {
              nav.Navigate_to(navigate, nav.RoutePaths.UPDATE, id);
            }}
          >
            Edit
          </button>
          <button
            className='btn btn-danger'
            onClick={async () => {
              if (await db.delete_post(id)) alert("Delete Sucessfull");
              else alert("Could not Delete!");
              // nav.Navigate_to(navigate, nav.RoutePaths.MANAGE);
            }}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div id='card'>
      <Link to={`/display/${id}`} className='text-deco-none'>
        <img
          src={image.length !== 0 ? image : require("../assets/test.jpg")}
          // width={200}
          // height={150}
          alt='Attack On Titan'
        />
        <h5 className='text-primary m-0 p-0 text-overflow-elipsis'>
          {fun.handle_text_overflow(title)}
        </h5>
        <p className='text-secondary m-0 p-0'>{desc}</p>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Link>
      {giveOptions()}
    </div>
  );
}

export default Card;
