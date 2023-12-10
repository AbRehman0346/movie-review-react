export const ADD_USER = "setUser";

export function addUser(email, token) {
  return {
    type: ADD_USER,
    payload: {
      email,
      token,
    },
  };
}
