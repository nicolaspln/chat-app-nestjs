import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/useLogin";
import { LoginRequest } from "../../typings/auth/LoginRequest";

const SignIn = () => {
  const { login, error, loading } = useLogin();

  const handleSubmit = (request: LoginRequest) => login(request);

  return (
    <Auth
      error={error}
      loading={loading}
      submitLabel="Login"
      onSubmit={handleSubmit}
    >
      <RouterLink to="/signup" style={{ alignSelf: "flex-end" }}>
        <Link>No account yet? Sign Up!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignIn;
