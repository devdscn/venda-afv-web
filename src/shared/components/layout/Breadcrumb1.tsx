import { Breadcrumb as BreadcrumbAntd, Select } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_EMPRESAS } from '../../constants/urls';
import { MethodsEnum } from '../../enums/methods.enum';
import { useDataContext } from '../../hooks/useDataContext';
import useEmpresa from '../../hooks/useEmpresa';
import { useRequests } from '../../hooks/useRequests';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

const Breadcrumb1 = ({ listBreadcrumb }: BreadcrumbProps) => {
  const { empresas, setEmpresas } = useDataContext();
  const { handleEmpresa } = useEmpresa();

  const { request } = useRequests();
  const navigate = useNavigate();

  const handleGoToClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  useEffect(() => {
    if (!empresas || empresas.length === 0) {
      request(URL_EMPRESAS, MethodsEnum.GET, setEmpresas);
    }
  }, [empresas]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <BreadcrumbAntd
          style={{ margin: '12px 0', fontSize: 16 }}
          className="xxxxxxxxxxxxxxxx"
        >
          {listBreadcrumb.map((breadcrumb, index) => (
            <BreadcrumbAntd.Item key={`breadcrumb_${index}`}>
              {breadcrumb.navigateTo ? (
                <a onClick={() => handleGoToClick(breadcrumb.navigateTo || '')}>
                  {breadcrumb.name}
                </a>
              ) : (
                breadcrumb.name
              )}
            </BreadcrumbAntd.Item>
          ))}
        </BreadcrumbAntd>
        <Select
          showSearch
          style={{ width: '25%' }}
          placeholder="selecionar empresa"
          options={empresas.map((empresa) => ({
            value: `${empresa.id}`,
            label: ` ${empresa.id} - ${empresa.fantasia}`,
          }))}
          onChange={handleEmpresa}
        />
      </div>
    </>
  );
};

export default Breadcrumb1;
