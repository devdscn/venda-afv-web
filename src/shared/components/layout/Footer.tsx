import { Layout } from 'antd';

const { Footer: FooterAntD } = Layout;

const Footer = () => {
  return (
    <FooterAntD style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by MDE Commerce
    </FooterAntD>
  );
};
export default Footer;
