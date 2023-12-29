import { Empresa } from './EmpresaType';

export interface UserType {
  id: string;
  email: string;
  name: string | null;
  idVendedor?: number | null;
  empresa?: Empresa[];
}
