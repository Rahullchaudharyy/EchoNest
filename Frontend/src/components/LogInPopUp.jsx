import React from "react";
import { Link } from "react-router-dom";

const LogInPopUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the popup if `isOpen` is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        {/* Popup Header */}
        <h2 className="text-xl font-bold text-center mb-4">Sign In Required</h2>

        {/* Popup Content */}
        <p className="text-center text-gray-600 mb-6">
          Please sign in to access this feature.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {/* Sign In Button */}
          <Link
            to="/auth"
            className="bg-blue-200 text-blue-500 py-2 px-6 rounded-lg transition-all hover:bg-blue-300"
          >
            Sign In
          </Link>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="border border-gray-300 py-2 px-6 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPopUp;
