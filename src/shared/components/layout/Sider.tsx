import {
  HomeOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import { UsuarioRoutesEnum } from '../../../modules/usuario/routes';

const { Sider: SiderAntD } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  getItem('Principal', '', <HomeOutlined />),
  getItem('Usuários', 'usuario', <UserOutlined />, [
    getItem('Visualizar', 'usuarios'),
    getItem('Cadastrar', 'usuarios_cadastrar'),
  ]),
  getItem('Empresas', 'empresas', <ShopOutlined />, [getItem('Visualizar', 'empresas')]),
  getItem('Vendedores', 'vendedores', <TeamOutlined />, [
    getItem('Visualizar', 'empresas'),
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

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'usuarios':
        navigate(UsuarioRoutesEnum.USUARIOS);
        break;

      case 'usuarios_cadastrar':
        navigate(UsuarioRoutesEnum.USUARIO_STORE);
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
        defaultSelectedKeys={['usuarios_cadastrar']}
        defaultOpenKeys={['usuario']}
        style={{ height: '100%', borderRadius: borderRadiusLG }}
        items={items}
        onClick={onClick}
      />
    </SiderAntD>
  );
};

export default Sider;
