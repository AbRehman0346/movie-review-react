import axios from "axios";

const getUserEndPoint = "http://localhost:5000/user/";

export const getUser = async (email) => {
  try {
    const response = await axios.get(getUserEndPoint, {
      params: {
        email,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

// export function UserMessanger(status, data) {
//   return {
//     status,
//     data,
//   };
// }
