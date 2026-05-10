/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SellProperty from './pages/SellProperty';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen">
        {/* Background Watermark - simulated with CSS classes */}
        <div className="ink-wash-watermark" />
        
        {/* Background Accent Gradient for extra depth */}
        <div className="fixed inset-0 bg-radial-[at_50%_50%] from-jade-500/5 to-transparent pointer-events-none" />

        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <Footer />

        {/* Aesthetic Chinese Characters scattered subtly */}
        <div className="fixed top-1/4 left-5 chinese-accent opacity-[0.02] text-9xl -rotate-90">安</div>
        <div className="fixed bottom-1/4 right-5 chinese-accent opacity-[0.02] text-9xl rotate-90">家</div>
      </div>
    </Router>
  );
}


