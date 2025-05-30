import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

export { typeDefs, resolvers };

import { authMiddleware } from '../utils/auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


