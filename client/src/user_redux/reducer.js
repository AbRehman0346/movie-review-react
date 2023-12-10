import * as actionTypes from "./actionTypes";
export const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
