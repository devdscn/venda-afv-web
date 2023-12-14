import axios from 'axios';
import { useState } from 'react';

const baseUrl = 'http://localhost:3001';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

  const getRequest = async (url: string) => {
    setLoading(true);

    return await axios({
      method: 'get',
      baseURL: baseUrl,
      url: url,
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        alert('Erro');
      });
    setLoading(false);
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
        alert('Login');
        const { token } = result.data;
        console.log(token);
        return result.data;
      })
      .catch(() => {
        alert('Erro');
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
