import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";

const SignUp = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Sign up"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <RouterLink to="/login" style={{ alignSelf: "flex-end" }}>
        <Link>Already have an account? Login!</Link>
      </RouterLink>
    </Auth>
  );
};

export default SignUp;
