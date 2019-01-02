import { User as IUser, FragmentableArray, Link } from '../generated/prisma-client';
import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';

export const User = {
  links: ({ id }: IUser, args: unknown, context: Context, info: GraphQLResolveInfo): FragmentableArray<Link> => {
    return context.prisma.user({ id }).links();
  }
};