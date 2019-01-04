import { Context, getUserId } from '../../utils';
import { GraphQLResolveInfo } from 'graphql';
import { Vote } from '../../generated/prisma-client';

export const vote = async (root, { linkId }: { linkId: string}, context: Context, info: GraphQLResolveInfo): Promise<Vote> => {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId},
    link: { id: linkId}
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${linkId}`);
  }
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};