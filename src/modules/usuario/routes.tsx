import { RouteObject } from 'react-router-dom';

import Usuario from './screens/Usuario';
import UsuarioCadastro from './screens/UsuarioCadastro';
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
    element: <UsuarioCadastro />,
  },
];
