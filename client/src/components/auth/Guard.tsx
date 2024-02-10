import { useEffect } from "react";
import excludedRoutes from "../../config/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../config/authenticated";
import { toastVar } from "../../config/toast";
import { UNKNOWN_ERROR_TOAST } from "../../utils/errors";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: me, error } = useGetMe();

  useEffect(() => {
    if (me) {
      authenticatedVar(true);
    }
  }, [me]);

  useEffect(() => {
    if (error?.networkError) {
      toastVar(UNKNOWN_ERROR_TOAST);
    }
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : me && children}
    </>
  );
};

export default Guard;
