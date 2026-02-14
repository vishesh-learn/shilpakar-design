import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => navigate("/language"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mobile-container bg-primary flex flex-col items-center justify-center min-h-screen">
      <div className={`transition-all duration-700 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <img src={logoWhite} alt="Shilpakar" className="w-40 h-40 rounded-3xl" />
      </div>
      <p className={`text-primary-foreground/70 text-sm mt-6 transition-opacity duration-1000 delay-500 ${show ? "opacity-100" : "opacity-0"}`}>
        Connecting Workers & Contractors
      </p>
    </div>
  );
};

export default SplashScreen;
