import excludedRoutes from "../../config/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: me, loading, error } = useGetMe();
  console.log("user", me, loading, error);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : me && children}
    </>
  );
};

export default Guard;
