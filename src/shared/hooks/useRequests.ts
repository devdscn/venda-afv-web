import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Authtype } from '../../modules/login/types/AuthType';
import { ProdutoRoutesEnum } from '../../modules/produto/routes';
import { ERRO_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);

    const retunrObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        // setNotification('Entrando...', 'success');
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return retunrObject;
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
    request,

  };
};
