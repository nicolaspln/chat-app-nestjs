import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Auth from "./Auth";

const SignIn = () => {
  return (
    <Auth submitLabel="Login" onSubmit={() => Promise.resolve()}>
      <RouterLink to="/signup" style={{ alignSelf: "flex-end" }}>
        <Link>No account yet? Sign Up!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignIn;
