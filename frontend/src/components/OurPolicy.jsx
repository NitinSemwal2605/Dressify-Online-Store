import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchanging Policy</p>
            <p className='text-gray-400' >We offer hassle free Exchanging policy</p>
        </div>

        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400' >We Provides 7 Days free return Policy.</p>
        </div>

        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best Cutomer Policy</p>
            <p className='text-gray-400' >We Provides 24/7 Customer Policy</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
