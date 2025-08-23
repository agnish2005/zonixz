import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Image/logo2.png";
import "./OTPVerificationPage.css";

const OTPVerificationPage = ({ onBack, phoneNumber }) => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus on first input when component mounts
    inputRefs.current[0]?.focus();

    // Timer for resend functionality
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsResendEnabled(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, value) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    setOtpValues((prev) => {
      const newOtpValues = [...prev];
      newOtpValues[index] = value;

      // Move to next input automatically
      if (value && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }

      return newOtpValues;
    });
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace (go to previous input)
    if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 0);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    const newOtpValues = [...otpValues];

    for (let i = 0; i < Math.min(pasteData.length, 6); i++) {
      newOtpValues[i] = pasteData[i];
    }

    setOtpValues(newOtpValues);

    // Focus on the next empty input or last input
    const nextIndex = Math.min(pasteData.length, 5);
    setTimeout(() => {
      inputRefs.current[nextIndex]?.focus();
    }, 0);
  };

  const handleResend = () => {
    if (isResendEnabled) {
      setIsResendEnabled(false);
      setTimer(30);
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Restart timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsResendEnabled(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleVerify = () => {
    const otpCode = otpValues.join("");
    if (otpCode.length === 6) {
      console.log("OTP entered:", otpCode);
      // Navigate to Profile page
      navigate("/profile");
    } else {
      alert("Please enter complete 6-digit OTP");
    }
  };

  const isOtpComplete = otpValues.every((value) => value !== "");

  return (
    <div className="zotpvrf-main-container">
      {/* Header */}
      <div className="zotpvrf-header-wrapper">
        <IoIosArrowBack
          className="zotpvrf-back-arrow-icon"
          onClick={onBack}
        />
      </div>

      <div className="zonixz-brand-logo">
        <img
          src={logo}
          alt="My Logo"
          className="zonixz-logo-image"
          style={{ marginLeft: "0" }}
        />
        <span className="zonixz-brand-name">Zonixz</span>
      </div>

      {/* Content */}
      <div className="zotpvrf-content-wrapper">
        {/* Title */}
        <div className="zotpvrf-title-section">
          <h1 className="zotpvrf-main-title">Verify your OTP</h1>
          <p className="zotpvrf-subtitle">
            Please enter the 6-digit code sent to your phone number.
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="zotpvrf-otp-section">
          <div className="zotpvrf-otp-inputs-container">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                className="zotpvrf-otp-input"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>
        </div>

        {/* Resend Section */}
        <div className="zotpvrf-resend-section">
          <span className="zotpvrf-resend-text">Didn't receive the code? </span>
          <span
            className={`zotpvrf-resend-link ${
              isResendEnabled ? "enabled" : "disabled"
            }`}
            onClick={handleResend}
          >
            Resend
            {!isResendEnabled && timer > 0 && ` (${timer}s)`}
          </span>
        </div>
      </div>

      {/* Verify Button */}
      <div className="zotpvrf-button-section">
        <button
          className={`zotpvrf-verify-button ${
            isOtpComplete ? "active" : "inactive"
          }`}
          onClick={handleVerify}
          disabled={!isOtpComplete}
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

export default OTPVerificationPage;