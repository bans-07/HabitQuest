import type { IUserContext } from '../interfaces/UserContext';
import type { IUserDocument } from '../interfaces/UserDocument';
import type { IChallenge } from '../interfaces/Challenge';
import type { IBadge } from '../interfaces/Badge';
import { User, Challenge, Badge } from '../models';
import { signToken, AuthenticationError } from '../utils/auth';
import { Types } from 'mongoose';


const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('completedChallenges')
          .populate('badges');
        return user as IUserDocument | null;
      }
      throw new AuthenticationError();
    },
    users: async (): Promise<IUserDocument[]> => {
      const users = await User.find()
        .populate('completedChallenges')
        .populate('badges')
        .exec();

      return users as unknown as IUserDocument[];
    },
    user: async (
      _parent: unknown,
      { username }: { username: string }
    ): Promise<IUserDocument | null> => {
      const user = await User.findOne({ username })
        .populate('completedChallenges')
        .populate('badges')
        .exec();

      return user as IUserDocument | null;
    },
    challenges: async (): Promise<IChallenge[]> => {
      const challenges = await Challenge.find().exec();
      return challenges as unknown as IChallenge[];
    },
    badges: async (): Promise<IBadge[]> => {
      const badges = await Badge.find().exec();
      return badges as unknown as IBadge[];
    },
  },
    

  Mutation: {
    login: async (
      _parent: unknown,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username }).exec();

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);

      return { token, user: user as unknown as IUserDocument };
    },

    addUser: async (
      _parent: unknown,
      args: Partial<IUserDocument>
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user: user as unknown as IUserDocument };
    },

    completeChallenge: async (
      _parent: unknown,
      { challengeId }: { challengeId: string },
      context: IUserContext
    ): Promise<IUserDocument | null> => {
      if (!context.user) throw new AuthenticationError('User not authenticated');

      const user = await User.findById(context.user._id);
      if (!user) throw new AuthenticationError('User not found');

      if (!user) throw new Error('User not found');

      const challengeObjectId = new Types.ObjectId(challengeId);

      if (!user.completedChallenges.some((id: Types.ObjectId) => id.equals(challengeObjectId))) {
        user.completedChallenges.push(challengeObjectId);
        await user.save();
      }

      // Using `await user.populate()` (Mongoose 6+ style)
      await (await user.populate('completedChallenges')).populate('badges');

      return user as unknown as IUserDocument;
    },
  },
};


export default resolvers;
