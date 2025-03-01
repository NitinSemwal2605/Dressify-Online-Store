import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            // Show error toast
            toast.error('Please enter a valid email address!', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        // If valid, show success toast
        toast.success('Subscribed successfully! You will receive 20% off!', {
            position: "top-right",
            autoClose: 3000,
        });

        // Clear the input field after submission
        setEmail('');
    }

    return (
        <div className="text-center">
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className="text-gray-400 mt-3">
                Join our community and unlock exclusive deals! 🎉 <br />Subscribe now & enjoy 20% off your first purchase!
            </p>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border-2 border-gray-300 px-2 py-1 mt-3"
                    required // Make input required
                />
                <button type="submit" className="bg-gray-800 text-white px-3 py-1 mt-3">
                    Subscribe
                </button>
            </form>
            <ToastContainer /> 
        </div>
    );
}

export default NewsletterBox;
