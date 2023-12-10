import axios from "axios";
import * as cookie from "./cookies";

// End points
const endPointRegister = "http://localhost:5000/auth/register";
const endPointLogin = "http://localhost:5000/auth/login";
const endPointVerifyToken = "http://localhost:5000/auth/verify_token";

async function register(map) {
  try {
    await axios.post(endPointRegister, map);
    const response = await login(map.email, map.password);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function login(username, password) {
  try {
    const response = await axios.post(endPointLogin, { username, password });
    if (response.status === 200) {
      cookie.setLoginInfo(response.data.email, response.data.token);
      // data contains: status, email, token
      return {
        status: true,
        ...response.data,
      };
    } else {
      return { status: false, data: "Username or Password Incorrect" };
    }
  } catch (error) {
    console.log(error);
    return { status: false, data: error };
  }
}

async function verify_token(token) {
  try {
    const response = await axios.get(endPointVerifyToken, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function logout() {
  cookie.deleteCookie("token");
  cookie.deleteCookie("email");
}

export default { login, register, verify_token, logout };
