import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import adminAuth from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';

const productRouter = express.Router();

// Route for adding a product with image uploads
productRouter.post('/add',adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);


productRouter.get('/list', listProducts);
productRouter.delete('/remove/:id', adminAuth, removeProduct);
productRouter.post('/single/', singleProduct);

export default productRouter;
