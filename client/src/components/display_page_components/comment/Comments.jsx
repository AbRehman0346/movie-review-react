import React from "react";
import GetComment from "./GetComment";
import Show_Comments from "./Show_Comments";

function Comments({ doc_id }) {
  return (
    <div className='w70p m-5'>
      <GetComment doc_id={doc_id} />
      <Show_Comments doc_id={doc_id} />
    </div>
  );
}

export default Comments;
