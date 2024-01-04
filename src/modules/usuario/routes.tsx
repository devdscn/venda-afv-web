import { RouteObject } from 'react-router-dom';

import Usuario from './screens/Usuario';
export enum UsuarioRoutesEnum {
  USUARIOS = '/usuarios',
  USUARIO_STORE = '/usuario/store',
}

export const usuarioScreens: RouteObject[] = [
  {
    path: UsuarioRoutesEnum.USUARIOS,
    element: <Usuario />,
  },

  {
    path: UsuarioRoutesEnum.USUARIO_STORE,
    element: <div>Usuário store</div>,
  },
];
