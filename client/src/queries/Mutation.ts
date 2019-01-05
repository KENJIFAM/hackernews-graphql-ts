import gql from 'graphql-tag';

export enum MUTATION {
  POST = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        url
        description
      }
    }
  `
}