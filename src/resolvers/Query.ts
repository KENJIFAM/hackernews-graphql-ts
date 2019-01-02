import { Link } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

export const Query = {
  feed: async (root: unknown, args: Link, context: Context, info: GraphQLResolveInfo) => {
    return context.prisma.links();
  }
};