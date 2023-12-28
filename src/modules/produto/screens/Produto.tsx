import { Button } from 'antd';
import { Input } from 'antd';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { URL_PRODUTO_EMPRESA } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/connection/money';
import { useDataContext } from '../../../shared/hooks/useDataContext';
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
  const { produtos, setProdutos } = useDataContext();
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoTypes[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setProdutosFiltrados([...produtos]);
  }, [produtos]);

  useEffect(() => {
    request<ProdutoTypes[]>(
      URL_PRODUTO_EMPRESA.replace('{idEmpresa}', '1'),
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
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
        },
      ]}
    >
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
    </Screen>
  );
};
export default Produto;
