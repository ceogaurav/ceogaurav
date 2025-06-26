import React, { useState, useEffect } from 'react';
import { Calculator, FileText, TrendingDown } from 'lucide-react';

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState(1000000);
  const [regime, setRegime] = useState('new');
  const [deductions, setDeductions] = useState(150000);
  const [tax, setTax] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    calculateTax();
  }, [income, regime, deductions]);

  const calculateTax = () => {
    let taxableIncome = income;
    let calculatedTax = 0;

    if (regime === 'old') {
      // Old regime with deductions
      taxableIncome = Math.max(0, income - deductions);
      
      if (taxableIncome <= 250000) {
        calculatedTax = 0;
      } else if (taxableIncome <= 500000) {
        calculatedTax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        calculatedTax = 12500 + (taxableIncome - 500000) * 0.20;
      } else {
        calculatedTax = 112500 + (taxableIncome - 1000000) * 0.30;
      }
    } else {
      // New regime without deductions
      if (taxableIncome <= 300000) {
        calculatedTax = 0;
      } else if (taxableIncome <= 600000) {
        calculatedTax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        calculatedTax = 15000 + (taxableIncome - 600000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        calculatedTax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        calculatedTax = 90000 + (taxableIncome - 1200000) * 0.20;
      } else {
        calculatedTax = 150000 + (taxableIncome - 1500000) * 0.30;
      }
    }

    // Add cess
    calculatedTax = calculatedTax * 1.04;

    setTax(calculatedTax);
    setNetIncome(income - calculatedTax);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Income Tax Calculator</h1>
          <p className="text-xl text-gray-600">Calculate your income tax for FY 2023-24</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Tax Calculator</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income: {formatCurrency(income)}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹1L</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Regime</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRegime('new')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      regime === 'new'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    New Regime
                  </button>
                  <button
                    onClick={() => setRegime('old')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      regime === 'old'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    Old Regime
                  </button>
                </div>
              </div>

              {regime === 'old' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deductions (80C, 80D, etc.): {formatCurrency(deductions)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={deductions}
                    onChange={(e) => setDeductions(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹2L</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-4">
                <TrendingDown className="w-6 h-6 text-secondary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Tax Calculation</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Gross Income</span>
                  <span className="font-semibold">{formatCurrency(income)}</span>
                </div>
                
                {regime === 'old' && (
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Deductions</span>
                    <span className="font-semibold">-{formatCurrency(deductions)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Income Tax</span>
                  <span className="text-2xl font-bold text-red-600">{formatCurrency(tax)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Net Income</span>
                  <span className="text-xl font-bold text-secondary-600">{formatCurrency(netIncome)}</span>
                </div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Regime</span>
                  <span className="font-medium capitalize">{regime} Regime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Tax Rate</span>
                  <span className="font-medium">{((tax / income) * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Tax</span>
                  <span className="font-medium">{formatCurrency(tax / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Take Home (Monthly)</span>
                  <span className="font-medium">{formatCurrency(netIncome / 12)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Slabs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">New Tax Regime (FY 2023-24)</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Up to ₹3,00,000</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹3,00,001 - ₹6,00,000</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹6,00,001 - ₹9,00,000</span>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹9,00,001 - ₹12,00,000</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹12,00,001 - ₹15,00,000</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Above ₹15,00,000</span>
                <span className="font-medium">30%</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Old Tax Regime (FY 2023-24)</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Up to ₹2,50,000</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹2,50,001 - ₹5,00,000</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>₹5,00,001 - ₹10,00,000</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Above ₹10,00,000</span>
                <span className="font-medium">30%</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Deductions under 80C, 80D, and other sections are available in the old regime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;