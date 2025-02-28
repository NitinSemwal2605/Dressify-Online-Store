import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-hot-toast';

const Add = ({token }) => {
  // State for images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // State for other product details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setsubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // Handler for image changes
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);  // Store file for form submission
    }
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
  
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
  
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });
  
      console.log(response.data);
      toast.success("Product added successfully!");
  
      // Reset state to clear fields
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setName("");
      setDescription("");
      setCategory("Men");
      setsubCategory("Topwear");
      setPrice("");
      setSizes([]);
      setBestseller(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };
  
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full max-w-1xl mx-auto p-8 gap-6'>
      {/* Upload Images Section */}
      <div>
        <p className='text-lg font-semibold mb-3'>Upload Image</p>
        <div className='flex gap-4'>
          {[image1, image2, image3, image4].map((image, index) => (
            <label htmlFor={`image${index + 1}`} key={index} className='cursor-pointer'>
              <img
                className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md'
                src={image ? URL.createObjectURL(image) : assets.upload_area}  // Display preview if available
                alt="Upload"
              />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => handleImageChange(e, [setImage1, setImage2, setImage3, setImage4][index])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-1/2'>
        <label className='block text-md font-medium mb-1'>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full py-2 px-4 border rounded-md border-gray-300 focus:border-gray-500 outline-none'
          placeholder='Type here'
        />
      </div>

      {/* Product Description */}
      <div className='w-1/2'>
        <label className='block text-md font-medium mb-1'>Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full py-2 px-4 border rounded-md border-gray-300 focus:border-gray-500 outline-none resize-none'
          placeholder='Write content here'
          rows={4}
        />
      </div>

      {/* Product Category and subCategory */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex-1'>
          <label className='block text-md font-medium mb-1'>Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full py-2 px-3 border rounded-md border-gray-300 focus:border-gray-500 outline-none'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1'>
          <label className='block text-md font-medium mb-1'>Sub Category</label>
          <select
            value={subCategory}
            onChange={(e) => setsubCategory(e.target.value)}
            className='w-full py-2 px-3 border rounded-md border-gray-300 focus:border-gray-500 outline-none'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Product Price */}
        <div className='flex-1'>
          <label className='block text-md font-medium mb-1'>Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='25'
            className='w-full py-2 px-4 border rounded-md border-gray-300 focus:border-gray-500 outline-none'
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className='text-md font-medium mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <label
              key={size}
              className={`flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200 ${sizes.includes(size) ? 'bg-gray-200' : ''}`}
              onClick={() => setSizes((prevSizes) => 
                prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]
              )}
            >
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex items-center gap-2'>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className='h-5 w-5 text-gray-600 border-gray-300 rounded'
        />
        <label htmlFor="bestseller" className='text-md text-gray-700'>Add to Bestseller</label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className='mt-6 w-32 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-200 mx-auto'
      >
        ADD
      </button>
    </form>
  );
};
Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;
