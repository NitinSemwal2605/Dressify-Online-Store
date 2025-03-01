import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    
      <div>
        <img src={assets.logo} alt="" className='mb-5 w-32' />
        <p className='w-full md:w-2/3 text-gray-600'>
            Dressify – Your Ultimate Destination for Trendy & Timeless Fashion!
        </p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'> COMPANY </p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5"> GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+91 7536862785</li>
          <li>55semwalnitin@gmail.com</li>
        </ul>
      </div>

      {/* Copyright Section */}
      <div className='col-span-3 text-center mt-10'>
        <hr />
        <p className='py-5 text-sm'>Copyright 2024@ dressify.com - All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
