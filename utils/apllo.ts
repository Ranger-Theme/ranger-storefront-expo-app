import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_URL = "http://82.157.172.168/graphql";

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
  useGETForQueries: true,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
