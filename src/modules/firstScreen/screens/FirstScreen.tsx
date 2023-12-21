import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { LoginRoutesEnum } from '../../login/routes';
import { ProdutoRoutesEnum } from '../../produto/routes';

const FirstScreen: React.FC = () => {
  const nagivate = useNavigate();
  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      nagivate(ProdutoRoutesEnum.PRODUTO);
    } else {
      nagivate(LoginRoutesEnum.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spin size="large" />;
};

export default FirstScreen;
