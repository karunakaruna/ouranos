"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface StatsContextType {
  postCount: number;
  incrementPostCount: (count?: number) => void;
  resetPostCount: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [postCount, setPostCount] = useState(0);

  const incrementPostCount = (count = 1) => {
    setPostCount(prev => prev + count);
  };

  const resetPostCount = () => {
    setPostCount(0);
  };

  // Reset post count when component unmounts
  useEffect(() => {
    return () => {
      setPostCount(0);
    };
  }, []);

  return (
    <StatsContext.Provider value={{ 
      postCount, 
      incrementPostCount, 
      resetPostCount 
    }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}
