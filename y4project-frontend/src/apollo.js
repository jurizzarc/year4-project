import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createUploadLink} from "apollo-upload-client";

// Custom link where the files are uploaded to apollo server
const link = createUploadLink({
    uri: "http://localhost:4000/graphql"
});

// Create Apollo client
export const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});