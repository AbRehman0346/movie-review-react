import Auth from "../../services/mongodb_auth.js";

import * as actionTypes from "../../user_redux/actionTypes";
import userStore from "../../user_redux/user";
export async function dev_login() {
  let username = "ar@gmail.com";
  let password = "8942392";
  if (username && password) {
    return await Auth.login(username, password).then(async (data) => {
      if (data.status) {
        await userStore.dispatch({
          type: actionTypes.ADD_USER,
          payload: {
            email: data.email,
            token: data.token,
          },
        });
        // console.log(`Login Successful: Loged in as ${data.email}`);
        // console.log(`Token: ${data.token}`);
        return data.token;
      } else {
        return "Enter Username or Password";
      }
    });
  } else {
    return "Enter Username or Password";
  }
}
