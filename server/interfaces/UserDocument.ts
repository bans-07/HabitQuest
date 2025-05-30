import type { Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  completedChallenges: string[];
  badges: string[];
  isCorrectPassword(password: string): Promise<boolean>;
}

