import { UserType } from "@/utils/constants";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface GlobalContextType {
  userData: UserType;
  updateUserData: React.Dispatch<React.SetStateAction<UserType>>;
}

// Create the context
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

// Create the provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userData, updateUserData] = useState<UserType>({
    fullName: "",
    email: "",
    password: "",
    contact: "",
  });

  return (
    <GlobalContext.Provider
      value={{
        userData,
        updateUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
