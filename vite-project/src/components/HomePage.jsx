import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Conditional rendering based on user state */}
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">Welcome, {user.username}!</h1>
            <h2 className="text-xl font-semibold text-center mb-6">Available Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             
            </div>
          </>
        ) : (
          <h1 className="text-center text-xl">Please log in to see your products.</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;