import { User, Habit } from '../models';
import { IUser } from '../models/User'; // Import interface from its direct source
import { signToken } from '../utils/auth';
import bcrypt from 'bcrypt';
import { IResolvers } from '@graphql-tools/utils';

const resolvers: IResolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return User.findById(context.user._id).populate('habits');
    },
    users: async () => User.find().populate('habits'),
    user: async (_parent, { id }: { id: string }) => User.findById(id).populate('habits'),
    habits: async (_parent, { userId }: { userId: string }) => Habit.find({ user: userId }),
  },

  Mutation: {
    signup: async (
      _parent,
      { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already used');
      const newUser = await User.create({ username, email, password });
      const user = newUser.toObject() as IUser;
      const token = signToken(user);
      return { token, user };
    },

    login: async (
      _parent,
      { email, password }: { email: string; password: string }
    ) => {
      const userDoc = await User.findOne({ email });
      if (!userDoc || !(await bcrypt.compare(password, userDoc.password))) {
        throw new Error('Invalid email or password');
      }
      const user = userDoc.toObject() as IUser;
      const token = signToken(user);
      return { token, user };
    },

    addHabit: async (
      _parent,
      { title, description, frequency }: { title: string; description?: string; frequency?: string },
      context
    ) => {
      if (!context.user) throw new Error('Not authenticated');
      const habit = await Habit.create({
        title,
        description,
        frequency,
        user: context.user._id,
      });
      await User.findByIdAndUpdate(context.user._id, { $push: { habits: habit._id } });
      return habit;
    },

    updateHabit: async (
      _parent,
      { id, ...fields }: { id: string; title?: string; description?: string; frequency?: string },
      context
    ) => {
      if (!context.user) throw new Error('Not authenticated');
      return Habit.findByIdAndUpdate(id, fields, { new: true });
    },

    deleteHabit: async (_parent, { id }: { id: string }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return Habit.findByIdAndDelete(id);
    },
  },
};

export default resolvers;

