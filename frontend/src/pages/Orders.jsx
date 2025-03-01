import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../components/title.jsx";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  const { products = [], currency = "USD", backendURL } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token || !userId) return;

      const response = await axios.post(
        `${backendURL}/api/orders/userOrders`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod || "Unknown",
            date: order.createdAt,
            orderId: order._id,
          }))
        );

        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendURL}/api/orders/updateStatus`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ["Placed", "Packing", "Shipped", "Delivered"];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : currentStatus;
  };

  const handleTrackOrder = (orderId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (nextStatus !== currentStatus) {
      updateOrderStatus(orderId, nextStatus);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token, backendURL]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="pt-16 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders.</p>
      ) : (
        <div>
          {orders.map((order, index) => {
            const productData = products?.find((product) => product._id === order?.productId) || {};

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={order.images?.[0] || "https://via.placeholder.com/80"}
                    alt={order.name || "Product Image"}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="sm:text-base font-medium">{order.name || "Unknown Product"}</p>
                    <div className="flex items-center gap-5 mt-2 text-base text-gray-700">
                      <p>
                        {currency}
                        {order.price || "N/A"}
                      </p>
                      <p>Quantity: {order.quantity}</p>
                      <p>Size: {order.size}</p>
                    </div>
                    <p className="mt-2">
                      Date: <span className="text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    <p className="mt-1 text-gray-500">Payment Method: {order.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex justify-between md:w-1/2">
                  <div className="flex items-center gap-2">
                    <p
                      className={`min-w-2 h-2 rounded-full ${
                        order.status === "Shipped"
                          ? "bg-blue-400"
                          : order.status === "Packing"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                      className="border px-2 py-1 rounded-sm text-gray-700"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm text-gray-700"
                    onClick={() => handleTrackOrder(order.orderId, order.status)}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
