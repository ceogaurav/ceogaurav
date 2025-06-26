import React, { useState, useEffect } from 'react';
import { Calculator, Home, TrendingUp } from 'lucide-react';

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(240); // in months
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure;

    if (monthlyRate === 0) {
      const calculatedEmi = principal / months;
      setEmi(calculatedEmi);
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      const calculatedEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
      const calculatedTotalAmount = calculatedEmi * months;
      const calculatedTotalInterest = calculatedTotalAmount - principal;

      setEmi(calculatedEmi);
      setTotalInterest(calculatedTotalInterest);
      setTotalAmount(calculatedTotalAmount);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const tenureInYears = Math.floor(tenure / 12);
  const remainingMonths = tenure % 12;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Loan EMI Calculator</h1>
          <p className="text-xl text-gray-600">Calculate your home loan EMI and plan your dream home</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Home className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Home Loan Calculator</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount: {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹5L</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate: {interestRate}% per annum
                </label>
                <input
                  type="range"
                  min="6.5"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>6.5%</span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure: {tenureInYears} years {remainingMonths > 0 && `${remainingMonths} months`}
                </label>
                <input
                  type="range"
                  min="60"
                  max="360"
                  step="12"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5 years</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-secondary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">EMI Breakdown</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Monthly EMI</span>
                  <span className="text-2xl font-bold text-primary-600">{formatCurrency(emi)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Principal Amount</span>
                  <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Total Interest</span>
                  <span className="font-semibold">{formatCurrency(totalInterest)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-secondary-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Tenure</span>
                  <span className="font-medium">{tenureInYears} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total EMIs</span>
                  <span className="font-medium">{tenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Percentage</span>
                  <span className="font-medium">{((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Loan Tips */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Home Loan Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Down Payment</h3>
              <p className="text-gray-600">Higher down payment reduces loan amount and EMI</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Credit Score</h3>
              <p className="text-gray-600">Maintain good credit score for better interest rates</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Property Value</h3>
              <p className="text-gray-600">Choose property in good location for better resale value</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600">Keep all documents ready for faster processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;