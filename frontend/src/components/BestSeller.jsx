import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from './ProductItem';
import Title from './title.jsx';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        console.log("Products in BestSeller:", products); 
        if (products.length > 0) {
          const filteredBestSellers = products.filter((item) => item.bestseller);
          console.log("Filtered Best Sellers:", filteredBestSellers);
          setBestSeller(filteredBestSellers.slice(8, 16)); 
          setBestSeller([filteredBestSellers[8], filteredBestSellers[9], filteredBestSellers[11], filteredBestSellers[14],filteredBestSellers[15]]);

        }
      }, [products]);
      
    

    return (
        <div className='my-10'>
            <div className="text-center text-3xl py-8">
                <Title text1='BEST' text2='SELLER' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi iste ipsam rerum cumque, ipsa totam.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.length > 0 ? (
                        bestSeller.map((item, index) => (
                            <ProductItem
                                key={item._id}  
                                id={item._id}
                                name={item.name}
                                images={item.images} 
                                price={item.price}
                            />
                        ))
                    ) : (
                        <p>No best-selling products available.</p> // Fallback message if none
                    )
                }
            </div>
        </div>
    );
};

export default BestSeller;
