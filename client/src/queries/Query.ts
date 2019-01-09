import gql from 'graphql-tag';

export const QUERY = {
  FEED: gql`
    query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
      feed(first: $first, skip: $skip, orderBy: $orderBy) {
        links {
          id
          createdAt
          url
          description
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        count
      }
    }
  `,
  FEED_SEARCH: gql`
    query FeedSearchQuery($filter: String!) {
      feed(filter: $filter) {
        links {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
      }
    }
  `
};