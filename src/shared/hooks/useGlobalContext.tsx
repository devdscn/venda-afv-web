import { createContext, useContext, useState } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

type GlobalData = {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
  notification?: NotificationProps;
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

  const setAccessToken = (token: string) => {
    setGlobalData({
      ...globalData,
      token,
    });
  };

  const setNotification = (
    message: string,
    type: NotificationType,
    description?: string,
  ) => {
    setGlobalData({
      ...globalData,
      notification: {
        message,
        type,
        description,
      },
    });
    console.log(`globalData?.notification:${globalData?.notification?.type}`);
  };

  return {
    notification: globalData?.notification,
    globalData,
    setAccessToken,
    setGlobalData,
    setNotification,
  };
};
