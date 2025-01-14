import React from "react";
import { useNavigate } from "react-router-dom";
import NotfoundImage from '../assets/404.png'

const NotFound = ({
  message = "Page Not Found",
  subMessage = "The page you're looking for doesn't exist.",
  width = '100%',
  height = 'auto',
  size = '70px'
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className={`flex flex-col items-center justify-center h-${height} w-[${width}] p-6 mt-5 mb-6`}>
      <div className={`text-gray-500 text-[${size}] mb-4`}>
        {/* <i className="ri-emotion-sad-line"></i> */}
        <img className="h-full w-full" src={'https://clarity-tailwind.preview.uideck.com/images/404.svg' || NotfoundImage} alt="404" />
      </div>

      <h1 className="text-2xl break-words text-center font-bold text-gray-800 mb-2">
        {message}
      </h1>

      {/* Sub Message */}
      <p className="text-gray-600 text-center max-w-md mb-6">{subMessage}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleGoBack} 
          className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800"
        >
          Go Back
        </button>
        <a
          href="/"
          className="border border-gray-300 py-2 px-6 rounded-lg hover:bg-gray-100"
        >
          Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
