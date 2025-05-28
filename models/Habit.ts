import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHabit extends Document {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  user: mongoose.Types.ObjectId;
  completedDates: Date[];
  currentStreak: number;
  goal?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const habitSchema: Schema<IHabit> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      required: true,
      enum: ['daily', 'weekly', 'monthly'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    completedDates: {
      type: [Date],
      default: [],
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    goal: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Habit: Model<IHabit> = mongoose.model<IHabit>('Habit', habitSchema);
export default Habit;
