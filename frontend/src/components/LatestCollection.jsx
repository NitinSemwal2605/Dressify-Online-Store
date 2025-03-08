import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from './ProductItem';
import Title from './title.jsx';
import Loader from './Loader'; // Import Loader component

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loader

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts([
        products[0],
        products[7],
        products[22],
        products[25],
        products[24],
        products[18],
        products[20],
        products[30],
        products[31],
        products[32],
      ].filter(Boolean)); // Filter out undefined entries

      setLoading(false); // Data is loaded
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Fresh Styles, New Trends – Explore Our Latest Collections!
        </p>
      </div>

      {/* Show Loader while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
