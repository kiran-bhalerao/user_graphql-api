import { GraphQLServer } from "graphql-yoga";
import { resolvers, fragmentReplacements } from "./resolvers/index";
import prisma from "./prisma";

const server = new GraphQLServer({
  typeDefs: "src/schema/schema.graphql",
  resolvers,
  context(request) {
    return {
      request,
      prisma
    };
  },
  fragmentReplacements
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log("Server is started")
);
