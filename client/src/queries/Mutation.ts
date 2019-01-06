import gql from 'graphql-tag';

export const MUTATION = {
  POST: gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        url
        description
      }
    }
  `,
  SIGNUP: gql`
    mutation SignupMuatation($email: String!, $password: String!, $name: String!) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `,
  LOGIN: gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `
};