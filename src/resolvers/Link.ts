import { Link as ILink, UserPromise, FragmentableArray, Vote } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

export const Link = {
  postedBy: ({ id }: ILink, args: unknown, context: Context, info: GraphQLResolveInfo): UserPromise => {
    return context.prisma.link({ id }).postedBy();
  },
  votes: ({ id }: ILink, args: unknown, context: Context, info: GraphQLResolveInfo): FragmentableArray<Vote> => {
    return context.prisma.link({ id }).votes();
  }
};