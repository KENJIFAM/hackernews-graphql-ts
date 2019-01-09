import gql from 'graphql-tag';

export const SUBSCRIPTION = {
  NEW_LINK: gql`
    subscription {
      newLink {
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
  `,
  NEW_VOTE: gql`
    subscription {
      newVote {
        id
        link {
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
        user {
          id
        }
      }
    }
  `
};