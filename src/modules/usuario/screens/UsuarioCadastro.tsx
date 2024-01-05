import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';

import Screen from '../../../shared/components/screen/Screen';
import { URL_VENDEDORES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { UsuarioRoutesEnum } from '../routes';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} não é um e-mail válido!',
    number: '${label} não é um numero válido!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const UsuarioCadastro: React.FC = () => {
  const { vendedores, setVendedores } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (vendedores.length === 0) {
      request(URL_VENDEDORES, MethodsEnum.GET, setVendedores);
    }
  }, []);

  const handleChange = (value: number) => {
    console.log(`vendedor ${value}`);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Home',
        },
        {
          name: 'Usuários',
          navigateTo: UsuarioRoutesEnum.USUARIOS,
        },

        {
          name: 'Cadastrar usuário',
        },
      ]}
    >
      <Form
        name="nest-messages"
        style={{ maxWidth: 600 }}
        {...layout}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'email'}
          label="Email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="e-mail" type="email" />
        </Form.Item>

        <Form.Item name={'nome'} label="Nome" rules={[{ required: true }]}>
          <Input placeholder="nome" type="text" />
        </Form.Item>

        <Form.Item name={'password'} label="Senha" rules={[{ required: true }]}>
          <Input placeholder="password" type="password" />
        </Form.Item>

        <Form.Item name={'vendedor'} label="Vendedor">
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="selecionar vendedor"
            options={vendedores.map((vendedor) => ({
              value: `${vendedor.idVendedor}`,
              label: ` ${vendedor.idVendedor}-${vendedor.nome}`,
            }))}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Gravar
          </Button>
        </Form.Item>
      </Form>
    </Screen>
  );
};

export default UsuarioCadastro;
