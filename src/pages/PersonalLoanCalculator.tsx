import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(24);
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

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Loan EMI Calculator</h1>
          <p className="text-xl text-gray-600">Calculate your personal loan EMI instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Loan Calculator</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount: {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate: {interestRate}% per annum
                </label>
                <input
                  type="range"
                  min="8"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>8%</span>
                  <span>25%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure: {tenure} months
                </label>
                <input
                  type="range"
                  min="6"
                  max="84"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>6 months</span>
                  <span>84 months</span>
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

            {/* Chart Representation */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-500 rounded mr-3"></div>
                  <span className="text-gray-700">Principal: {((loanAmount / totalAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary-500 rounded mr-3"></div>
                  <span className="text-gray-700">Interest: {((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 float-left"
                  style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                ></div>
                <div 
                  className="h-full bg-secondary-500"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lower Interest Rates</h3>
            <p className="text-gray-600">Compare rates from multiple lenders to get the best deal</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Shorter Tenure</h3>
            <p className="text-gray-600">Choose shorter tenure to save on total interest paid</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Plan Your Budget</h3>
            <p className="text-gray-600">Ensure EMI doesn't exceed 40% of your monthly income</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanCalculator;