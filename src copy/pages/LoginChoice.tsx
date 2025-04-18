// src/pages/LoginChoice.tsx
import { useNavigate } from "react-router-dom";
import { Sparkle } from "lucide-react";

const LoginChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#E5DEFF] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6B4E71] flex items-center justify-center gap-2">
          Sykeee
          <Sparkle className="w-8 h-8 text-[#FEC6A1] animate-pulse" />
        </h1>
        <p className="text-[#7C6F93] text-lg">Welcome! Please choose your login type</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate("/home")} // Navigates to Index page
          className="bg-[#6B4E71] hover:bg-[#5a3e60] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105"
        >
          Continue as User
        </button>
        
        <button
          onClick={() => navigate("/vendor")}
          className="bg-[#FEC6A1] hover:bg-[#feb38a] text-[#6B4E71] font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105"
        >
          Login as Vendor
        </button>
      </div>
    </div>
  );
};

export default LoginChoice;