import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { QueryChatsArgs } from "../gql/graphql";

export const getChatsDocument = graphql(`
  query Chats($offset: Int!, $limit: Int!) {
    chats(offset: $offset, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(getChatsDocument, { variables });
};

export { useGetChats };
