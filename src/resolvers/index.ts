import { Query } from './Query';
import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { Link } from './Link';
import { User } from './User';

export default {
  Query,
  Mutation: {
    ...auth,
    post
  },
  Link,
  User
};