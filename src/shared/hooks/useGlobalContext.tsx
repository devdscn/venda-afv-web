import { createContext, useState } from 'react';

export type UserData = {
  token?: string;
  name?: string;
  email?: string;
};

export type UserContextProps = {
  userData: UserData;
  setUserData: (userdata: UserData) => void;
};

export const UserGlobalContext = createContext({} as UserContextProps);

export type UserProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({});

  return (
    <UserGlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserGlobalContext.Provider>
  );
};
