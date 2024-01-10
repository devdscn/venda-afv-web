import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header: HeaderAntD } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Header = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <HeaderAntD
      style={{
        display: 'flex',
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
