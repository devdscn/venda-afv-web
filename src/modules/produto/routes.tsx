import { RouteObject } from 'react-router-dom';

import Produto from './screens/Produto';
export enum ProdutoRoutesEnum {
  PRODUTO = '/produto',
  PRODUTO_EMPRESA = '/produto/:idEmpresa',
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
];
