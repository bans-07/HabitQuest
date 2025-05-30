import { gql } from '@apollo/client'

export const QUERY_BADGES = gql`query Query {
  badges {
    _id
    description
    icon
    name
  }
}`;

export const QUERY_CHALLENGES = gql`query Query {
  challenges {
    _id
    category
    description
    points
    title
  }
}`;

export const QUERY_ME = gql`query Query {
  me {
    username
  }
}`;

export const QUERY_USERS = gql`query Query {
  users {
    username
    lastName
    streak
    firstName
    email
    _id
  }
}`;

export const QUERY_USERNAME = gql`query Query($username: String!) {
  user(username: $username) {
    username
    streak
    lastName
    firstName
    email
  }
}`;
