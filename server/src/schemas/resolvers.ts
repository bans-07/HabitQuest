<<<<<<< HEAD:server/schemas/resolvers.ts
import type { IUserContext } from '../interfaces/UserContext';
import type { IUserDocument } from '../interfaces/UserDocument';
import type { IChallenge } from '../interfaces/Challenge';
import type { IBadge } from '../interfaces/Badge';
import { User, Challenge, Badge } from '../models';
import { signToken, AuthenticationError } from '../utils/auth';
import { Types } from 'mongoose';

const resolvers = {
  Query: {
    me: async (
      _parent: unknown,
      _args: unknown,
      context: IUserContext
    ): Promise<IUserDocument | null> => {
      if (!context.user) throw new AuthenticationError('User not authenticated');
=======
import { AuthenticationError } from '../utils/auth.js';
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import Badge from '../models/Badge.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
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
    user: async (_parent: any, { username }: any) => {
      return User.findOne({ username }).populate('completedChallenges').populate('badges');
    },
    challenges: async () => {
      return Challenge.find();
    },
    badges: async () => {
      return Badge.find();
    },
  },
>>>>>>> origin/main:server/src/schemas/resolvers.ts

      const user = await User.findById(context.user._id)
        .populate('completedChallenges')
        .populate('badges')
        .exec();

     
      return user as IUserDocument | null;
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
    
  Mutation: {
<<<<<<< HEAD:server/schemas/resolvers.ts
    login: async (
      _parent: unknown,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username }).exec();
=======
    login: async (_parent: any, { username, password }: any) => {
      const user = await User.findOne({ username });
>>>>>>> origin/main:server/src/schemas/resolvers.ts

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);

      return { token, user: user as unknown as IUserDocument };
    },

<<<<<<< HEAD:server/schemas/resolvers.ts
    addUser: async (
      _parent: unknown,
      args: Partial<IUserDocument>
    ): Promise<{ token: string; user: IUserDocument }> => {
=======
    addUser: async (_parent: any, args: any) => {
>>>>>>> origin/main:server/src/schemas/resolvers.ts
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user: user as unknown as IUserDocument };
    },

<<<<<<< HEAD:server/schemas/resolvers.ts
    completeChallenge: async (
      _parent: unknown,
      { challengeId }: { challengeId: string },
      context: IUserContext
    ): Promise<IUserDocument | null> => {
      if (!context.user) throw new AuthenticationError('User not authenticated');
=======
    completeChallenge: async (_parent: any, { challengeId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError();
>>>>>>> origin/main:server/src/schemas/resolvers.ts

      const user = await User.findById(context.user._id);
      if (!user) throw new AuthenticationError('User not found');

<<<<<<< HEAD:server/schemas/resolvers.ts
      if (!user) throw new Error('User not found');

      const challengeObjectId = new Types.ObjectId(challengeId);

      if (!user.completedChallenges.some((id: Types.ObjectId) => id.equals(challengeObjectId))) {
        user.completedChallenges.push(challengeObjectId);
        await user.save();
      }

      // Using `await user.populate()` (Mongoose 6+ style)
      await (await user.populate('completedChallenges')).populate('badges');

      return user as unknown as IUserDocument;
=======
      if (user && !user?.completedChallenges.includes(challengeId)) {
        user.completedChallenges.push(challengeId);
        await user.save();
      }

      return await user.populate({ path: 'completedChallenges' }).populate({ path: 'badges' });
>>>>>>> origin/main:server/src/schemas/resolvers.ts
    },
  },
}
};

export default resolvers;
