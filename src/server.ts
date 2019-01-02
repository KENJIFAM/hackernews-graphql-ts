import { GraphQLServer } from 'graphql-yoga';

interface Link {
  id: string;
  description: string;
  url: string;
}

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: (): string => `undefined`,
    feed: (): Link[] => links,
    link: (parent: unknown, { id }: Link): Link => links.find(link => link.id === id)
  },

  Mutation: {
    post: (parent: unknown, { description, url }: Link) => {
      const link = {
        id: `link-${idCount++}`,
        description: description,
        url: url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent: unknown, { id, description, url }: Link) => {
      const link = { id, description, url };
      links = links.map(l => l.id === link.id ? link : l);
      return link;
    },
    deleteLink: (parent: unknown, { id }: Link) => {
      let link: Link = undefined;
      links = links.filter(l => {
        if (l.id == id) {
          link = l;
          return false;
        }
        return true;
      });
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on port 4000'));