import React, { useState, useCallback } from 'react';
import { Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const PersonalLoanEMI: React.FC = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);

  const emi = calculateEMI(principal, rate, tenure);
  const totalAmount = calculateTotalAmount(emi, tenure);
  const totalInterest = calculateTotalInterest(totalAmount, principal);

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  // Generate amortization schedule for first 12 months
  const generateAmortizationSchedule = () => {
    const schedule = [];
    let remainingPrincipal = principal;
    const monthlyRate = rate / (12 * 100);

    for (let month = 1; month <= Math.min(12, tenure); month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        month,
        emi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }
    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Calculator className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Personal Loan EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your personal loan EMI, total interest, and view detailed amortization schedule
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Loan Calculator</h2>
            </div>

            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(principal)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="4000000"
                  step="10000"
                  value={principal}
                  onChange={handleSliderChange(setPrincipal)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹40L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Interest Rate (per annum)</label>
                  <span className="text-lg font-bold text-primary-600">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="25"
                  step="0.1"
                  value={rate}
                  onChange={handleSliderChange(setRate)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                  <span className="text-lg font-bold text-primary-600">
                    {Math.floor(tenure / 12)} years {tenure % 12} months
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="6"
                  value={tenure}
                  onChange={handleSliderChange(setTenure)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Loan Summary
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-3xl font-bold text-primary-600">{formatCurrency(emi)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Payment Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-600 rounded"></div>
                    <span className="text-sm text-gray-600">Principal</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {((principal / totalAmount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary-600 rounded"></div>
                    <span className="text-sm text-gray-600">Interest</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {((totalInterest / totalAmount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Visual Bar */}
              <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 float-left"
                  style={{ width: `${(principal / totalAmount) * 100}%` }}
                ></div>
                <div 
                  className="h-full bg-secondary-600"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Lower interest rates save money</li>
                <li>• Shorter tenure means higher EMI but less interest</li>
                <li>• Compare rates from multiple lenders</li>
                <li>• Check your credit score before applying</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Amortization Schedule (First 12 Months)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {amortizationSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.emi)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.principalPayment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.interestPayment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.remainingPrincipal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Personal Loan Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Loan Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">No Collateral Required</p>
                  <p className="text-sm text-gray-600">Unsecured loan with no asset backing needed</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Quick Approval</p>
                  <p className="text-sm text-gray-600">Get approved within 24-48 hours</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Flexible Tenure</p>
                  <p className="text-sm text-gray-600">Choose repayment period from 1-7 years</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Multiple Uses</p>
                  <p className="text-sm text-gray-600">Wedding, travel, medical, education expenses</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Age</p>
                <p className="text-sm text-gray-600">21-60 years for salaried, 25-65 for self-employed</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Income</p>
                <p className="text-sm text-gray-600">Minimum ₹25,000 per month for salaried</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Credit Score</p>
                <p className="text-sm text-gray-600">750+ for best rates, 650+ minimum</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Employment</p>
                <p className="text-sm text-gray-600">2+ years work experience required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanEMI;