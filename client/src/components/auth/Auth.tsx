import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface AuthProps {
  submitLabel: string;
  children?: React.ReactNode;
  onSubmit: (email: string, password: string) => Promise<void>;
}

const Auth = ({ submitLabel, children, onSubmit }: AuthProps) => {
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
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant={"contained"} onClick={() => onSubmit(email, password)}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
