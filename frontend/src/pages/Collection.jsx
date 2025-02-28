import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/title";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  // eslint-disable-next-line no-unused-vars
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products); 
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply search filter
    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(productsCopy);
  };

  const sortProducts = (option) => {
    const sortedProducts = [...filteredProducts];

    if (option === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    setFilteredProducts(products); 
  }, [products]);

  useEffect(() => {
    applyFilter(); 
  }, [category, subCategory, search, ProductItem]); // Include `search` to re-apply filter when it changes

  useEffect(() => {
    sortProducts(sortOption); 
  }, [sortOption, filteredProducts]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transform ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </label>
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Women" onChange={toggleCategory} /> Women
            </label>
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
            </label>
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
            </label>
            <label className="flex items-center gap-2">
              <input className="w-3" type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 text-2xl">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border-2 border-gray-300 text-sm px-2 py-1"
            defaultValue={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((product) => (
            <ProductItem 
              key={product._id} 
              id={product._id} 
              images={product.images}
              name={product.name} 
              price={product.price} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
