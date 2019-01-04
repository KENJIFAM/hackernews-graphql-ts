import { Query } from './Query';
import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { Link } from './Link';
import { User } from './User';
import { Subscription } from './Subscription';
import { vote } from './Mutation/vote';
import { Vote } from './Vote';

export default {
  Query,
  Mutation: {
    ...auth,
    post,
    vote
  },
  Subscription,
  Link,
  User,
  Vote
};