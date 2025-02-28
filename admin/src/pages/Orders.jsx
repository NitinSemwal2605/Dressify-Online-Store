import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Authentication required! Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error("Failed to fetch orders. Please try again.");
      }
    } catch (error) {
      toast.error("Error fetching orders. Check your connection.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Order status updated successfully');

        // Update state locally to reflect changes immediately
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error('Failed to update order status. Try again.');
      }
    } catch (error) {
      toast.error('Error updating order status. Please check your connection.');
      console.error("Error updating order status:", error);
    }
  };

  // Format the date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h3 className="text-2xl font-bold mb-6">Orders Page</h3>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div>
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm text-gray-700 rounded-lg shadow-sm"
              >
                <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12" />

                <div>
                  <h4 className="font-semibold">Items:</h4>
                  {order.items?.map((item, idx) => (
                    <p key={item._id || idx}>
                      {item.name} x {item.quantity}{' '}
                      <span>{item.size}{idx !== order.items.length - 1 && ','}</span>
                    </p>
                  ))}
                  <p>
                    Name: {order.address?.FirstName} {order.address?.LastName}
                  </p>
                  <p>Address: {order.address?.Street}</p>
                  <p>
                    {order.address?.City}, {order.address?.State}, {order.address?.Country} - {order.address?.Zip}
                  </p>
                  <p>Phone: {order.address?.Phone}</p>
                </div>

                <div>
                  <p>Items: {order.items?.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {formatDate(order.date)}</p>
                </div>

                <p className="font-semibold">{currency}{order.amount}</p>

                <select
                  value={order.status || 'Order Placed'}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
