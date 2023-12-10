import axios from "axios";
import userStore from "../user_redux/user";

const addDataEndPoint = "http://localhost:5000/posts/save";
const getDataEndPoint = "http://localhost:5000/posts/get";
const getDataByIdEndPoint = "http://localhost:5000/posts/getbyid";
const getDataByEmailEndPoint = "http://localhost:5000/posts/getbyemail/";
const updateDataEndPoint = "http://localhost:5000/posts/update";
const deleteDataEndPoint = "http://localhost:5000/posts/delete";

export const add_reivew = async (data) => {
  try {
    const response = await axios.post(addDataEndPoint, data, {
      headers: getHeaders(),
    });

    // Status: 200 -> OK, 201 -> Authentication Error
    return response.status;
  } catch (error) {
    console.log(`error ${error}`);
    return false;
  }
};

export const update = async (data) => {
  try {
    const response = await axios.put(updateDataEndPoint, data, {
      headers: getHeaders(),
    });
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const delete_post = async (id) => {
  try {
    const response = await axios.delete(deleteDataEndPoint, {
      headers: getHeaders(),
      params: {
        id,
      },
    });
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const get = async () => {
  try {
    let response = await axios.get(getDataEndPoint, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(getDataByIdEndPoint, {
      headers: getHeaders(),
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getUserUploadedPosts = async () => {
  try {
    const email = userStore.getState().email;
    const response = await axios.get(getDataByEmailEndPoint, {
      headers: getHeaders(),
      params: {
        email,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

function getHeaders() {
  const state = userStore.getState();
  return {
    authorization: `Bearer ${state.token}`,
  };
}
