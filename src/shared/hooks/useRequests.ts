import axios from 'axios';
import { useState } from 'react';

import { useGlobalContext } from './useGlobalContext';

const baseUrl = 'http://localhost:3001';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);

    return await axios({
      method: 'get',
      baseURL: baseUrl,
      url: url,
    })
      .then((result) => {
        setNotification('Entrando...', 'success');
        return result.data;
      })
      .catch(() => {});
  };

  const postRequest = async (url: string, body: any) => {
    setLoading(true);
    const returnData = await axios({
      method: 'post',
      baseURL: baseUrl,
      url: url,
      data: body,
    })
      .then((result) => {
        setNotification('Entrando...', 'success');
        console.log(`REsultado:`);

        return result.data;
      })
      .catch(() => {
        setNotification('Erro...', 'error');
      });

    setLoading(false);
    return returnData;
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};
