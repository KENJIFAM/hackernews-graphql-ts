import { Context } from '../utils';
import { GraphQLResolveInfo } from 'graphql';
import { LinkSubscriptionPayload } from '../generated/prisma-client';

export const Subscription = {
  newLink: {
    subscribe: (parent: unknown, args: unknown, context: Context, info: GraphQLResolveInfo) => {
      return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
    },
    resolve: (payload: LinkSubscriptionPayload) => payload
  },
  newVote: {
    subscribe: (parent: unknown, args: unknown, context: Context, info: GraphQLResolveInfo) => {
      return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
    },
    resolve: (payload: LinkSubscriptionPayload) => payload
  }
};