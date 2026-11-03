import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppButton from "@/components/AppButton";
import FieldError, { triggerShake } from "@/components/FieldError";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSimulatedAction } from "@/hooks/useSimulatedLoading";
import { Phone, ArrowLeft, RefreshCw } from "lucide-react";

// Demo verification code — replace with real backend verification when connected.
const DEMO_OTP = "1234";
const MAX_ATTEMPTS = 3;
const RESEND_SECONDS = 30;

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [shakePhone, setShakePhone] = useState(false);
  const [shakeOtp, setShakeOtp] = useState(false);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [locked, setLocked] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [sending, runSend] = useSimulatedAction(800);
  const [verifying, runVerify] = useSimulatedAction(900);
  const [resending, runResend] = useSimulatedAction(800);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const handleSendOtp = () => {
    if (sending) return;
    if (phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      triggerShake(setShakePhone);
      return;
    }
    setPhoneError(null);
    runSend(() => {
      setOtpSent(true);
      setOtp("");
      setOtpError(null);
      setAttempts(MAX_ATTEMPTS);
      setLocked(false);
      setResendIn(RESEND_SECONDS);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    });
  };

  const handleResend = () => {
    if (resending) return;
    runResend(() => {
      setOtp("");
      setOtpError(null);
      setAttempts(MAX_ATTEMPTS);
      setLocked(false);
      setResendIn(RESEND_SECONDS);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
      toast.info(`New OTP sent to +91 ${phone}`, {
        description: `Demo code: ${DEMO_OTP}`,
      });
    });
  };

  const handleVerify = () => {
    if (locked || verifying) return;
    if (otp.length < 4) {
      setOtpError("Enter the 4-digit code");
      triggerShake(setShakeOtp);
      return;
    }
    runVerify(() => {
      if (otp !== DEMO_OTP) {
        const left = attempts - 1;
        setAttempts(left);
        setOtp("");
        if (left <= 0) {
          setLocked(true);
          setOtpError("Too many incorrect attempts. Resend a new OTP to try again.");
        } else {
          setOtpError(`Incorrect OTP. ${left} ${left === 1 ? "attempt" : "attempts"} left.`);
        }
        triggerShake(setShakeOtp);
        return;
      }
      setOtpError(null);
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "client") {
        navigate("/client/dashboard");
      } else if (savedRole === "worker") {
        navigate("/worker/dashboard");
      } else {
        navigate("/role");
      }
    });
  };

  const handleOtpChange = (i: number, raw: string) => {
    if (locked) return;
    const val = raw.replace(/\D/g, "");
    const newOtp = otp.split("");
    newOtp[i] = val;
    const joined = newOtp.join("").slice(0, 4);
    setOtp(joined);
    if (otpError) setOtpError(null);
    if (val && i < 3) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (locked) return;
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted) {
      setOtp(pasted);
      if (otpError) setOtpError(null);
      otpRefs.current[Math.min(pasted.length, 3)]?.focus();
    }
  };

  return (
    <div className="mobile-container bg-background flex flex-col min-h-screen px-6 py-12">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/language")}
          className="flex items-center gap-1 text-primary text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
          <Phone className="text-primary" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Continue with Phone
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          {otpSent ? `OTP sent to +91 ${phone}` : "Enter your phone number"}
        </p>

        {!otpSent ? (
          <div className="w-full space-y-4">
            <div>
              <div
                className={`flex items-center gap-2 border-2 rounded-2xl px-4 py-4 bg-card focus-within:border-primary transition-colors ${
                  phoneError ? "border-destructive animate-shake" : "border-border"
                } ${shakePhone && !phoneError ? "animate-shake" : ""}`}
              >
                <span className="text-foreground font-semibold">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (phoneError) setPhoneError(null);
                  }}
                  placeholder="Mobile Number"
                  className="flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <FieldError message={phoneError} />
            </div>
            <AppButton onClick={handleSendOtp} loading={sending}>
              {sending ? "Sending OTP" : "Send OTP"}
            </AppButton>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  disabled={locked}
                  value={otp[i] || ""}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl bg-card text-foreground outline-none transition-colors disabled:opacity-50 ${
                    otpError ? "border-destructive animate-shake" : "border-border focus:border-primary"
                  }`}
                />
              ))}
            </div>
            <FieldError message={otpError} className="justify-center" />
            <AppButton onClick={handleVerify} loading={verifying} disabled={locked}>
              {verifying ? "Verifying" : locked ? "Try again after resend" : "Verify OTP"}
            </AppButton>
            <div className="text-center text-sm space-y-2">
              {resendIn > 0 ? (
                <p className="text-muted-foreground">
                  Resend OTP in 0:{String(resendIn).padStart(2, "0")}
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-primary font-medium inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
                  {resending ? "Sending" : "Resend OTP"}
                </button>
              )}
              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setOtpError(null);
                  setPhoneError(null);
                  setLocked(false);
                  setResendIn(0);
                }}
                className="w-full text-center text-muted-foreground text-sm font-medium"
              >
                Change Number
              </button>
            </div>
          </div>
        )}

        {otpSent && !locked && (
          <p className="mt-8 text-xs text-muted-foreground">
            Demo code: <span className="font-semibold text-primary">{DEMO_OTP}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
