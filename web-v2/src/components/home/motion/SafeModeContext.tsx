"use client";

import { createContext, useContext, ReactNode } from 'react';

const SafeModeContext = createContext<boolean>(false);

export function SafeModeProvider({ children, isSafeMode }: { children: ReactNode, isSafeMode: boolean }) {
  return (
    <SafeModeContext.Provider value={isSafeMode}>
      {children}
    </SafeModeContext.Provider>
  );
}

export function useSafeMode() {
  return useContext(SafeModeContext);
}
