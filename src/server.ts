import { GraphQLServer } from 'graphql-yoga';

interface Link {
  id: string;
  description: string;
  url: string;
}

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

const resolvers = {
  Query: {
    info: (): unknown => `undefined`,
    feed: () => links
  },

  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('Server is running on port 4000'));