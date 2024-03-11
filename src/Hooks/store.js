import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice";
import userReducer from  "./UserSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    auth: authReducer, // Include authReducer for authentication state
  },
});
