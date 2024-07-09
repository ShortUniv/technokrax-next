'use client'
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const ComingSoon = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleNotifyClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <IconButton
        className="absolute top-4 left-4 text-white"
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon />
      </IconButton>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl md:text-2xl mb-8">We're working hard to bring you something amazing!</p>
      {!showMessage ? (
        <div className="mt-8">
          <button
            onClick={handleNotifyClick}
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          >
            Notify Me
          </button>
        </div>
      ) : (
        <div className="mt-8 p-4 bg-white text-blue-500 font-semibold rounded-md shadow-md">
          <p>We have received your request. We will notify you!</p>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
