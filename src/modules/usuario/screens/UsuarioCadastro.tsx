import { Button, Flex, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { URL_VENDEDORES } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCadastraUsuario } from '../hooks/useCadastraUsuario';
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
  const {
    usuario,
    loading,
    disablebButton,
    handleEmail,
    handleName,
    handlePassword,
    handleVendedor,
    handleCadastroUsuario,
  } = useCadastraUsuario();
  const { vendedores, setVendedores } = useDataContext();

  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if (vendedores.length === 0) {
      request(URL_VENDEDORES, MethodsEnum.GET, setVendedores);
    }
  }, []);

  const handleOnClickCancelar = () => {
    navigate(UsuarioRoutesEnum.USUARIOS);
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
          name: 'Cadastrar Usuário',
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
          <Input
            value={usuario.email}
            placeholder="e-mail"
            type="email"
            onChange={handleEmail}
          />
        </Form.Item>

        <Form.Item name={'nome'} label="Nome" rules={[{ required: true }]}>
          <Input
            value={usuario.name}
            placeholder="nome"
            type="text"
            onChange={handleName}
          />
        </Form.Item>

        <Form.Item name={'password'} label="Senha" rules={[{ required: true }]}>
          <Input
            value={usuario.password}
            placeholder="password"
            type="password"
            onChange={handlePassword}
          />
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
            onChange={handleVendedor}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Flex wrap="wrap" gap="small">
            <Button
              loading={loading}
              disabled={disablebButton}
              type="primary"
              htmlType="submit"
              onClick={handleCadastroUsuario}
            >
              Gravar
            </Button>

            <Button type="dashed" danger onClick={handleOnClickCancelar}>
              Cancelar
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Screen>
  );
};

export default UsuarioCadastro;
