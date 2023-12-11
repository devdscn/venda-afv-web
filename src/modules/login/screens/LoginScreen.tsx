/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import { ContainerLogin } from '../styles/loginScreen.styles';

const { Title } = Typography;

const LoginScreen: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleLogin = async () => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost/users/login',
      data: {
        email: email,
        password: password,
      },
    });
    console.log(response);
  };

  return (
    <ContainerLogin>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} className="login">
          LOGIN
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
