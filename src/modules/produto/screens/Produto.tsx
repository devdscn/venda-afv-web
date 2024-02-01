import { Button, Layout, theme } from 'antd';
import { Input } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentBreadCrump from '../../../shared/components/layout/ContentBreadCrump';
import Footer from '../../../shared/components/layout/Footer';
import Header from '../../../shared/components/layout/Header';
import Sider from '../../../shared/components/layout/Sider';
import { URL_PRODUTO_EMPRESA } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/connection/money';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import useEmpresa from '../../../shared/hooks/useEmpresa';
import { useRequests } from '../../../shared/hooks/useRequests';
import GrupoColuna from '../components/GrupoColuna';
import { ProdutoRoutesEnum } from '../routes';
import { BoxButtons, LimitSize } from '../styles/produto.style';
import { ProdutoTypes } from '../types/ProdutoTypes';

const { Search } = Input;

const columns: ColumnsType<ProdutoTypes> = [
  {
    title: 'Id',
    dataIndex: 'idProduto',
    key: 'idProduto',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Id Empresa',
    dataIndex: 'idEmpresa',
    key: 'idEmpresa',
  },
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Grupo',
    dataIndex: 'nomeGrupo',
    key: 'nomeGrupo',
    sorter: (a, b) => a.nomeGrupo.localeCompare(b.nomeGrupo),
    render: (_, produto) => <GrupoColuna nomeGrupo={produto} />,
  },
  {
    title: 'Preço',
    dataIndex: 'preco',
    key: 'preco',
    render: (_, produto) => <a>{convertNumberToMoney(produto.preco)}</a>,
  },
];

const Produto = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { produtos, setProdutos } = useDataContext();
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoTypes[]>([]);
  const { request } = useRequests();
  const { empresa } = useEmpresa();
  const navigate = useNavigate();

  useEffect(() => {
    setProdutosFiltrados([...produtos]);
  }, [produtos]);

  useEffect(() => {
    request<ProdutoTypes[]>(
      URL_PRODUTO_EMPRESA.replace('{idEmpresa}', empresa.id.toString()),
      MethodsEnum.GET,
      setProdutos,
    );
  }, []);

  const handleOnclickConsultar = () => {
    navigate(ProdutoRoutesEnum.PRODUTO_CONSULTAR);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProdutosFiltrados([...produtos]);
    } else {
      return setProdutosFiltrados([
        ...produtosFiltrados.filter((produto) =>
          produto.nome.includes(value.toUpperCase()),
        ),
      ]);
    }
  };

  const paginaConfig: TablePaginationConfig = {
    defaultPageSize: 10,
    size: 'small',
    total: produtosFiltrados.length,
    showTotal: (total, defaultPageSize) =>
      `${defaultPageSize[0]}-${defaultPageSize[1]} of ${total} produtos`,
    showTitle: true,
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
            name: 'Produtos',
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
              <LimitSize>
                <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
              </LimitSize>
              <Button onClick={handleOnclickConsultar} type="primary">
                Consultar
              </Button>
            </BoxButtons>
            <Table
              columns={columns}
              dataSource={produtosFiltrados}
              pagination={paginaConfig}
            ></Table>
          </Content>
        </Layout>
      </ContentBreadCrump>
      <Footer />
    </Layout>
  );
};
export default Produto;
