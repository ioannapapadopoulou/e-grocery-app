import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    pk: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, require: true },
    image: { type: String, required: true },
    ingredient: { type: String },
    percentProtein: { type: Number },
    percentFat: { type: Number },
    percentCarbs: { type: Number },
    description: { type: String, required: true },
    calories: { type: Number },
    fat: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    sales: { type: Number, required: true },
    // subcategory: { type: String },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
