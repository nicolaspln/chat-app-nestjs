import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./home/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
