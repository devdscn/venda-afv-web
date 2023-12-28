import { Empresa } from './EmpresaType';

export interface UserType {
  id: string;
  email: string;
  name: string | null;
  empresa?: Empresa[];
}
