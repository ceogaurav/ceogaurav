import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, TrendingUp, ExternalLink } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';

const PlotConstructionLoan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    {
      name: 'State Bank of India',
      logo: '🏦',
      interestRate: '8.50% - 10.50%',
      processingFee: '0.35% of loan amount',
      maxLoanAmount: '₹5 Crores',
      tenure: 'Up to 30 years',
      features: ['No prepayment charges', 'Quick approval', 'Flexible repayment'],
      website: 'https://sbi.co.in'
    },
    {
      name: 'HDFC Bank',
      logo: '🏛️',
      interestRate: '8.75% - 11.25%',
      processingFee: '0.50% of loan amount',
      maxLoanAmount: '₹10 Crores',
      tenure: 'Up to 30 years',
      features: ['Digital processing', 'Doorstep service', 'Balance transfer facility'],
      website: 'https://hdfcbank.com'
    },
    {
      name: 'ICICI Bank',
      logo: '🏢',
      interestRate: '8.65% - 11.15%',
      processingFee: '0.50% of loan amount',
      maxLoanAmount: '₹15 Crores',
      tenure: 'Up to 30 years',
      features: ['Online application', 'Quick disbursal', 'Competitive rates'],
      website: 'https://icicibank.com'
    },
    {
      name: 'Axis Bank',
      logo: '🏪',
      interestRate: '8.80% - 11.30%',
      processingFee: '1% of loan amount',
      maxLoanAmount: '₹5 Crores',
      tenure: 'Up to 30 years',
      features: ['Flexible EMI options', 'Part payment facility', 'Easy documentation'],
      website: 'https://axisbank.com'
    },
    {
      name: 'Punjab National Bank',
      logo: '🏦',
      interestRate: '8.40% - 10.90%',
      processingFee: '0.35% of loan amount',
      maxLoanAmount: '₹3 Crores',
      tenure: 'Up to 30 years',
      features: ['Low processing fee', 'Government backing', 'Rural area coverage'],
      website: 'https://pnbindia.in'
    },
    {
      name: 'Bank of Baroda',
      logo: '🏛️',
      interestRate: '8.55% - 10.75%',
      processingFee: '0.50% of loan amount',
      maxLoanAmount: '₹5 Crores',
      tenure: 'Up to 30 years',
      features: ['Attractive interest rates', 'Flexible tenure', 'Quick processing'],
      website: 'https://bankofbaroda.in'
    }
  ];

  const handleApplyNow = (bankName: string) => {
    setSelectedBank(bankName);
    setIsModalOpen(true);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plot cum Construction Loan</h1>
          <p className="text-xl text-gray-600">Build your dream home with competitive interest rates</p>
        </div>

        {/* Overview Section */}
        <div className="card mb-12">
          <div className="flex items-center mb-6">
            <Building className="w-6 h-6 text-primary-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">What is Plot cum Construction Loan?</h2>
          </div>
          <p className="text-gray-600 mb-6">
            A Plot cum Construction Loan is a comprehensive financing solution that allows you to purchase a plot of land 
            and construct your dream home on it. This loan combines the benefits of both land purchase and home construction 
            financing in a single package, making it easier to manage your finances and build your ideal home.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Two-Stage Financing</h3>
              <p className="text-sm text-gray-600">First for plot purchase, then for construction</p>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-1">Competitive Rates</h3>
              <p className="text-sm text-gray-600">Starting from 8.40% per annum</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Flexible Tenure</h3>
              <p className="text-sm text-gray-600">Up to 30 years repayment period</p>
            </div>
          </div>
        </div>

        {/* Bank Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Compare Interest Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banks.map((bank, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{bank.logo}</span>
                  <h3 className="text-lg font-bold text-gray-900">{bank.name}</h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold text-primary-600">{bank.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">{bank.processingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Amount</span>
                    <span className="font-medium">{bank.maxLoanAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure</span>
                    <span className="font-medium">{bank.tenure}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {bank.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApplyNow(bank.name)}
                    className="flex-1 btn-primary text-sm"
                  >
                    Apply Now
                  </button>
                  <Link
                    to={`/bank/${bank.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-center text-sm"
                  >
                    View Details
                  </Link>
                  <a
                    href={bank.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200"
                    title="Visit Bank Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Age: 21-65 years for salaried, 21-70 years for self-employed</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Minimum income: ₹25,000 per month for salaried</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Work experience: Minimum 2 years</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">CIBIL Score: 750 and above preferred</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Identity proof (Aadhar, PAN, Passport)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Address proof (Utility bills, Rent agreement)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Income proof (Salary slips, ITR, Bank statements)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-600">Property documents (Sale deed, Approved plan)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Loan Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Application</h4>
              <p className="text-sm text-gray-600">Submit application with required documents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Verification</h4>
              <p className="text-sm text-gray-600">Document verification and property evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Approval</h4>
              <p className="text-sm text-gray-600">Loan approval and sanction letter</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Disbursal</h4>
              <p className="text-sm text-gray-600">Loan amount disbursed in stages</p>
            </div>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bankName={selectedBank}
        loanType="Plot cum Construction Loan"
      />
    </div>
  );
};

export default PlotConstructionLoan;