import { Link as RouterLink } from "react-router-dom";
import { Link, TextField } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { UNKNOWN_ERROR_MESSAGE, extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { CreateUserInput } from "../../gql/graphql";

const SignUp = () => {
  const [createUser, { loading: createLoading }] = useCreateUser();
  const { login, loading: loginLoading } = useLogin();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string>();

  const loading = createLoading || loginLoading;

  const handleSubmit = async ({
    email,
    password,
  }: Omit<CreateUserInput, "username">) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            username,
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
      setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <Auth
      error={error}
      loading={loading}
      submitLabel="Sign up"
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!error}
          helperText={error}
        />,
      ]}
      onSubmit={handleSubmit}
    >
      <RouterLink to="/login" style={{ alignSelf: "flex-end" }}>
        <Link>Already have an account? Login!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignUp;
