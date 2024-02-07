import { ApolloClient, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import env from "./env";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";

const logoutLink = onError((error) => {
  if (
    Array.isArray(error.graphQLErrors) &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors.some(
      (e) => e?.extensions?.originalError?.statusCode === 401
    )
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      router.navigate("/login");
      client.resetStore();
    }
  }
});

const httpLink = new HttpLink({ uri: `${env.urls.api}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(logoutLink, httpLink),
});

export default client;
