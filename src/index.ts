import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import { typeDefs } from './schema';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const handler = app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname , '../public/index.html'));
});

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request, prisma })
});

server.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/playground') || req.path.startsWith('/graphql')) return next();
  handler(req, res, next);
});

server.start({
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/playground'
}, ({ port }) => console.log(`Server is running on port ${port}`));