import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calculator, CreditCard, FileText } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Cards',
      icon: CreditCard,
      items: [
        { name: 'Aadhar Card', href: '/aadhar-card' },
        { name: 'PAN Card', href: '/pan-card' },
      ]
    },
    {
      name: 'Calculators',
      icon: Calculator,
      items: [
        { name: 'Personal Loan EMI', href: '/personal-loan-calculator' },
        { name: 'Home Loan EMI', href: '/home-loan-calculator' },
        { name: 'Car Loan EMI', href: '/car-loan-calculator' },
        { name: 'Income Tax', href: '/income-tax-calculator' },
      ]
    },
    {
      name: 'Loans',
      icon: FileText,
      items: [
        { name: 'Plot Construction Loan', href: '/plot-construction-loan' },
      ]
    }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FinanceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((section) => (
              <div key={section.name} className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navigation.map((section) => (
              <div key={section.name} className="mb-4">
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-900 font-medium">
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </div>
                <div className="ml-6 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;