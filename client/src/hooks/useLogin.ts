import { useState } from "react";
import env from "../config/env";
import client from "../config/apollo-client";
import { LoginRequest } from "../typings/auth/LoginRequest";
import { UNKNOWN_ERROR_MESSAGE } from "../utils/errors";

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
          setError(UNKNOWN_ERROR_MESSAGE);
        }
        return;
      }
      await client.refetchQueries({ include: "active" });

      setError("");
    } catch (e) {
      setError(UNKNOWN_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, login };
};

export { useLogin };
