import { Layout } from 'antd';

import Breadcrumb, { ListBreadcrumb } from './Breadcrumb1';

const { Content } = Layout;

interface ScreenPops {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const ContentBreadCrump = ({ children, listBreadcrumb }: ScreenPops) => {
  return (
    <Content style={{ padding: '0px 24px ' }} className="ContentBreadCrump">
      {listBreadcrumb && (
        <>
          <Breadcrumb listBreadcrumb={listBreadcrumb} />
        </>
      )}
      {children}
    </Content>
  );
};

export default ContentBreadCrump;
