import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { URL_USUARIOS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { UsuarioTypes } from '../../../shared/types/UsuarioTypes';
import { BoxButtons, LimitSize } from '../../produto/styles/produto.style';
import { UsuarioRoutesEnum } from '../routes';

const columns: ColumnsType<UsuarioTypes> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Id Vendedor',
    dataIndex: 'idVendedor',
    key: 'idVendedor',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
  },

  {
    title: 'E-mail',
    dataIndex: 'email',
  },
];

const Usuario = () => {
  const { usuarios, setUsuarios } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    request<UsuarioTypes[]>(URL_USUARIOS, MethodsEnum.GET, setUsuarios);
  }, []);

  const handleOnClickInserir = () => navigate(UsuarioRoutesEnum.USUARIO_STORE);

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Home',
        },
        {
          name: 'Usuários',
        },
      ]}
    >
      <BoxButtons>
        <LimitSize></LimitSize>
        <Button
          onClick={handleOnClickInserir}
          type="primary"
          icon={<PlusSquareOutlined />}
        >
          Cadastrar
        </Button>
      </BoxButtons>
      <Table columns={columns} dataSource={usuarios}></Table>
    </Screen>
  );
};

export default Usuario;
