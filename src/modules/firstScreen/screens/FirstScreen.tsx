import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { UsuarioRoutesEnum } from '../../usuario/routes';

const FirstScreen: React.FC = () => {
  const { user } = useGlobalContext();
  const nagivate = useNavigate();

  useEffect(() => {
    if (user) {
      nagivate(UsuarioRoutesEnum.USUARIOS);
    }
  }, [user]);

  return <Spin size="large" />;
};

export default FirstScreen;
