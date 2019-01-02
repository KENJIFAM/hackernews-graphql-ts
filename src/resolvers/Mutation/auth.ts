import { User } from '../../generated/prisma-client';
import { Context } from '../../utils';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const auth = {
  signup: async (root: unknown, args: User, context: Context, info: GraphQLResolveInfo) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, 'APP_SECRET');
    return { token, user };
  },

  login: async (root: unknown, { email, password }: User, context: Context, info: GraphQLResolveInfo) => {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, 'APP_SECRET');
    return { token, user };
  }
};