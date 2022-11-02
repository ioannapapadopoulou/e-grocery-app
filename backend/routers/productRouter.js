import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const title = req.query.title || '';
    const category = req.query.category || '';

    const titleFilter = title
      ? { title: { $regex: title, $options: 'i' } }
      : {};
    const categoryFilter = category ? { category } : {};

    const products = await Product.find({
      ...titleFilter,
      ...categoryFilter,
    });
    res.send(products);
  }),
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  }),
);

productRouter.get(
  '/sales',
  expressAsyncHandler(async (req, res) => {
    const salesCat = await Product.find({ category: 'Sales' });
    res.send(salesCat);
  }),
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  }),
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      pk: 0,
      category: 'Category Of Product',
      title: 'Title' + Date.now(),
      image: 'https://spoonacular.com/productImages/83904-312x231.jpg',
      ingredient: 'Ingredients Of Product',
      percentProtein: 0,
      percentFat: 0,
      percentCarbs: 0,
      description: 'Description Of Product',
      calories: 0,
      fat: 0,
      price: 0,
      countInStock: 0,
      sales: 0,
    });
    const createdProduct = await product.save();
    res.send({
      message: 'Product Created',
      product: createdProduct,
    });
  }),
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.pk = req.body.pk;
      (product.category = req.body.category),
        (product.title = req.body.title),
        (product.image = req.body.image),
        (product.ingredient = req.body.ingredient),
        (product.percentProtein = req.body.percentProtein),
        (product.percentFat = req.body.percentFat),
        (product.percentCarbs = req.body.percentCarbs),
        (product.description = req.body.description),
        (product.calories = req.body.calories),
        (product.fat = req.body.fat),
        (product.price = req.body.price),
        (product.countInStock = req.body.countInStock),
        (product.sales = req.body.sales);
      const updatedProduct = await product.save();
      res.send({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } else {
      res.status(404).send({ message: 'Product not Found!' });
    }
  }),
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found ' });
    }
  }),
);

export default productRouter;
