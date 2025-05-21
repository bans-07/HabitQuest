// GraphQL type definitions go here
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String
    completedChallenges: [Challenge]
    badges: [Badge]
    streak: Int
  }

  type Challenge {
    _id: ID!
    title: String!
    description: String
    category: String
    points: Int
  }

  type Badge {
    _id: ID!
    name: String!
    description: String
    icon: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    challenges: [Challenge]
    badges: [Badge]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      password: String!
      email: String
    ): Auth
    completeChallenge(challengeId: ID!): User
  }
`;

export default typeDefs;
