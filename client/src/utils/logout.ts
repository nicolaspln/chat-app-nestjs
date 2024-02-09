import router from "../components/Routes";
import client from "../config/apollo-client";
import { authenticatedVar } from "../config/authenticated";

const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
};

export { onLogout };
