import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Make sure onSubmitHandler is async to handle axios calls
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Login') {
        // Handle login
        const response = await axios.post(backendURL + '/api/users/login', { email, password });
        console.log('Login Response:', response.data);

        if (response.data && response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token); // Store token in local storage
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
          navigate('/'); // Navigate to the home page after successful login
        } else {
          toast.error(response.data.message || 'Error in logging in');
        }
      } else {
        // Handle sign-up
        const response = await axios.post(backendURL + '/api/users/register', { name, email, password });
        console.log('Sign Up Response:', response.data);

        if (response.data && response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token); // Store token in local storage
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
          navigate('/'); // Navigate to home page after successful signup
        } else {
          toast.error(response.data.message || 'Error in registering');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken) {
      setToken(savedToken); // If token exists, set it in context
      // Optionally, you can set the user data as well
      // setUser(JSON.parse(savedUser)); 
      navigate('/'); // Redirect to home if the user is logged in
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl"> {currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>

      <div className="w-full px-3 py-2 flex flex-col gap-4">
        {currentState === 'Sign Up' && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-880"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-880"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-880"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
