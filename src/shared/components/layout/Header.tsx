import { LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Popconfirm, theme } from 'antd';

import { logOut } from '../../functions/connection/auth';
import { useGlobalContext } from '../../hooks/useGlobalContext';

const { Header: HeaderAntD } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Header = () => {
  const { user } = useGlobalContext();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <HeaderAntD
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: borderRadiusLG,
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
      <div className="MeuLogout" style={{ display: 'flex', alignItems: 'center' }}>
        <Popconfirm
          placement="left"
          title={'Logout'}
          description={`${user?.name}, deseja sair?`}
          cancelText="Cancelar"
          okText="Sim"
          disabled={false}
          onConfirm={logOut}
        >
          <LogoutOutlined style={{ fontSize: '22px', color: '#f5f9fa' }} />
        </Popconfirm>
      </div>
    </HeaderAntD>
  );
};
export default Header;

/*
padding: 0,
marginLeft: 24,
marginRight: 24,
  backgroundColor: colorBgContainer,
*/
