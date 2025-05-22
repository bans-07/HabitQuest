import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User'; 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/habitquest'); // replace if using env vars

const seedUsers = async () => {
  try {
    await User.deleteMany(); 

    const users = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: '123',
        password: await bcrypt.hash('456', 10),
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        username: '321',
        password: await bcrypt.hash('789', 10),
      },
    
    ];

    await User.insertMany(users);
    console.log('✅ Users seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
