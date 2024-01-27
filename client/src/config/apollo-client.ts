import { ApolloClient, InMemoryCache } from "@apollo/client";
import env from "./env";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${env.urls.api}/graphql`,
});

export default client;
