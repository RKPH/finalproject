import Home from "../Pages/Homepage";
import PostPage from "../Pages/Postpage";
import UploadPost from "../Pages/Uploadpost";

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/posts/:id", component: PostPage },
  {path:'/upload', component: UploadPost}
];
