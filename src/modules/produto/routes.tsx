import { RouteObject } from 'react-router-dom';

import Produto from './screens/Produto';
import ProdutoConsultar from './screens/ProdutoConsultar';
export enum ProdutoRoutesEnum {
  PRODUTO = '/produto',
  PRODUTO_EMPRESA = '/produto/:idEmpresa',
  PRODUTO_CONSULTAR = '/produto/consultar',
}

export const produtoScreens: RouteObject[] = [
  {
    path: ProdutoRoutesEnum.PRODUTO,
    element: <Produto />,
  },

  {
    path: ProdutoRoutesEnum.PRODUTO_EMPRESA,
    element: <Produto />,
  },
  {
    path: ProdutoRoutesEnum.PRODUTO_CONSULTAR,
    element: <ProdutoConsultar />,
  },
];
