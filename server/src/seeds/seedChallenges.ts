import mongoose from 'mongoose';
import Category from '../models/Category';
import Challenge from '../models/Challenge';

await mongoose.connect(process.env.MONGODB_URI!);

// Create categories
const healthCategory = await Category.create({ name: 'Health' });
const productivityCategory = await Category.create({ name: 'Productivity' });

// Create challenges
await Challenge.insertMany([
  { title: 'Drink 8 glasses of water', category: healthCategory._id },
  { title: 'Stretch for 10 minutes', category: healthCategory._id },
  { title: 'Plan tomorrow’s to-do list', category: productivityCategory._id },
  { title: 'Clean up your workspace', category: productivityCategory._id },
]);

console.log('Seeded categories and challenges');
process.exit();
