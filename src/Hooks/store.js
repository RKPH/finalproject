import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice";
import userReducer from  "./UserSlice";


export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
   
  },
});
