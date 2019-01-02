import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { prisma, Prisma } from './generated/prisma-client';
import resolvers from './resolvers';

dotenv.config();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({ ...request, prisma })
});

server.start(() => console.log('Server is running on port 4000'));