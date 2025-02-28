import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken } = useContext(ShopContext);

  const handleLogout = () => {
    // Clear the token from localStorage and the context
    setToken(null); // Update context to reflect logged-out state
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img onClick={() => setShowSearch(true)} src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)} // Set showSearch to true on click
          alt="Search"
        />

        <div className="relative group">
          {/* Show profile options only if the user is logged in */}
          {token ? (
            <>
              <Link to="/profile">
                <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
              </Link>
              <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <Link to="/profile" className="cursor-pointer hover:text-black">
                    My Profile
                  </Link>
                  <Link to="/orders" className="cursor-pointer hover:text-black">
                    Orders
                  </Link>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-black">
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
            </Link>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5 cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(!visible)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to="/" className="py-2 pl-6 border">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection" className="py-2 pl-6 border">
            Collection
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about" className="py-2 pl-6 border">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact" className="py-2 pl-6 border">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
