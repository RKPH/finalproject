import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice";

export default configureStore({
  reducer: {
    post: postReducer,
  },
});
