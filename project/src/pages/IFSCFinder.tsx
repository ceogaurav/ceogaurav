import React, { useState } from 'react';
import { Search, Copy, MapPin, Phone, ExternalLink } from 'lucide-react';
import { sampleIFSCData } from '../data/mockData';
import { banks } from '../data/banks';

const IFSCFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [results, setResults] = useState(sampleIFSCData);

  const handleSearch = () => {
    let filtered = sampleIFSCData;
    
    if (selectedBank) {
      filtered = filtered.filter(branch => 
        branch.bank.toLowerCase().includes(selectedBank.toLowerCase())
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(branch =>
        branch.ifsc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setResults(filtered);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            IFSC Code Finder
          </h1>
          <p className="text-xl text-gray-600">
            Find IFSC codes for all bank branches across India
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Banks</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="IFSC code, branch name, or city"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((branch, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{branch.bank}</h3>
                  <p className="text-gray-600 mb-4">{branch.branch}</p>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">IFSC Code:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                      {branch.ifsc}
                    </code>
                    <button
                      onClick={() => copyToClipboard(branch.ifsc)}
                      className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-start space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">{branch.address}</p>
                      <p className="text-sm text-gray-600">
                        {branch.city}, {branch.district}, {branch.state}
                      </p>
                    </div>
                  </div>
                  
                  {branch.contact && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{branch.contact}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                    Get Directions
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1">
                    <ExternalLink className="h-4 w-4" />
                    <span>Branch Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No branches found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IFSCFinder;