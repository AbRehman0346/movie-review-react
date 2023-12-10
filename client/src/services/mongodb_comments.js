import axios from "axios";
import userStore from "../user_redux/user";

const postCommentEndPoint = "http://localhost:5000/comments/save";
const getCommentsEndPoint = "http://localhost:5000/comments/";
export async function post_comment(doc_id, comment) {
  try {
    const state = userStore.getState();
    const data = {
      email: state.email,
      doc: doc_id,
      comment,
    };
    console.log(data);
    await axios.post(postCommentEndPoint, data, {
      headers: getHeader(),
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function get(doc) {
  try {
    const response = await axios.get(getCommentsEndPoint, {
      headers: getHeader(),
      params: {
        doc,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

function getHeader() {
  const state = userStore.getState();
  return {
    authorization: `Bearer ${state.token}`,
  };
}
