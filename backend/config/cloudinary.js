import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
}

export default connectCloudinary;

/*

Explaination:
 - connectCloudinary function initializes the Cloudinary configuration using environment variables.
    - It exports the function to be used in other parts of the application.
    - The v2 module from cloudinary is imported to access the Cloudinary API.
    - The function is called in the main server file to ensure Cloudinary is configured before handling requests.

*/