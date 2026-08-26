"use client";

import { createContext, useContext, ReactNode } from "react";

export type DataType = "real" | "demonstracao" | "indisponivel";

interface DataTypeContextType {
  dataType: DataType;
  isDemo: boolean;
  isReal: boolean;
  isEmpty: boolean;
}

const DataTypeContext = createContext<DataTypeContextType | undefined>(
  undefined
);

interface DataTypeProviderProps {
  children: ReactNode;
  dataType: DataType;
}

export function DataTypeProvider({ children, dataType }: DataTypeProviderProps) {
  const value: DataTypeContextType = {
    dataType,
    isDemo: dataType === "demonstracao",
    isReal: dataType === "real",
    isEmpty: dataType === "indisponivel",
  };

  return (
    <DataTypeContext.Provider value={value}>
      {children}
    </DataTypeContext.Provider>
  );
}

export function useDataType(): DataTypeContextType {
  const context = useContext(DataTypeContext);
  if (!context) {
    throw new Error("useDataType must be used within DataTypeProvider");
  }
  return context;
}
