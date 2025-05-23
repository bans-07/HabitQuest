import { AuthenticationError } from '../utils/auth.js';
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import Badge from '../models/Badge.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        return User.findById(context.user._id)
          .populate('completedChallenges')
          .populate('badges');
      }
      throw new AuthenticationError();
    },
    users: async () => {
      return User.find().populate('completedChallenges').populate('badges');
    },
    user: async (_parent, { username }) => {
      return User.findOne({ username }).populate('completedChallenges').populate('badges');
    },
    challenges: async () => {
      return Challenge.find();
    },
    badges: async () => {
      return Badge.find();
    },
  },

  Mutation: {
    login: async (_parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }

      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    completeChallenge: async (_parent, { challengeId }, context) => {
      if (!context.user) throw new AuthenticationError();

      const user = await User.findById(context.user._id);

      if (!user?.completedChallenges.includes(challengeId)) {
        user.completedChallenges.push(challengeId);
        await user.save();
      }

      return user.populate('completedChallenges').populate('badges');
    },
  },
};

export default resolvers;
