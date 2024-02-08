import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";

const SignUp = () => {
  const [createUser, { loading: createLoading }] = useCreateUser();
  const { login, loading: loginLoading } = useLogin();
  const [error, setError] = useState<string>();

  const loading = createLoading || loginLoading;

  const handleSubmit = async ({ email, password }: SignUpRequest) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            password,
          },
        },
      });
      await login({ email, password });

      setError("");
    } catch (error) {
      const errorMessage = extractErrorMessage(error);

      if (errorMessage) {
        setError(errorMessage);
        return;
      }
      setError("An error occurred.");
    }
  };

  return (
    <Auth
      error={error}
      loading={loading}
      submitLabel="Sign up"
      onSubmit={handleSubmit}
    >
      <RouterLink to="/login" style={{ alignSelf: "flex-end" }}>
        <Link>Already have an account? Login!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignUp;
