import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, images, name, price }) => {
    const { currency } = useContext(ShopContext);

    // Log the images to the console
    // console.log('Images:', images);

    const imageSrc = (images && images.length > 0) ? images[0] : null;

    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
            <div className="overflow-hidden">
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt={name || 'Product Image'} 
                        className="w-full h-72 object-cover hover:scale-110 transition ease-in-out" 
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                        <span>No Image Available</span> {/* Placeholder message */}
                    </div>
                )}
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
        </Link>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem;
