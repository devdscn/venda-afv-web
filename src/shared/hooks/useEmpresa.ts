import { useEffect, useState } from 'react';

import { EmpresaTypes } from '../types/EmpresaTypes';

const useEmpresa = () => {
  const [empresa, setEmpresa] = useState<EmpresaTypes>({
    id: 3,
    fantasia: '',
    razaSocial: '',
  });

  const handleEmpresa = (value: string) => {
    setEmpresa({
      ...empresa,
      id: Number(value),
    });
    console.log(value);
  };

  useEffect(() => {
    setEmpresa(empresa);
  }, [empresa]);

  return { empresa, setEmpresa, handleEmpresa };
};

export default useEmpresa;
