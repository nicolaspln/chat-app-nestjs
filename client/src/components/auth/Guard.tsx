import { useEffect } from "react";
import excludedRoutes from "../../config/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../config/authenticated";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: me } = useGetMe();

  useEffect(() => {
    if (me) {
      authenticatedVar(true);
    }
  }, [me]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : me && children}
    </>
  );
};

export default Guard;
