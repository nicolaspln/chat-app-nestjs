import { ApolloClient, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import env from "./env";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { UNKNOWN_ERROR_TOAST } from "../utils/errors";
import { toastVar } from "./toast";

const logoutLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
    if (
      Array.isArray(graphQLErrors) &&
      graphQLErrors.length > 0 &&
      graphQLErrors.some(
        (e) => e?.extensions?.originalError?.statusCode === 401
      )
    ) {
      if (!excludedRoutes.includes(window.location.pathname)) {
        onLogout();
      }
    }
  }
);

const httpLink = new HttpLink({ uri: `${env.urls.api}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(logoutLink, httpLink),
});

export default client;
