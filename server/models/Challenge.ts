import { Schema, model, Types } from 'mongoose';

const challengeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
  },
  isDaily: {
    type: Boolean,
    default: true,
  },
  dateAvailable: {
    type: Date,
    default: Date.now,
  },
});

const Challenge = model('Challenge', challengeSchema);
export default Challenge;
