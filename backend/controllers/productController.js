
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';


// Function for add products 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Check if files are uploaded correctly
        const image1 = req.files?.image1 ? req.files.image1[0].path : null;
        const image2 = req.files?.image2 ? req.files.image2[0].path : null;
        const image3 = req.files?.image3 ? req.files.image3[0].path : null;
        const image4 = req.files?.image4 ? req.files.image4[0].path : null;


        const images = [image1, image2, image3, image4].filter((item) => item !== null);

        console.log(name , description, price, category, subCategory, sizes, bestseller);
        console.log(images);

        // Upload to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // console.log(imagesUrl);

        const productData = {
            name,
            description,
            price : Number(price),
            category,
            subCategory,
            bestseller : bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date : Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: 'Product added successfully'});
        
    } catch (error) {
        console.log(error);
        res.json({sucess: false, message: error.message});
    }
};



// Function for list all products
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({success: true, products});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}


// Function for removing product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params for id
        console.log("Deleting Product ID:", id); // Add logs for debugging
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, message: 'Product removed successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



// function for single product info
const singleProduct = async (req, res) => {
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});

    }
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}



export { addProduct, listProducts, removeProduct, singleProduct };
