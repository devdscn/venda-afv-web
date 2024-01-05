import { createContext, useContext, useState } from 'react';

import { ProdutoTypes } from '../../modules/produto/types/ProdutoTypes';
import { UsuarioTypes } from '../types/UsuarioTypes';
import { VendedorTypes } from '../types/VendedorTypes';

interface DataContext {
  produtos?: ProdutoTypes[];
  usuarios?: UsuarioTypes[];
  vendedores?: VendedorTypes[];
}

interface DataContextProps {
  data: DataContext;
  setData: (data: DataContext) => void;
}

const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({});

  return (
    <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setProdutos = (produtos: ProdutoTypes[]) => {
    setData({ ...data, produtos });
  };

  const setUsuarios = (usuarios: UsuarioTypes[]) => {
    setData({ ...data, usuarios });
  };

  const setVendedores = (vendedores: VendedorTypes[]) => {
    setData({ ...data, vendedores });
  };

  return {
    produtos: data?.produtos || [],
    usuarios: data?.usuarios || [],
    vendedores: data?.vendedores || [],
    setProdutos,
    setUsuarios,
    setVendedores,
  };
};
