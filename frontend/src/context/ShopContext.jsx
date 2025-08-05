// src/context/shopContext.js
import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {  
    const currency = "₹";
    const deliveryCharge = 50;
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false); 
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]); // New state to hold orders
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Add order to the list of orders
    const addOrder = () => {
        let tempOrders = structuredClone(orders);
        let newOrder = [];

        // Loop through the cartItems to build the order
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    newOrder.push({
                        _id: item,
                        size,
                        quantity: cartItems[item][size],
                    });
                }
            }
        }
        setOrders([...tempOrders, ...newOrder]);
        // Optionally, you can clear cartItems here after placing an order
        // setCartItems({});
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
    
        // Make a copy of the cartItems to update locally
        let cartData = structuredClone(cartItems);
    
        // Update cart data locally
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity if the item is already in the cart
            } else {
                cartData[itemId][size] = 1; // Set quantity to 1 if size is new for the item
            }
        } else {
            cartData[itemId] = {}; // Add new item if it's not already in the cart
            cartData[itemId][size] = 1;
        }
    
        // Set the cart items in the frontend state
        setCartItems(cartData);
    
        // Check if the token exists before making a request
        if (token) {
            try {
                // Send request to the backend to add the item to the cart
                const response = await axios.post(
                    `${backendURL}/api/cart/add`,
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } } // Add Bearer prefix for token
                );
                console.log("Added to Cart:", response.data);
    
                // Check if the backend response is successful and update the frontend cart
                if (response.data.success) {
                    setCartItems(response.data.cart); // Update frontend cart with the backend response
                    toast.success('Item added to cart successfully!');
                } else {
                    toast.error(response.data.message || 'Error adding to cart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
    
                // Optionally, revert to the original state if there's an error
                setCartItems(cartItems); // Revert to previous cart state
    
                toast.error('An error occurred while adding to cart. Please try again.');
            }
        } else {
            toast.error('Authentication token is missing.');
        }
    };
    
    // Get total count of items in the cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    totalCount += cartItems[item][size];
                }
            }
        }
        return totalCount;
    };

    // Update quantity of an item in the cart
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
    
        // Update the cart with the new quantity or remove it if quantity is 0
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId][size] = quantity;
        }
    
        setCartItems(cartData);
    
        if (token) {
            try {
                console.log('Token is : ', token);
                const response = await axios.post(
                    `${backendURL}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("Updated Cart Response:", response.data);
    
                if (response.status === 200) {
                    setCartItems(response.data.cartData);
                    toast.success('Cart updated successfully!');
                } else {
                    toast.error('Error updating cart');
                }
            } catch (error) {
                console.error('Error updating cart:', error.response?.data?.message || error.message);
                toast.error('An error occurred while updating the cart');
                setCartItems(cartItems);
            }
        }
    };
    
    
    
    

    // Fetch user's cart data using POST
    const getUserCart = async (token) => {
        try {
            console.log("Backend URL:", backendURL);

            const response = await axios.post(
                `${backendURL}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } } // Authorization header with Bearer token
            );

            console.log("Fetched Cart Response:", response.data);

            if (response.data.success) {
                setCartItems(response.data.cart); // Update cart items from the response
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data); // Log backend response
            }
            toast.error("An error occurred while fetching cart on frontend");
        }
    };

    // Get the total amount for items in the cart
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const productInfo = products.find((product) => product._id === item);
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        totalAmount += productInfo.price * cartItems[item][size];
                    }
                } catch (error) {
                    console.log('Error calculating amount', error);
                }
            }
        }
        return totalAmount;
    };

    // Fetch products data
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/product/list`);
            console.log("Fetched Products:", response.data);

            if (response.data && response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message || 'Error in fetching products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('An error occurred while fetching products');
        }
    };

    // Initialize the context with products on component mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Get the user's cart if a token exists
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUserCart(storedToken); // Fetch the cart once the token is set
        }
    }, [token]);

    // Context value
    const value = {
        products,
        currency,
        setCartItems,
        deliveryCharge,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        addOrder,
        orders,
        backendURL,
        token,
        setToken,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
