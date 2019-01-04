import { Link, LinkOrderByInput } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

interface Args {
  filter: string;
  skip: number;
  first: number;
  orderBy: LinkOrderByInput;
}

interface Feed {
  links: Link[];
  count: number;
}

export const Query = {
  feed: async (root, { filter, skip, first, orderBy }: Args, context: Context, info: GraphQLResolveInfo): Promise<Feed> => {
    const where = filter ? {
      OR: [
        { description_contains: filter },
        { url_contains: filter }
      ]
    } : {};

    const links = await context.prisma.links({
      where,
      skip,
      first,
      orderBy
    });

    const count = await context.prisma
      .linksConnection({ where })
      .aggregate()
      .count();

    return { links, count };
  }
};