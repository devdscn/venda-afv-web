import { createContext, useContext, useState } from 'react';

type GlobalData = {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
};

type GlobalContextProps = {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
};

const GlobalContext = createContext({} as GlobalContextProps);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  return { globalData, setGlobalData };
};
