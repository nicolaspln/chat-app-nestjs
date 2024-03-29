import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import env from "./env";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
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

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${env.urls.ws}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(logoutLink, splitLink),
});

export default client;
