import gql from 'graphql-tag';

export const QUERY = {
  FEED: gql`
    {
      feed {
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