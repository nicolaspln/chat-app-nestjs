import router from "../components/Routes";
import client from "../config/apollo-client";

const onLogout = () => {
  router.navigate("/login");
  client.resetStore();
};

export { onLogout };
