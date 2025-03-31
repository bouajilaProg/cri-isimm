"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your user data
export interface User {
  userCode: string;
  tel: string;
  email: string;
  name: string;
}

// Define the context type
interface UserContextType {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

// Create a context with a default value (it will be overridden)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User>({
    userCode: "",
    tel: "",
    email: "",
    name: ""
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
