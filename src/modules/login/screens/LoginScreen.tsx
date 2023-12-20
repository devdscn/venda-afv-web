import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Typography } from 'antd';
import React, { useState } from 'react';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ContainerLogin } from '../styles/loginScreen.styles';
import { UserType } from '../types/UserType';

const { Title } = Typography;

const LoginScreen: React.FC = () => {
  //hook personalizado useContext
  const { accessToken, setAccessToken } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const user = await postRequest<UserType>('/users/login', {
      email: email,
      password: password,
    });

    setAccessToken(user?.token || '');
    console.log(`Token:${accessToken}`);
  };

  return (
    <ContainerLogin>
      <Form
        onSubmitCapture={handleLogin}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Title level={2} className="login">
          LOGIN {accessToken}
        </Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            type="email"
            size="large"
            onChange={handleEmail}
            value={email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
            onChange={handlePassword}
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </ContainerLogin>
  );
};

export default LoginScreen;
