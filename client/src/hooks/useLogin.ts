import { useState } from "react";
import env from "../config/env";
import client from "../config/apollo-client";
import { LoginRequest } from "../typings/auth/LoginRequest";

const useLogin = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const login = async (request: LoginRequest) => {
    setLoading(true);

    try {
      const res = await fetch(`${env.urls.api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Invalid credentials.");
        } else {
          setError("An error occurred.");
        }
        return;
      }
      await client.refetchQueries({ include: "active" });

      setError("");
    } catch (e) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, login };
};

export { useLogin };
