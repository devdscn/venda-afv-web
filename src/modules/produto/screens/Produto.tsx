import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

import GrupoColuna from '../../../shared/components/GrupoColuna';
import { URL_PRODUTO_EMPRESA } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProdutoTypes } from '../types/ProdutoTypes';

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
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Preço',
    dataIndex: 'preco',
    key: 'preco',
  },
  {
    title: 'Grupo',
    dataIndex: 'nomeGrupo',
    key: 'nomeGrupo',
    render: (_, produto) => <GrupoColuna nomeGrupo={produto} />,
  },
];

const Produto = () => {
  const { produtos, setProdutos } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ProdutoTypes[]>(
      URL_PRODUTO_EMPRESA.replace('{idEmpresa}', '1'),
      MethodsEnum.GET,
      setProdutos,
    );
  }, []);

  return <Table columns={columns} dataSource={produtos} />;
};
export default Produto;
