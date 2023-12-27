import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { URL_PRODUTO_EMPRESA } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/connection/money';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import GrupoColuna from '../components/GrupoColuna';
import { ProdutoRoutesEnum } from '../routes';
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
    render: (_, produto) => <a>{convertNumberToMoney(produto.preco)}</a>,
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
  const navigate = useNavigate();

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
      <Button onClick={handleOnclickConsultar} type="primary">
        Consultar
      </Button>
      <Table columns={columns} dataSource={produtos} />
    </Screen>
  );
};
export default Produto;
