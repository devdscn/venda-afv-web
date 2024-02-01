import type { TableColumnsType } from 'antd';
import { Button, Layout, Table, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';

import ContentBreadCrump from '../../../shared/components/layout/ContentBreadCrump';
import Footer from '../../../shared/components/layout/Footer';
import Header from '../../../shared/components/layout/Header';
import Sider from '../../../shared/components/layout/Sider';
import { URL_EMPRESAS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { EmpresaTypes } from '../../../shared/types/EmpresaTypes';
import { BoxButtons, LimitSize } from '../../produto/styles/produto.style';

const columns: TableColumnsType<EmpresaTypes> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },

  {
    title: 'Nome razão',
    dataIndex: 'razaSocial',
    render: (text: string) => <a>{text}</a>,
  },

  {
    title: 'Nome fantasia',
    dataIndex: 'fantasia',
  },
];

// rowSelection object indicates the need for row selection

const Empresa: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { empresas, setEmpresas } = useDataContext();
  const { setSelectedMenu } = useGlobalContext();
  const { request } = useRequests();

  const [empresa, setEmpresa] = useState<EmpresaTypes>();

  useEffect(() => {
    setSelectedMenu(['empresa']);
    request<EmpresaTypes[]>(URL_EMPRESAS, MethodsEnum.GET, setEmpresas);
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: EmpresaTypes[]) => {
      setEmpresa(selectedRows[0]);
      console.log(selectedRowKeys);
    },
  };

  const onClick = () => {
    alert(empresa?.id);
  };

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
            name: 'Empresas',
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
          <Content style={{ margin: '0px 36px', padding: '0px 12px', minHeight: 280 }}>
            <BoxButtons>
              <LimitSize />
              <Button onClick={onClick} type="primary">
                Cadastrar
              </Button>
            </BoxButtons>
            <div>
              <Table
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }}
                rowKey="id"
                columns={columns}
                dataSource={empresas}
              />
            </div>
          </Content>
        </Layout>
      </ContentBreadCrump>
      <Footer />
    </Layout>
  );
};

export default Empresa;
