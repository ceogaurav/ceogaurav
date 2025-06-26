import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, TrendingUp, Building2, Search, FileText, CreditCard, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Building2 },
    { name: 'Loan Rates', href: '/loan-rates', icon: TrendingUp },
    { name: 'Eligibility', href: '/eligibility', icon: FileText },
    { name: 'IFSC Finder', href: '/ifsc-finder', icon: Search },
    { name: 'Status', href: '/status', icon: FileText },
  ];

  const calculatorDropdown = [
    { name: 'Personal Loan EMI', href: '/personal-loan-emi-calculator' },
    { name: 'Home Loan EMI', href: '/home-loan-emi-calculator' },
    { name: 'Car Loan EMI', href: '/car-loan-emi-calculator' },
    { name: 'Income Tax Calculator', href: '/income-tax-calculator' },
    { name: 'All Calculators', href: '/calculators' },
  ];

  const servicesDropdown = [
    { name: 'Aadhar Card Services', href: '/aadhar-card' },
    { name: 'PAN Card Services', href: '/pan-card' },
    { name: 'Plot Construction Loan', href: '/plot-construction-loan' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              BanksCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCalculatorsOpen(true)}
                onMouseLeave={() => setIsCalculatorsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculators</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isCalculatorsOpen && (
                <div
                  onMouseEnter={() => setIsCalculatorsOpen(true)}
                  onMouseLeave={() => setIsCalculatorsOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {calculatorDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
              >
                <CreditCard className="h-4 w-4" />
                <span>Services</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isServicesOpen && (
                <div
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/eligibility"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Check Eligibility
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Calculators */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Calculators</p>
                {calculatorDropdown.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Services */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Services</p>
                {servicesDropdown.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/eligibility"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-3 rounded-lg font-semibold text-center"
              >
                Check Eligibility
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;