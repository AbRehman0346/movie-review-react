import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import userStore from "./user_redux/user";
import * as cookies from "./services/cookies";
import { addUser } from "./user_redux/actionTypes";

export function PrivateRoutes() {
  const state = userStore.getState();
  if (state.token) {
    return <Outlet />;
  }

  let cookie = cookies.getLoginInfo();
  if (cookie.token) {
    userStore.dispatch(addUser(cookie.email, cookie.token));
    return <Outlet />;
  }

  return <Navigate to={"login"} />;
}

export function ProtectedRoutes() {
  const state = userStore.getState();
  if (!state.token) {
    let cookie = cookies.getLoginInfo();
    if (cookie.token) {
      userStore.dispatch(addUser(cookie.email, cookie.token));
    }
  }

  return <Outlet />;
}
