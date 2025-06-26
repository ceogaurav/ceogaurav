import React, { useState } from 'react';
import { CreditCard, Download, Edit, Search, FileText, Phone } from 'lucide-react';

const PanCard = () => {
  const [activeService, setActiveService] = useState('new');

  const services = [
    { id: 'new', name: 'New PAN Card', icon: CreditCard },
    { id: 'reprint', name: 'Reprint PAN', icon: Download },
    { id: 'correction', name: 'PAN Correction', icon: Edit },
    { id: 'status', name: 'Check Status', icon: Search },
  ];

  const renderServiceContent = () => {
    switch (activeService) {
      case 'new':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Apply for New PAN Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <select className="input-field">
                  <option>Select Title</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="input-field" placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input type="text" className="input-field" placeholder="Enter middle name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="input-field" placeholder="Enter last name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select className="input-field">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" className="input-field" placeholder="Enter mobile number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="input-field" placeholder="Enter email address" />
              </div>
            </div>
            <button className="btn-primary">Submit Application</button>
          </div>
        );
      case 'reprint':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Reprint PAN Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input type="text" className="input-field" placeholder="Enter 10-digit PAN number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Reprint</label>
                <select className="input-field">
                  <option>Select reason</option>
                  <option>Lost PAN Card</option>
                  <option>Damaged PAN Card</option>
                  <option>Name/Address Change</option>
                </select>
              </div>
            </div>
            <button className="btn-primary">Apply for Reprint</button>
          </div>
        );
      case 'correction':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">PAN Card Correction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input type="text" className="input-field" placeholder="Enter 10-digit PAN number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correction Type</label>
                <select className="input-field">
                  <option>Select correction type</option>
                  <option>Name Correction</option>
                  <option>Date of Birth</option>
                  <option>Father's Name</option>
                  <option>Address Change</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Details</label>
                <input type="text" className="input-field" placeholder="Enter current details" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Details</label>
                <input type="text" className="input-field" placeholder="Enter correct details" />
              </div>
            </div>
            <button className="btn-primary">Submit Correction</button>
          </div>
        );
      case 'status':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Check PAN Application Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Acknowledgment Number</label>
                <input type="text" className="input-field" placeholder="Enter 15-digit acknowledgment number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="input-field" />
              </div>
            </div>
            <button className="btn-primary">Check Status</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PAN Card Services</h1>
          <p className="text-xl text-gray-600">Complete PAN card solutions online</p>
        </div>

        {/* Service Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                activeService === service.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
              }`}
            >
              <service.icon className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">{service.name}</span>
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className="card mb-8">
          {renderServiceContent()}
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold">Required Documents</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Proof of Identity</li>
              <li>• Proof of Address</li>
              <li>• Date of Birth Proof</li>
              <li>• Passport Size Photo</li>
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold">Contact Support</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Helpline: 020-27218080</p>
              <p>Email: nsdlpan@nsdl.co.in</p>
              <p>Hours: 9 AM - 6 PM</p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold">Processing Fee</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>New PAN: ₹107</p>
              <p>Reprint: ₹107</p>
              <p>Correction: ₹107</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">How long does it take to get PAN card?</h4>
              <p className="text-gray-600">Typically 15-20 working days from application date.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Can I apply for PAN card online?</h4>
              <p className="text-gray-600">Yes, you can apply online through NSDL or UTIITSL portals.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">What if I lose my PAN card?</h4>
              <p className="text-gray-600">You can apply for a reprint of your PAN card with the same PAN number.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanCard;