import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./home/Home";
import Chat from "./chat/Chat";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHAT: "/chats",
};

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <SignIn /> },
  { path: ROUTES.SIGNUP, element: <SignUp /> },
  {
    path: `${ROUTES.CHAT}/:_id`,
    element: <Chat />,
  },
]);

export default router;
