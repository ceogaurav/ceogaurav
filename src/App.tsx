import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import LoanRates from './pages/LoanRates';
import Eligibility from './pages/Eligibility';
import IFSCFinder from './pages/IFSCFinder';
import Calculators from './pages/Calculators';
import Status from './pages/Status';
import AadharCard from './pages/AadharCard';
import PanCard from './pages/PanCard';
import PersonalLoanEMI from './pages/calculators/PersonalLoanEMI';
import HomeLoanEMI from './pages/calculators/HomeLoanEMI';
import CarLoanEMI from './pages/calculators/CarLoanEMI';
import IncomeTaxCalculator from './pages/calculators/IncomeTaxCalculator';
import PlotConstructionLoan from './pages/PlotConstructionLoan';
import BankDetails from './pages/BankDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-inter">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loan-rates" element={<LoanRates />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/status" element={<Status />} />
            <Route path="/aadhar-card" element={<AadharCard />} />
            <Route path="/pan-card" element={<PanCard />} />
            <Route path="/personal-loan-emi-calculator" element={<PersonalLoanEMI />} />
            <Route path="/home-loan-emi-calculator" element={<HomeLoanEMI />} />
            <Route path="/car-loan-emi-calculator" element={<CarLoanEMI />} />
            <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
            <Route path="/plot-construction-loan" element={<PlotConstructionLoan />} />
            <Route path="/bank/:bankId" element={<BankDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;