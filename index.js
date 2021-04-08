const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = require("./schema");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");
const schemaDirectives = require("./directives");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  schemaDirectives,
  context: ({ req, res }) => ({
    req,
    res,
    prisma,
  }),
});

const app = express();
server.applyMiddleware({
  app,
  path: "/graphql",
});

app.listen({ port: 4000 } , () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);