import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

// Global Variables
const currency = 'INR';
const shippingPrice = 40;

// Gateway Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Validate userId
        const userExists = await UserModel.findById(userId);
        if (!userExists) {
            return res.status(400).json({ success: false, message: "Invalid userId. User not found." });
        }

        // Check if cart is empty
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order cannot be placed with an empty cart." });
        }

        const orderData = {
          userId,
          items,
          address,
          amount,
          paymentMethod: "COD",
          payment: false, 
        };

        // Save the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        console.log('New Order Placed:', JSON.stringify(newOrder, null, 2));

        // Clear the user's cart after placing the order
        await UserModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: "Something went wrong while placing the order." });
    }
};

// Placing orders using Stripe Payment Gateway
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map(item => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: 'Delivery Charges' },
        unit_amount: shippingPrice * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: "Something went wrong while placing the order." });
  }
};

const verifyStripe = async (req, res) => {
  const {orderId, success, userId} = req.body;

  try{
    if(success === 'true'){
      await orderModel.findByIdAndUpdate(orderId, {payment: true});
      await UserModel.findByIdAndUpdate(userId, {cartData: {}});
      res.json({success: true, message: 'Order placed successfully'});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success: false, message: 'Order failed'});
    }
  }
  catch(error){
    console.error('Error verifying order:', error);
    res.status(500).json({success: false, message: "Something went wrong while verifying the order."});
  }
};

const placeOrderRazor = async (req, res) => {
  // Razorpay payment logic goes here
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: "Something went wrong while fetching all orders." });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: "Something went wrong while fetching user orders." });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'Order ID and status are required.' });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while updating order status' });
  }
};

export { verifyStripe, allOrders, placeOrder, placeOrderRazor, placeOrderStripe, updateStatus, userOrders };
