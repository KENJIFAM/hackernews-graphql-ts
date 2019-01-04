import { Prisma, User } from './generated/prisma-client';
import jwt from 'jsonwebtoken';
import * as functions from 'firebase-functions';

export interface Context {
  prisma: Prisma;
  request: any;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export const getUserId = (context: Context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, functions.config().app.appsecret) as { userId: string };
    return userId;
  }

  throw new Error('Not authenticated');
};