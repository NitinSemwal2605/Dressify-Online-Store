import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, addOrder } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  // Convert cartItems object to an array of items with their sizes and quantities.
  // This will be used to render the cart items.
  useEffect(() => {
    let tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-14 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      {/* Map through cartData to display each item */}
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productsData = products.find((product) => product._id === item._id);

            if (!productsData) {
              return (
                <div key={index} className="py-3 border-b border-t text-gray-700">
                  <p>Product not found</p>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="py-3 border-b border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={productsData.images?.[0] || "placeholder.jpg"}
                    alt={productsData.name || "Product"}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{productsData.name || "Product Name"}</p>

                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productsData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 ">{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      updateQuantity(item._id, item.size, newQuantity);
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Remove Item"
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-5">Your cart is empty.</div>
        )}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                if (cartData.length > 0) {
                  navigate("/place-order");
                  addOrder();
                } else {
                  alert("Your cart is empty!");
                }
              }}
              className="my-8 px-8 py-3 bg-black text-white text-sm hover:bg-gray-800"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

