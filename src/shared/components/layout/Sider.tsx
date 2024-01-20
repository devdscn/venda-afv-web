import {
  BoxPlotFilled,
  EyeFilled,
  HomeOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import { EmpresaRoutesEnum } from '../../../modules/empresa/routes';
import { ProdutoRoutesEnum } from '../../../modules/produto/routes';
import { UsuarioRoutesEnum } from '../../../modules/usuario/routes';
import { useGlobalContext } from '../../hooks/useGlobalContext';

const { Sider: SiderAntD } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  getItem('Principal', '', <HomeOutlined />),
  getItem('Usuários', 'usuario', <UserOutlined />, [
    getItem('Visualizar', 'usuarios'),
    getItem('Cadastrar', 'usuarios_cadastrar'),
  ]),
  getItem('Empresas', 'empresa', <ShopOutlined />, [getItem('Visualizar', 'empresas')]),
  getItem('Vendedores', 'vendedor', <TeamOutlined />, [
    getItem('Visualizar', 'vendedores'),
  ]),

  getItem('Produtos', 'produto', <BoxPlotFilled />, [
    getItem('Visualizar', 'produtos_lista', <EyeFilled />),
  ]),
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sider = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { itemSelectedMenu, setitemSelectedMenu, selectedMenu } = useGlobalContext();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setitemSelectedMenu([e.key]);

    switch (e.key) {
      case 'usuarios':
        navigate(UsuarioRoutesEnum.USUARIOS);
        break;

      case 'usuarios_cadastrar':
        navigate(UsuarioRoutesEnum.USUARIO_STORE);
        break;

      case 'empresas':
        navigate(EmpresaRoutesEnum.EMPRESAS);
        break;

      case 'produtos_lista':
        navigate(ProdutoRoutesEnum.PRODUTO_EMPRESA);
        break;
    }
  };

  //const [collapsed, setCollapsed] = useState(false);

  return (
    <SiderAntD
      style={{ background: colorBgContainer }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        //  defaultSelectedKeys={['empresas']}
        defaultOpenKeys={selectedMenu}
        selectedKeys={itemSelectedMenu}
        style={{ height: '100%', borderRadius: borderRadiusLG }}
        items={items}
        onClick={onClick}
      />
    </SiderAntD>
  );
};

export default Sider;
