import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FinanceHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for all financial services and calculations.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/aadhar-card" className="text-gray-400 hover:text-white">Aadhar Card</Link></li>
              <li><Link to="/pan-card" className="text-gray-400 hover:text-white">PAN Card</Link></li>
              <li><Link to="/plot-construction-loan" className="text-gray-400 hover:text-white">Loans</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li><Link to="/personal-loan-calculator" className="text-gray-400 hover:text-white">Personal Loan EMI</Link></li>
              <li><Link to="/home-loan-calculator" className="text-gray-400 hover:text-white">Home Loan EMI</Link></li>
              <li><Link to="/car-loan-calculator" className="text-gray-400 hover:text-white">Car Loan EMI</Link></li>
              <li><Link to="/income-tax-calculator" className="text-gray-400 hover:text-white">Income Tax</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@financehub.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FinanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;