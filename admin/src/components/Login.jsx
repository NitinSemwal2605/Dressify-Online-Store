import axios from 'axios'; // Import axios for API calls
import  { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Login = ({ setToken }) => { // Ensure setToken is destructured correctly
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/users/admin`, { email, password });
      console.log(response.data);

      if (response.data.token) {
        setToken(response.data.token);
        toast.success('Login successful!'); // Notify on successful login
      } else {
        toast.error('Invalid credentials'); // Notify on invalid credentials
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error, please try again'); // Notify on network errors
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg px-8 py-10 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder='Enter Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 rounded-md text-white bg-black hover:bg-gray-800 transition duration-300 ease-in-out'
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired, // Validate setToken prop
};

export default Login;
