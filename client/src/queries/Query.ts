import gql from 'graphql-tag';

export enum QUERY {
  FEED = gql`
    {
      feed {
        links {
          id
          url
          description
        }
      }
    }
  `
}