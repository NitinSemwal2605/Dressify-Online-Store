import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {  // Renamed from `image` to `images` for clarity
        type: [String],  // Specify an array of strings to hold URLs
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: [String],  // Explicitly define as an array of strings
        required: true
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now  // Adds a default date if none is provided
    }
});

// Model initialization with the corrected check
const ProductModel = mongoose.models.product || mongoose.model('product', productSchema);

export default ProductModel;
