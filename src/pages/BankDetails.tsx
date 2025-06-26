import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';

const BankDetails = () => {
  const { bankName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bankData: { [key: string]: any } = {
    'state-bank-of-india': {
      name: 'State Bank of India',
      logo: '🏦',
      established: '1955',
      headquarters: 'Mumbai, India',
      website: 'https://sbi.co.in',
      phone: '1800-11-2211',
      email: 'customercare@sbi.co.in',
      description: 'State Bank of India is the largest public sector bank in India with over 200 years of rich heritage.',
      loanProducts: [
        {
          name: 'Plot cum Construction Loan',
          interestRate: '8.50% - 10.50%',
          processingFee: '0.35% of loan amount',
          maxAmount: '₹5 Crores',
          tenure: 'Up to 30 years',
          features: ['No prepayment charges', 'Quick approval', 'Flexible repayment']
        },
        {
          name: 'Home Loan',
          interestRate: '8.40% - 10.40%',
          processingFee: '0.35% of loan amount',
          maxAmount: '₹10 Crores',
          tenure: 'Up to 30 years',
          features: ['Attractive interest rates', 'Quick processing', 'Doorstep service']
        }
      ],
      branches: '22,000+',
      atms: '58,000+',
      awards: [
        'Best Bank Award 2023',
        'Digital Innovation Award',
        'Customer Service Excellence'
      ]
    },
    'hdfc-bank': {
      name: 'HDFC Bank',
      logo: '🏛️',
      established: '1994',
      headquarters: 'Mumbai, India',
      website: 'https://hdfcbank.com',
      phone: '1800-202-6161',
      email: 'customercare@hdfcbank.com',
      description: 'HDFC Bank is one of India\'s leading private sector banks, known for its innovative banking solutions.',
      loanProducts: [
        {
          name: 'Plot cum Construction Loan',
          interestRate: '8.75% - 11.25%',
          processingFee: '0.50% of loan amount',
          maxAmount: '₹10 Crores',
          tenure: 'Up to 30 years',
          features: ['Digital processing', 'Doorstep service', 'Balance transfer facility']
        }
      ],
      branches: '6,000+',
      atms: '18,000+',
      awards: [
        'Bank of the Year 2023',
        'Best Digital Bank',
        'Excellence in Customer Service'
      ]
    }
  };

  const bank = bankData[bankName || ''] || bankData['state-bank-of-india'];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/plot-construction-loan"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Loan Comparison
        </Link>

        {/* Bank Header */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">{bank.logo}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{bank.name}</h1>
              <p className="text-gray-600">{bank.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Established</h3>
              <p className="text-primary-600 font-bold">{bank.established}</p>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Branches</h3>
              <p className="text-secondary-600 font-bold">{bank.branches}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">ATMs</h3>
              <p className="text-yellow-600 font-bold">{bank.atms}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Headquarters</h3>
              <p className="text-purple-600 font-bold">{bank.headquarters}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Customer Care</h3>
            <p className="text-gray-600">{bank.phone}</p>
          </div>
          <div className="card text-center">
            <Mail className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">{bank.email}</p>
          </div>
          <div className="card text-center">
            <ExternalLink className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Official Website</h3>
            <a
              href={bank.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Website
            </a>
          </div>
        </div>

        {/* Loan Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bank.loanProducts.map((product: any, index: number) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold text-primary-600">{product.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">{product.processingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Amount</span>
                    <span className="font-medium">{product.maxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure</span>
                    <span className="font-medium">{product.tenure}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full btn-primary"
                >
                  Apply for {product.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bank.awards.map((award: string, index: number) => (
              <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <span className="text-2xl mr-3">🏆</span>
                <span className="font-medium text-gray-900">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bankName={bank.name}
        loanType="Plot cum Construction Loan"
      />
    </div>
  );
};

export default BankDetails;