import { Schema, model } from 'mongoose';

const badgeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: String, 
  description: String,
  unlockCriteria: String, // e.g., "Complete 10 challenges"
});

const Badge = model('Badge', badgeSchema);
export default Badge;
