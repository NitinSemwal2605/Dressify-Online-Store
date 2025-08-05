import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from './ProductItem';
import Title from './title.jsx';

// Skeleton component for product loading
const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>
      {/* Content skeleton */}
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
};

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        console.log("Products in BestSeller:", products);
        
        if (products.length > 0) {
            const filteredBestSellers = products.filter((item) => item.bestseller);
            console.log("Filtered Best Sellers:", filteredBestSellers);

            if (filteredBestSellers.length > 0) {
                setBestSeller([
                    filteredBestSellers[8], 
                    filteredBestSellers[9], 
                    filteredBestSellers[11], 
                    filteredBestSellers[14], 
                    filteredBestSellers[15]
                ].filter(Boolean)); // Avoid undefined values
            }

            setLoading(false); // Set loading to false when products are available
        }
    }, [products]);

    return (
        <div className='my-10'>
            {/* Title Section */}
            <div className="text-center text-3xl py-8">
                <Title text1='BEST' text2='SELLER' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Most Loved, Most Wanted – Shop Our Best Sellers!
                </p>
            </div>

            {/* Skeleton loading - Shows placeholder cards while fetching data */}
            {loading ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {[...Array(5)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {bestSeller.length > 0 ? (
                        bestSeller.map((item) => (
                            <ProductItem
                                key={item._id}  
                                id={item._id}
                                name={item.name}
                                images={item.images} 
                                price={item.price}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full col-span-full">
                            No Best Sellers Available
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BestSeller;
