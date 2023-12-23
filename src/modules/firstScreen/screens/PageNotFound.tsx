import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import { LoginRoutesEnum } from '../../login/routes';
import { ContainerPageNotFound } from '../styles/pageNotFound.styles';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleOnClikButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <>
      <ContainerPageNotFound>
        <Result
          status="403"
          title="403"
          subTitle="A página que você está visitando não existe."
          extra={
            <Button onClick={handleOnClikButton} type="primary">
              Página de Login
            </Button>
          }
        />
      </ContainerPageNotFound>
    </>
  );
};
export default PageNotFound;
