import React, { useState, useCallback } from 'react';
import { Receipt, Calculator, TrendingDown, PieChart, FileText } from 'lucide-react';
import { calculateTax, formatCurrency } from '../../utils/calculations';

const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState(1000000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    section24B: 200000,
    section80E: 0,
    section80G: 0,
  });

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  const handleDeductionChange = (section: string, value: number) => {
    setDeductions(prev => ({ ...prev, [section]: value }));
  };

  // Calculate tax for both regimes
  const newRegimeTax = calculateTax(income, 'new');
  const oldRegimeTax = calculateTax(income - (regime === 'old' ? Object.values(deductions).reduce((a, b) => a + b, 0) : 0), 'old');
  
  const currentTax = regime === 'new' ? newRegimeTax : oldRegimeTax;
  const taxableIncome = regime === 'new' ? income : income - Object.values(deductions).reduce((a, b) => a + b, 0);
  const effectiveRate = ((currentTax / income) * 100).toFixed(2);
  const marginalRate = income > 1500000 ? 30 : income > 1200000 ? 20 : income > 900000 ? 15 : income > 600000 ? 10 : income > 300000 ? 5 : 0;

  // Tax slabs for new regime
  const newRegimeSlabs = [
    { range: '₹0 - ₹3,00,000', rate: '0%', tax: 0 },
    { range: '₹3,00,001 - ₹6,00,000', rate: '5%', tax: Math.min(15000, Math.max(0, (income - 300000) * 0.05)) },
    { range: '₹6,00,001 - ₹9,00,000', rate: '10%', tax: Math.min(30000, Math.max(0, (income - 600000) * 0.10)) },
    { range: '₹9,00,001 - ₹12,00,000', rate: '15%', tax: Math.min(45000, Math.max(0, (income - 900000) * 0.15)) },
    { range: '₹12,00,001 - ₹15,00,000', rate: '20%', tax: Math.min(60000, Math.max(0, (income - 1200000) * 0.20)) },
    { range: 'Above ₹15,00,000', rate: '30%', tax: Math.max(0, (income - 1500000) * 0.30) },
  ];

  // Tax slabs for old regime
  const oldRegimeSlabs = [
    { range: '₹0 - ₹2,50,000', rate: '0%', tax: 0 },
    { range: '₹2,50,001 - ₹5,00,000', rate: '5%', tax: Math.min(12500, Math.max(0, (taxableIncome - 250000) * 0.05)) },
    { range: '₹5,00,001 - ₹10,00,000', rate: '20%', tax: Math.min(100000, Math.max(0, (taxableIncome - 500000) * 0.20)) },
    { range: 'Above ₹10,00,000', rate: '30%', tax: Math.max(0, (taxableIncome - 1000000) * 0.30) },
  ];

  const currentSlabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Receipt className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Income Tax Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your income tax liability for FY 2023-24 under both old and new tax regimes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Income Details</h2>
              </div>

              <div className="space-y-6">
                {/* Annual Income */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-gray-700">Annual Income</label>
                    <span className="text-lg font-bold text-primary-600">{formatCurrency(income)}</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="50000"
                    value={income}
                    onChange={handleSliderChange(setIncome)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹2L</span>
                    <span>₹50L</span>
                  </div>
                </div>

                {/* Tax Regime Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Tax Regime</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRegime('new')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        regime === 'new'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-semibold">New Regime</p>
                        <p className="text-sm text-gray-600">Lower rates, no deductions</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setRegime('old')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        regime === 'old'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-semibold">Old Regime</p>
                        <p className="text-sm text-gray-600">Higher rates, with deductions</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Deductions (Only for Old Regime) */}
            {regime === 'old' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-secondary-600 p-2 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Tax Deductions</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Section 80C (PPF, ELSS, etc.)</label>
                      <span className="text-sm font-bold text-secondary-600">{formatCurrency(deductions.section80C)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={deductions.section80C}
                      onChange={(e) => handleDeductionChange('section80C', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹1.5L (Max)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Section 80D (Health Insurance)</label>
                      <span className="text-sm font-bold text-secondary-600">{formatCurrency(deductions.section80D)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="75000"
                      step="5000"
                      value={deductions.section80D}
                      onChange={(e) => handleDeductionChange('section80D', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹75K (Max)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Section 24B (Home Loan Interest)</label>
                      <span className="text-sm font-bold text-secondary-600">{formatCurrency(deductions.section24B)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={deductions.section24B}
                      onChange={(e) => handleDeductionChange('section24B', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹2L (Max)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Tax Summary
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Tax Liability</p>
                  <p className="text-3xl font-bold text-primary-600">{formatCurrency(currentTax)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Taxable Income</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(taxableIncome)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Effective Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{effectiveRate}%</p>
                  </div>
                </div>

                <div className="text-center pt-2 border-t">
                  <p className="text-xs text-gray-600 mb-1">Marginal Rate</p>
                  <p className="text-lg font-semibold text-gray-900">{marginalRate}%</p>
                </div>
              </div>
            </div>

            {/* Regime Comparison */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Regime Comparison</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Regime</span>
                  <span className="text-sm font-semibold">{formatCurrency(newRegimeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Old Regime</span>
                  <span className="text-sm font-semibold">{formatCurrency(oldRegimeTax)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-900">Savings</span>
                    <span className={`text-sm font-bold ${newRegimeTax < oldRegimeTax ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(newRegimeTax - oldRegimeTax))}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {newRegimeTax < oldRegimeTax ? 'New regime is better' : 'Old regime is better'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Saving Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Tax Saving Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Invest in ELSS for 80C benefits</li>
                <li>• Buy health insurance for 80D</li>
                <li>• Consider NPS for additional deduction</li>
                <li>• Plan investments before March 31st</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tax Slabs */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Tax Slabs - {regime === 'new' ? 'New' : 'Old'} Regime
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSlabs.map((slab, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slab.range}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slab.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(slab.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">New Tax Regime Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Lower Tax Rates</p>
                  <p className="text-sm text-gray-600">Reduced tax rates across all slabs</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">No Deductions</p>
                  <p className="text-sm text-gray-600">Most deductions not available</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Simplified</p>
                  <p className="text-sm text-gray-600">Easier tax calculation and filing</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Old Tax Regime Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Multiple Deductions</p>
                  <p className="text-sm text-gray-600">80C, 80D, 24B and other sections</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Investment Benefits</p>
                  <p className="text-sm text-gray-600">Encourages savings and investments</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Higher Exemption</p>
                  <p className="text-sm text-gray-600">Better for high deduction cases</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;