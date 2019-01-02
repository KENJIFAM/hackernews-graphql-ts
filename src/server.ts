import { GraphQLServer } from 'graphql-yoga';
import { prisma, Prisma } from './generated/prisma-client';
import { GraphQLResolveInfo } from 'graphql';

interface Link {
  id: string;
  description: string;
  url: string;
}

export interface Context {
  prisma: Prisma;
  request: any;
}

const resolvers = {
  Query: {
    info: (): string => `This is the API of a Hackernews Clone`,
    feed: (root: unknown, args: Link, context: Context, info: GraphQLResolveInfo) => context.prisma.links()
    // link: (parent: unknown, { id }: Link): Link => links.find(link => link.id === id)
  },

  Mutation: {
    post: (root: unknown, { description, url }: Link, context: Context) => context.prisma.createLink({ url, description })
    // updateLink: (parent: unknown, { id, description, url }: Link) => {
    //   const link = { id, description, url };
    //   links = links.map(l => l.id === link.id ? link : l);
    //   return link;
    // },
    // deleteLink: (parent: unknown, { id }: Link) => {
    //   let link: Link = undefined;
    //   links = links.filter(l => {
    //     if (l.id == id) {
    //       link = l;
    //       return false;
    //     }
    //     return true;
    //   });
    //   return link;
    // }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log('Server is running on port 4000'));