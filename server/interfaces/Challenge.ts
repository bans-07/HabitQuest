import type { Document } from 'mongoose';

export interface IChallenge extends Document {
  _id: string;
  title: string;
category: string;
}

