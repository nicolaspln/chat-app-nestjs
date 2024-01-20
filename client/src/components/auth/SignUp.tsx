import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Auth from "./Auth";

const SignUp = () => {
  return (
    <Auth submitLabel="Sign Up" onSubmit={() => Promise.resolve()}>
      <RouterLink to="/login" style={{ alignSelf: "flex-end" }}>
        <Link>Already have an account? Login!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignUp;
