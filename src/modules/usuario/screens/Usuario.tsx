import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentBreadCrump from '../../../shared/components/layout/ContentBreadCrump';
import Footer from '../../../shared/components/layout/Footer';
import Header from '../../../shared/components/layout/Header';
import Sider from '../../../shared/components/layout/Sider';
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

const Usuario: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { usuarios, setUsuarios } = useDataContext();
  const { request } = useRequests();
  // const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    request<UsuarioTypes[]>(URL_USUARIOS, MethodsEnum.GET, setUsuarios);
    //  request(URL_USER, MethodsEnum.GET, setUser);
  }, []);

  const handleOnClickInserir = () => navigate(UsuarioRoutesEnum.USUARIO_STORE);

  return (
    <Layout
      style={{
        padding: '12px 12px',
        borderRadius: borderRadiusLG,
      }}
    >
      <Header />

      <ContentBreadCrump
        listBreadcrumb={[
          {
            name: 'Home',
          },
          {
            name: 'Usuários',
          },
        ]}
      >
        <Layout
          style={{
            padding: '0px 0px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider />
          <Content style={{ padding: '0px 12px', minHeight: 280 }}>
            <BoxButtons>
              <LimitSize />
              <Button
                onClick={handleOnClickInserir}
                type="primary"
                icon={<PlusSquareOutlined />}
              >
                Cadastrar
              </Button>
            </BoxButtons>

            <Table columns={columns} dataSource={usuarios} />
          </Content>
        </Layout>
      </ContentBreadCrump>
      <Footer />
    </Layout>
  );
};

export default Usuario;
