import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200  py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Job Hunt</h1>
            <p className="text-sm"> @ 2025 Job Hunt. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com" aria-label="Facebook" >
                <FaFacebook className="w-6 h-6 text-[#1877F2] hover:text-[#2618f2]" />
            </a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" >
                <FaLinkedin className="w-6 h-6 text-[#0077B5] hover:text-[#003fb5]" />
            </a>
            <a href="https://www.twitter.com" aria-label="Twitter">
                <FaTwitter className="w-6 h-6 text-[#1DA1F2] hover:text-[#1d72f2]" />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
