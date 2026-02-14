import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/components/AppButton";
import { Phone } from "lucide-react";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone.length >= 10) setOtpSent(true);
  };

  const handleVerify = () => {
    if (otp.length === 4) navigate("/role");
  };

  return (
    <div className="mobile-container bg-background flex flex-col min-h-screen px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
          <Phone className="text-primary" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Login</h1>
        <p className="text-muted-foreground text-sm mb-10">Enter your phone number</p>

        {!otpSent ? (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2 border-2 border-border rounded-2xl px-4 py-4 bg-card focus-within:border-primary transition-colors">
              <span className="text-foreground font-semibold">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Mobile Number"
                className="flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <AppButton onClick={handleSendOtp} disabled={phone.length < 10}>
              Send OTP
            </AppButton>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <p className="text-center text-muted-foreground text-sm">
              OTP sent to +91 {phone}
            </p>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const newOtp = otp.split("");
                    newOtp[i] = val;
                    setOtp(newOtp.join(""));
                    if (val && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-border rounded-xl bg-card text-foreground focus:border-primary outline-none transition-colors"
                />
              ))}
            </div>
            <AppButton onClick={handleVerify} disabled={otp.length < 4}>
              Verify OTP
            </AppButton>
            <button
              onClick={() => { setOtpSent(false); setOtp(""); }}
              className="w-full text-center text-primary text-sm font-medium"
            >
              Change Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
