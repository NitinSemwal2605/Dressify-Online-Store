import axios from 'axios';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, products, deliveryCharge, getCartAmount, setCartItems, token, backendURL } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Street: '',
    City: '',
    State: '',
    Zipcode: '',
    Country: '',
    Phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key].trim()) {
        toast.error(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = JSON.parse(JSON.stringify(products.find((product) => product._id === productId)));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (!orderItems.length) {
        toast.error("Your cart is empty!");
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user._id : null;

      if (!userId) {
        toast.error("User is not authenticated!");
        return;
      }

      let orderData = {
        userId,
        items: orderItems,
        amount: getCartAmount() + deliveryCharge,
        address: formData,
      };

      if (paymentMethod === 'cod') {
        const response = await axios.post(
          `${backendURL}/api/orders/place`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error('Error placing order. Please try again.');
        }
      } else if (paymentMethod === 'stripe') {
        const responseStripe = await axios.post(
          `${backendURL}/api/orders/stripe`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (responseStripe.data.success) {
          const { session_url } = responseStripe.data;
          if (session_url) {
            window.location.href = session_url;
          } else {
            toast.error('Error: Stripe session URL is missing!');
          }
        } else {
          toast.error('Error processing payment. Please try again.');
        }
      } else {
        toast.error("Please select a valid payment method.");
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error processing order. Please try again.');
    }
  };

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <ToastContainer />

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            required
            type={key === 'Email' ? 'email' : key === 'Phone' ? 'tel' : 'text'}
            name={key}
            placeholder={key.replace(/([A-Z])/g, ' $1')}
            value={formData[key]}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        ))}
      </div>

      <div className="mt-8">
        <CartTotal />
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="flex flex-col lg:flex-row gap-4">
          {['stripe', 'razorpay', 'cod'].map((method) => (
            <div key={method} onClick={() => setPaymentMethod(method)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === method ? 'bg-green-400' : ''}`}></p>
              {method !== 'cod' ? (
                <img className="h5 mx-4" src={assets[`${method}_logo`]} alt={`${method} Logo`} />
              ) : (
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full text-end mt-8">
          <button type="button" onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;