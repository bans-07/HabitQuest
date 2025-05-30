import { gql } from '@apollo/client'

export const USER = gql`mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      username
    }
  }
}`;

export const addUser = gql`mutation Login($firstName: String!, $lastName: String!, $username: String!, $password: String!, $email: String) {
  addUser(firstName: $firstName, lastName: $lastName, username: $username, password: $password, email: $email) {
    user {
      username
      streak
      lastName
      firstName
      email
      _id
    }
  }
}`;

export const completeChallenge = gql`mutation Login($challengeId: ID!) {
  completeChallenge(challengeId: $challengeId) {
    username
    completedChallenges {
      title
      points
      description
      category
      _id
    }
  }
}`;
