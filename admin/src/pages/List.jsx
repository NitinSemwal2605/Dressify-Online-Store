import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { backendUrl, currency } from "../App";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log("Backend URL:", backendUrl + "/api/product/list");
      console.log(response.data); // Check the structure of the response

      if (response.data && response.data.success && Array.isArray(response.data.products)) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      toast.error(err.message || "An error occurred while fetching the list.");
    }
  };

  const removeProduct = async (id) => {
    try {
      // Make a DELETE request 
      console.log("id", id);
      const response = await axios.delete(backendUrl + "/api/product/remove/" + id, { headers: { token } });

      console.log(response.data); // Check the response from the backend
      if (response.data && response.data.success) {
        toast.success("Product removed successfully!");
        // Filter out the removed product from the list for immediate UI update
        setList(list.filter(item => item._id !== id));
      } else {
        toast.error(response.data.message || "Failed to remove the product.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred while removing the product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-xl font-semibold text-center text-gray-800">All Products List</p>
      <div className="flex flex-col gap-3">

        {/* List Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border-b bg-gray-200 text-sm text-gray-700">
          <b className="text-center">Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div 
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-2 px-3 border-b hover:bg-gray-50 transition-all duration-200 ease-in-out"
            >
              <img className="w-12 h-12 object-cover rounded-md" src={item.images && item.images[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p 
                onClick={() => removeProduct(item._id)} 
                className="text-center cursor-pointer text-lg text-red-500 hover:text-red-700 transition-all duration-200"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No products available.</p>
        )}
      </div>
    </>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
