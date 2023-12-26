import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

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
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'Preço',
    dataIndex: 'preco',
    key: 'preco',
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
