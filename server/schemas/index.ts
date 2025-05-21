// Combines typeDefs and resolvers for the GraphQL schema
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './utils/auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

