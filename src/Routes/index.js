
import Home from "../Pages/Homepage";
import PostPage from "../Pages/Postpage";
import UploadPost from "../Pages/Uploadpost";
import UserAccount from "../Pages/UserAccount";
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/post/:id", component: PostPage },
  {path:'/upload', component: UploadPost},
  {path:'/user/:id', component: UserAccount},
  { path: "/user/:userId/post/:postId", component: PostPage },
];
