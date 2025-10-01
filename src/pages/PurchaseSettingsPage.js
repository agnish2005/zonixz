import React, { useState } from "react";
import { IoIosArrowBack, IoMdCard } from "react-icons/io";
import "./PurchaseSettingsPage.css";

const PurchaseSettingsPage = () => {
  const [currentView, setCurrentView] = useState("settings"); // 'settings' or 'payment-methods'

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      number: "**** 1234",
      cardClass: "psp-card-visa",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "**** 5678",
      cardClass: "psp-card-mastercard",
    },
    {
      id: 3,
      type: "MasterCard",
      number: "",
      cardClass: "psp-card-mastercard-blue",
    },
  ];

  const PurchaseSettingsView = () => (
    <div className="psp-page-container">
      {/* Header */}
      <div className="psp-header">
        <button className="psp-back-btn">
          <IoIosArrowBack className="psp-back-icon" />
        </button>
        <h1 className="psp-header-title">Purchase Settings</h1>
        <div className="psp-header-spacer"></div>
      </div>

      {/* Content */}
      <div className="psp-content">
        <div className="psp-section">
          <h2 className="psp-main-title">Your Purchase Preferences</h2>
          <p className="psp-description">
            Use this page to set your preferred payment method, shipping
            address, and shipping method.
          </p>
        </div>

        <div className="z-div">
          {/* User Info Card */}
          <div className="psp-user-card">
            <h3 className="psp-user-name">Amit Anuj Singh</h3>
            <p className="psp-user-address">
              Bb, Floor 2, Vastu Vihar KH1 Apartment, Sector 16, Kharghar, Navi
              Mumbai, Maharashtra.
            </p>
          </div>

          {/* Payment Method Button */}
          <button
            onClick={() => setCurrentView("payment-methods")}
            className="psp-select-payment-btn"
          >
            <div className="psp-btn-left">
              <IoMdCard className="psp-card-icon" />
              <span className="psp-btn-text">Select a payment method</span>
            </div>
            <IoIosArrowBack className="psp-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );

  const PaymentMethodsView = () => (
    <div className="psp-page-container">
      {/* Header */}
      <div className="psp-header">
        <button
          onClick={() => setCurrentView("settings")}
          className="psp-back-btn psp-back-clickable"
        >
          <IoIosArrowBack className="psp-back-icon" />
        </button>
        <h1 className="psp-header-title">Payment Methods</h1>
        <div className="psp-header-spacer"></div>
      </div>

      {/* Content */}
      <div className="psp-content">
        <h2 className="psp-main-title psp-payment-title">
          Your Saved Payment Methods
        </h2>

        {/* Payment Cards List */}
        <div className="psp-cards-container">
          {/* Visa Card */}
          <div className="psp-payment-card">
            <div className="psp-card-left">
              <div className="psp-card-image psp-visa-card"></div>
              <span className="psp-card-text">Visa **** 1234</span>
            </div>
            <div className="psp-card-right">
              <button className="psp-delete-button">
                <svg
                  className="psp-trash-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <IoIosArrowBack className="psp-chevron-right" />
            </div>
          </div>

          {/* Mastercard Card 1 */}
          <div className="psp-payment-card">
            <div className="psp-card-left">
              <div className="psp-card-image psp-mastercard-card">
                <div className="psp-mc-circles">
                  <div className="psp-mc-circle psp-mc-red"></div>
                  <div className="psp-mc-circle psp-mc-orange"></div>
                </div>
              </div>
              <span className="psp-card-text">Mastercard **** 5678</span>
            </div>
            <div className="psp-card-right">
              <button className="psp-delete-button">
                <svg
                  className="psp-trash-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <IoIosArrowBack className="psp-chevron-right" />
            </div>
          </div>

          {/* Mastercard Card 2 */}
          <div className="psp-payment-card">
            <div className="psp-card-left">
              <div className="psp-card-image psp-mastercard-blue-card">
                <div className="psp-mc-circles">
                  <div className="psp-mc-circle psp-mc-red-dark"></div>
                  <div className="psp-mc-circle psp-mc-orange-light"></div>
                </div>
              </div>
              <span className="psp-card-text">MasterCard</span>
            </div>
            <div className="psp-card-right">
              <button className="psp-delete-button">
                <svg
                  className="psp-trash-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <IoIosArrowBack className="psp-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === "settings" ? (
    <PurchaseSettingsView />
  ) : (
    <PaymentMethodsView />
  );
};

export default PurchaseSettingsPage;