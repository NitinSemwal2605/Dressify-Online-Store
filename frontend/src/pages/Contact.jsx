import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/title.jsx';

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-32">
      <div className="text-center text-3xl font-semibold pt-10 mb-10 border-t border-gray-200">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="flex flex-col sm:flex-row gap-10 my-10 mb-28 items-center">
        {/* Image Section */}
        <img
          src={assets.contact_img}
          alt="Contact us illustration"
          className="w-full sm:max-w-[500px] rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
        />

        {/* Contact Info Section */}
        <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full sm:w-2/3">
          <h2 className="text-lg font-bold text-gray-800">Our Store</h2>
          <p className="text-gray-600">
            Ramdham Cholony
            <br />
            Near Shivalik Nagar , Haridwar (249403)
          </p>

          <p className="text-gray-800">
            Tel: <span className="text-blue-600 font-medium">+91 7536862785</span>
          </p>
          <p className="text-gray-800">
            Email: <span className="text-blue-600 font-medium">admin@dressify.com</span>
          </p>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <p className="text-gray-700 font-medium">Careers at Forever</p>
            <p className="text-gray-500">Explore our teams and job openings to join us.</p>
          </div>

          {/* Button with hover and focus effects */}
          <button
            className="mt-6 border border-black px-6 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-all duration-300 focus:ring-2 focus:ring-black focus:outline-none"
            onClick={scrollToTop}
          >
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Uncomment below to add the NewsLetterBox */}
      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default Contact;
