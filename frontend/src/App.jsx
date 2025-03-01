// eslint-disable-next-line no-unused-vars
import React from "react";
import {Routes, Route} from "react-router-dom";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify.jsx";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
