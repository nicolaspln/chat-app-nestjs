import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface Credentials {
  email: string;
  password: string;
}

interface AuthProps {
  submitLabel: string;
  children?: React.ReactNode;
  onSubmit: (credentials: Credentials) => Promise<void>;
  error?: string;
  loading?: boolean;
}

const Auth = ({
  submitLabel,
  error,
  children,
  loading,
  onSubmit,
}: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        error={!!error}
        helperText={error}
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        error={!!error}
        helperText={error}
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        disabled={loading || !email || !password}
        variant={"contained"}
        onClick={() => onSubmit({ email, password })}
      >
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
