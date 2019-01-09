import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { prisma, Prisma } from './generated/prisma-client';
import resolvers from './resolvers';

dotenv.config();

const typeDefs = `
scalar DateTime

enum LinkOrderByInput {
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
}

type Query {
  info: String!
  feed(filter: String, skip: Int, first: Int, orderBy: LinkOrderByInput): Feed!
}

type Feed {
  links: [Link!]!
  count: Int!
}

type Mutation {
  post(url: String!, description: String!): Link!
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  vote(linkId: ID!): Vote
}

type Link {
  id: ID!
  createdAt: DateTime!
  description: String!
  url: String!
  postedBy: User
  votes: [Vote!]!
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
  links: [Link!]!
}

type Subscription {
  newLink: Link
  newVote: Vote
}

type Vote {
  id: ID!
  link: Link!
  user: User!
}
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request, prisma })
});

server.start(() => console.log(`Server is running on port ${server.options.port}`));