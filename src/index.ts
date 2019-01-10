import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import { typeDefs } from './schema';

dotenv.config();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request, prisma })
});

server.start({
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/playground'
}, ({ port }) => console.log(`Server is running on port ${port}`));