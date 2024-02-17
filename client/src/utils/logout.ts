import router, { ROUTES } from "../components/Routes";
import client from "../config/apollo-client";
import { authenticatedVar } from "../config/authenticated";

const onLogout = () => {
  authenticatedVar(false);
  router.navigate(ROUTES.LOGIN);
  client.resetStore();
};

export { onLogout };
