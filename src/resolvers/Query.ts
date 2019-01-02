import { Link, LinkOrderByInput } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

interface Args {
  filter: string;
  skip: number;
  first: number;
  orderBy: LinkOrderByInput;
}

export const Query = {
  feed: async (root: unknown, { filter, skip, first, orderBy }: Args, context: Context, info: GraphQLResolveInfo): Promise<Link[]> => {
    const where = filter ? {
      OR: [
        { description_contains: filter },
        { url_contains: filter }
      ]
    } : {};
    const links = await context.prisma.links({ where, skip, first, orderBy });
    return links;
  }
};