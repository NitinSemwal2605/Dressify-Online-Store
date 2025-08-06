
import UserModel from '../models/userModel.js';


// Add Products to user cart 
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.user?.id; // Getting user ID from request

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Now Check , If userData exists
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Access the user's cartData
        let cartData = userData.cartData || {};
        if (cartData[itemId]) { // If item already exists in the cart then increment the quantity
            cartData[itemId][size] ? cartData[itemId][size]++ : cartData[itemId][size] = 1;
        } else { // If item does not exist in the cart, add it with quantity 1
            cartData[itemId] = { [size]: 1 };
        }

        // Update the user's cart data in the database
        await UserModel.findByIdAndUpdate(userId, { cartData });

        // Send the updated cart as part of the response
        res.status(200).json({ success: true, cart: cartData });
    } catch (error) {
        console.error('Error in addToCart:', error.message);
        res.status(500).json({ message: 'An error occurred while adding to cart', error: error.message });
    }
};


const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;

        // Validate incoming data
        if (!itemId || !size || quantity === undefined) {
            return res.status(400).json({ message: 'Missing required fields: itemId, size, or quantity' });
        }

        const userId = req.user.id; // assuming req.user is set after authentication
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        let cartData = userData.cartData || {};

        if (quantity === 0) {
            // Remove item if quantity is 0
            if (cartData[itemId]) {
                delete cartData[itemId];
            }
        } else {
            // Update or add item
            if (cartData[itemId]) {
                cartData[itemId][size] = quantity;
            } else {
                cartData[itemId] = { [size]: quantity };
            }
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ message: 'Cart updated successfully', cartData });
    } catch (error) {
        console.error('Error updating cart:', error.message);
        res.status(400).json({ message: 'An error occurred while updating the cart', error: error.message });
    }
};





const getCart = async (req, res) => {
    try {
        // Firstly, we need to get the user ID from the request
        const userId = req.user.id; // Ensure authUser middleware sets req.user
        console.log('User ID:', userId);

        // Validate user ID by checking if it exists
        const userData = await UserModel.findById(userId);
        if (!userData) throw new Error('User not found');

        // If userData is found, we can access the cartData
        res.status(200).json({ success: true, cart: userData.cartData || {} }); // Send cart data
    } catch (error) {
        console.error('Error in getCart:', error.message);
        res.status(400).json({ success: false, message: 'Error in getting cart', error: error.message });
    }
};


export { addToCart, getCart, updateCart };
