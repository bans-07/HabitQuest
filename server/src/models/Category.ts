import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const Category = model('Category', categorySchema);
export default Category;
