import { createContext, useContext, useState } from 'react';

import { UserType } from '../../modules/login/types/UserType';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

interface GlobalData {
  notification?: NotificationProps;
  user?: UserType;
  itemSelectedMenu?: string[];
  selectedMenu?: string[];
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode;
}

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
  };

  const setUser = (user: UserType) => {
    setGlobalData({
      ...globalData,
      user,
    });
  };

  const setitemSelectedMenu = (itemSelectedMenu: string[]) => {
    setGlobalData({
      ...globalData,
      itemSelectedMenu: itemSelectedMenu,
    });
  };

  const setSelectedMenu = (selectedMenu: string[]) => {
    setGlobalData({
      ...globalData,
      selectedMenu: selectedMenu,
    });
  };

  return {
    notification: globalData?.notification,
    user: globalData?.user,
    itemSelectedMenu: globalData?.itemSelectedMenu,
    selectedMenu: globalData?.selectedMenu,
    setitemSelectedMenu,
    setSelectedMenu,
    setUser,
    setNotification,
  };
};
