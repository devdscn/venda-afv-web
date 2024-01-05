import { Divider } from 'antd';

import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb ';
import { ScreenContainer } from './screen.style';

interface ScreenPops {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenPops) => {
  return (
    <ScreenContainer>
      {listBreadcrumb && (
        <>
          <Breadcrumb listBreadcrumb={listBreadcrumb} />
          <Divider />
        </>
      )}
      {children}
    </ScreenContainer>
  );
};

export default Screen;
