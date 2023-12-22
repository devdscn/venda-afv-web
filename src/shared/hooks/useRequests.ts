import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Authtype } from '../../modules/login/types/AuthType';
import { ProdutoRoutesEnum } from '../../modules/produto/routes';
import { ERRO_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { connectionAPIPost } from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

const baseUrl = 'http://localhost:3001';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalContext();

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

    const returnData = await connectionAPIPost<T>(url, body)
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

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<Authtype>(URL_AUTH, body)
      .then((result) => {
        setNotification('Entrando...', 'success');
        setUser(result.user);

        //grava token no localStorage
        setAuthorizationToken(result.token);
        navigate(ProdutoRoutesEnum.PRODUTO);
        return result;
      })
      .catch(() => {
        setNotification(ERRO_INVALID_PASSWORD, 'error');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    getRequest,
    postRequest,
  };
};
