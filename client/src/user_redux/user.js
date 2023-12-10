import { createStore } from "redux";
import { reducer } from "./reducer";

const userStore = createStore(reducer);

export default userStore;
