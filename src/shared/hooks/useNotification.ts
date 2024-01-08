import { notification as notificationAntd } from 'antd';
import { useEffect } from 'react';

import { useGlobalContext } from './useGlobalContext';

export const useNotification = () => {
  const [api, contextHolder] = notificationAntd.useNotification();
  const { notification } = useGlobalContext();

  //qualquer mudança de estado o useEffect é executado
  useEffect(() => {
    if (notification?.message && notification.type) {
      api[notification.type]({
        message: `${notification.message}`,
        description: notification.description,
        placement: 'topRight',
      });
    }
  }, [api, notification]);

  return {
    api,
    contextHolder,
  };
};
