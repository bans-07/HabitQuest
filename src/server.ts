import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from '../schemas';
import { getContext } from '../utils/auth'; // <- Named import for Apollo
import db from '../config/connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext, // ✅ Use getContext directly
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('🚀 HabitQuest GraphQL API is running!');
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

db.once('open', startServer);




