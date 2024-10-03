// context/AppContext.js
'use client'; // Necessary for using hooks or state in server components

import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [product,setproduct] = useState(null);

  return (
    <AppContext.Provider value={{product,setproduct}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
