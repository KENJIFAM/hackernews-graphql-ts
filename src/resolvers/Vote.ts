import { Vote as IVote, Link, User } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

export const Vote = {
  link: ({ id }: IVote, args: unknown, context: Context, info: GraphQLResolveInfo): Link => {
    return context.prisma.vote({ id }).link();
  },

  user: ({ id }: IVote, args: unknown, context: Context, info: GraphQLResolveInfo): User => {
    return context.prisma.vote({ id }).user();
  }
};