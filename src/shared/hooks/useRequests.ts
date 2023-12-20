import axios from 'axios';
import { useState } from 'react';

import { connectionAPIPost } from '../functions/connection/connectionAPI';
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

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIPost<T>(baseUrl + url, body)
      .then((result) => {
        setNotification('Entrando...', 'success');
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
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
