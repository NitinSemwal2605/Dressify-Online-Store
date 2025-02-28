import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Set initial token state

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Store token in localStorage only when it's set
    } else {
      localStorage.removeItem("token"); // Remove token from localStorage if it's empty
    }
  }, [token]); // Add token as a dependency to update when it changes

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-50 min-h-screen">
        {!token ? ( // Check if token is present
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="flex-1 mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
