import { RouteObject } from 'react-router-dom';

import Empresa from './screens/Empresa';

export enum EmpresaRoutesEnum {
  EMPRESAS = '/empresas',
}

export const empresaScreens: RouteObject[] = [
  {
    path: EmpresaRoutesEnum.EMPRESAS,
    element: <Empresa />,
  },
];
