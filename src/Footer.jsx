import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function RevUpFooter() {
  return (
    <footer className="bg-secondary text-white py-6 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex flex-wrap justify-center text-sm gap-4 md:gap-8">
            <a href="#" className="hover:text-primary transition-colors">RACE RULES</a>
            <a href="#" className="hover:text-primary transition-colors">SPONSORSHIP</a>
            <a href="#" className="hover:text-primary transition-colors">CONTACT US</a>
            <a href="#" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
          </div>

          {/* Logo */}
          <div className="mt-4 md:mt-0">
            <img src="./logo2.png" alt="" className='w-auto h-12'/>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-light-gray">
          © {new Date().getFullYear()} REVUP
        </div>
      </div>
    </footer>
  );
}