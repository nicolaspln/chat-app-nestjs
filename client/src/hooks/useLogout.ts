import env from "../config/env";

const useLogout = () => {
  const logout = async () => {
    await fetch(`${env.urls.api}/auth/logout`, {
      method: "POST",
    });
  };

  return { logout };
};

export { useLogout };
