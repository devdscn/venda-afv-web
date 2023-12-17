import { createContext, useContext, useState } from 'react';

type UserData = {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
};

type UserContextProps = {
  userData: UserData;
  setUserData: (userdata: UserData) => void;
};

const UserGlobalContext = createContext({} as UserContextProps);

type UserProviderProps = {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const { userData, setUserData } = useContext(UserGlobalContext);
  return { userData, setUserData };
};
