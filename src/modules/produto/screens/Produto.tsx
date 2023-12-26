import { useEffect } from 'react';

import { URL_PRODUTO_EMPRESA } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProdutoTypes } from '../types/ProdutoTypes';

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

  return produtos.map((produto) => (
    <div key={produto.id}>{`${produto.idProduto} | ${produto.nome}`}</div>
  ));
};
export default Produto;
