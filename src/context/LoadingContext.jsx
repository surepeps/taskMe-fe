import React, { createContext, useContext, useState } from 'react';
  
const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const setRequestLoading = (newLoadingState) => {
    setIsRequestLoading(newLoadingState);
  };

  const loadingContextValue = {
    isRequestLoading,
    setRequestLoading,
  };

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useRequestLoading() {
  return useContext(LoadingContext);
}
