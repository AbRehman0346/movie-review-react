import React from "react";
import * as comments_db from "../../../services/mongodb_comments";
import { useEffect, useState } from "react";

function Show_Comments({ doc_id }) {
  const [useComments, setComments] = useState();
  const getData = async () => {
    const response = await comments_db.get(doc_id);
    if (response.status) {
      console.log(response.data);
      const ui = response.data.map((item) => generateCommentsUI(item));
      setComments(ui);
    }
  };

  const generateCommentsUI = (item) => {
    return (
      <div className='m-5 w30p'>
        <h6>{item.email}</h6>
        <div className='bg-white p-2'>{item.comment}</div>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);
  if (useComments) {
    return <div>{useComments}</div>;
  } else {
    return null;
  }
}

export default Show_Comments;
