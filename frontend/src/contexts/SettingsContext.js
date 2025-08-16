import React, { createContext, useContext } from 'react';

// Settings Context for language and theme
const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;