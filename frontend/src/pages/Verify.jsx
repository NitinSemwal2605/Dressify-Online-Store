import axios from "axios";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";

const Verify = () => {
  const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams] = useSearchParams(); 

  const success = searchParams.get("success") || searchParams.get("success=true");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!token) {
        console.warn("Token is missing! User might not be authenticated.");
        return;
      }

      if (!success || !orderId) {
        console.warn("Missing success or orderId query parameters!");
        return;
      }

      console.log("Verifying payment with:", { success, orderId });

      try {
        const response = await axios.post(
          `${backendURL}/api/orders/verifyStripe`, 
          { success, orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Verify Payment Response:", response.data);

        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error("Payment verification failed! Redirecting to cart.");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error verifying payment:", error.response?.data || error.message);
        toast.error("Payment verification failed! Please try again.");
      }
    };

    verifyPayment();
  }, [token, success, orderId, navigate, setCartItems, backendURL]);

  return <div>Verifying payment...</div>;
};

export default Verify;
