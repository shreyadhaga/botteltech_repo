import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Availability from './pages/Availability';
import Booking from './pages/Bookings';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Bolttech Carental</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Availability</Link>
            <Link to="/booking" className="text-gray-700 hover:text-blue-600">Booking</Link>
          </div>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Availability />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
