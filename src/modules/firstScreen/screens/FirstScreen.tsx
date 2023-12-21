import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER } from '../../../shared/constants/urls';
import {
  getAuthorizationToken,
  unsetAuthorizationToken,
} from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { LoginRoutesEnum } from '../../login/routes';
import { ProdutoRoutesEnum } from '../../produto/routes';

const FirstScreen: React.FC = () => {
  const nagivate = useNavigate();

  useEffect(() => {
    const verfyToken = async () => {
      const token = getAuthorizationToken();
      if (token) {
        await connectionAPIGet(URL_USER)
          .then(() => {
            nagivate(ProdutoRoutesEnum.PRODUTO);
          })
          .catch(() => {
            unsetAuthorizationToken();
            nagivate(LoginRoutesEnum.LOGIN);
          });
      } else {
        nagivate(LoginRoutesEnum.LOGIN);
      }
    };

    verfyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spin size="large" />;
};

export default FirstScreen;
