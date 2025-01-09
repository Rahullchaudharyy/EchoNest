import React from "react";

const NotFound = ({ message = "Page Not Found", subMessage = "The page you're looking for doesn't exist.", onGoBack }) => {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-[90%] bg-gray-100 p-6 mt-5 mb-6">
      {/* Icon or Illustration */}
      <div className="text-gray-500 text-6xl mb-4">
        <i className="ri-emotion-sad-line"></i>
      </div>

      {/* Main Message */}
      <h1 className="text-2xl break-words text-center font-bold text-gray-800 mb-2">{message}</h1>

      {/* Sub Message */}
      <p className="text-gray-600 text-center max-w-md mb-6">{subMessage}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800"
          >
            Go Back
          </button>
        )}
        <a
          href="/home"
          className="border border-gray-300 py-2 px-6 rounded-lg hover:bg-gray-100"
        >
          Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
