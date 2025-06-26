import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CreditCard, FileText, TrendingUp } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: CreditCard,
      title: 'Card Services',
      description: 'Apply for Aadhar Card and PAN Card online',
      links: [
        { name: 'Aadhar Card', href: '/aadhar-card' },
        { name: 'PAN Card', href: '/pan-card' }
      ]
    },
    {
      icon: Calculator,
      title: 'EMI Calculators',
      description: 'Calculate your loan EMIs with our advanced calculators',
      links: [
        { name: 'Personal Loan', href: '/personal-loan-calculator' },
        { name: 'Home Loan', href: '/home-loan-calculator' },
        { name: 'Car Loan', href: '/car-loan-calculator' }
      ]
    },
    {
      icon: FileText,
      title: 'Tax Calculator',
      description: 'Calculate your income tax with ease',
      links: [
        { name: 'Income Tax Calculator', href: '/income-tax-calculator' }
      ]
    },
    {
      icon: TrendingUp,
      title: 'Loan Services',
      description: 'Explore various loan options and interest rates',
      links: [
        { name: 'Plot Construction Loan', href: '/plot-construction-loan' }
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Financial Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Complete financial services platform for all your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/personal-loan-calculator" className="btn-secondary">
              Calculate EMI
            </Link>
            <Link to="/aadhar-card" className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Apply for Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for your financial requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.href}
                        className="block text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FinanceHub?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Safe</h3>
              <p className="text-gray-600">Your data is protected with bank-level security</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick approvals and instant calculations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">24/7 customer support from financial experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;