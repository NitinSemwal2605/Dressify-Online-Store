import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Debugging output
  console.log('Subtotal:', getCartAmount());
  console.log('Delivery Fee:', delivery_fee);

  const subtotal = getCartAmount();
  const shippingFee = typeof delivery_fee === 'number' ? delivery_fee : 0; // Ensure it's a number
  const total = subtotal + shippingFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {shippingFee}.00</p>
        </div>
        <div className="flex justify-between">
          <p>Total</p>
          <p>{currency} {total}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
