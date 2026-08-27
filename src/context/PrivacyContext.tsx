'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PrivacyContextType {
  isStealthMode: boolean;
  toggleStealthMode: () => void;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);

  const toggleStealthMode = () => {
    setIsStealthMode((prev) => !prev);
  };

  return (
    <PrivacyContext.Provider value={{ isStealthMode, toggleStealthMode }}>
      <div className={isStealthMode ? 'stealth-active' : ''}>{children}</div>
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}