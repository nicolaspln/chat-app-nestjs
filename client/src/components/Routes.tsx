import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const router = createBrowserRouter([
  { path: "/login", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
