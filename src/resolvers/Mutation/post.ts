import { Link, LinkPromise } from '../../generated/prisma-client';
import { Context, getUserId } from '../../utils';
import { GraphQLResolveInfo } from 'graphql';

export const post = (root: unknown, { url, description }: Link, context: Context, info: GraphQLResolveInfo): LinkPromise => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};