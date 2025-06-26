import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AadharCard from './pages/AadharCard';
import PanCard from './pages/PanCard';
import PersonalLoanCalculator from './pages/PersonalLoanCalculator';
import HomeLoanCalculator from './pages/HomeLoanCalculator';
import CarLoanCalculator from './pages/CarLoanCalculator';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import PlotConstructionLoan from './pages/PlotConstructionLoan';
import BankDetails from './pages/BankDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aadhar-card" element={<AadharCard />} />
          <Route path="/pan-card" element={<PanCard />} />
          <Route path="/personal-loan-calculator" element={<PersonalLoanCalculator />} />
          <Route path="/home-loan-calculator" element={<HomeLoanCalculator />} />
          <Route path="/car-loan-calculator" element={<CarLoanCalculator />} />
          <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
          <Route path="/plot-construction-loan" element={<PlotConstructionLoan />} />
          <Route path="/bank/:bankName" element={<BankDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;