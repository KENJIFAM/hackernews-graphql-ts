import gql from 'graphql-tag';

export const SUBSCRIPTION = {
  NEW_LINK: gql`
    subscription {
      newLink {
        node {
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