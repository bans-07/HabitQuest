import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    habits: [Habit]
  }

  type Habit {
    _id: ID!
    title: String!
    description: String
    frequency: String
    createdAt: String
    user: User!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    user(id: ID!): User
    habits(userId: ID!): [Habit]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth

    addHabit(title: String!, description: String, frequency: String): Habit
    updateHabit(id: ID!, title: String, description: String, frequency: String): Habit
    deleteHabit(id: ID!): Habit
  }
`;

export default typeDefs;
