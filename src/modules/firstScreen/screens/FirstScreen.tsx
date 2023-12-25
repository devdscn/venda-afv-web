import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { ProdutoRoutesEnum } from '../../produto/routes';

const FirstScreen: React.FC = () => {
  const { user } = useGlobalContext();
  const nagivate = useNavigate();

  useEffect(() => {
    if (user) {
      nagivate(ProdutoRoutesEnum.PRODUTO);
    }
  }, [user]);

  return <Spin size="large" />;
};

export default FirstScreen;
