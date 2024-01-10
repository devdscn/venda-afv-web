import {
  DatabaseOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Divider, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';

import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb ';

interface ScreenPops {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('', '', <DatabaseOutlined />),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
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

const Screen = ({ children, listBreadcrumb }: ScreenPops) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('clickado ', e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>

        <Content style={{ margin: '0 16px' }}>
          {listBreadcrumb && (
            <>
              <Breadcrumb listBreadcrumb={listBreadcrumb} />
              <Divider style={{ margin: '2px 0' }} />
            </>
          )}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Screen;
