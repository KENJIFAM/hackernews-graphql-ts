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
  `
};