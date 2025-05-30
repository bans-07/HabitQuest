import type { Document } from 'mongoose';

export interface IBadge extends Document {
  _id: string;
  name: string;
  description: string;
  icon: string;
}
