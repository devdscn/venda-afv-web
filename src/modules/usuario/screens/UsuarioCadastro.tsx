import { Button, Flex, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { URL_USUARIO, URL_VENDEDORES } from '../../../shared/constants/urls';
import { CadastroUsuario } from '../../../shared/dtos/CadastroUsuario.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
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
  const { setNotification } = useGlobalContext();
  const [usuario, setUsuario] = useState<CadastroUsuario>({
    email: '  ',
    name: '',
    password: '',
    idVendedor: 0,
  });
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if (vendedores.length === 0) {
      request(URL_VENDEDORES, MethodsEnum.GET, setVendedores);
    }
  }, []);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      email: event.target.value,
    });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      name: event.target.value,
    });
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      password: event.target.value,
    });
  };

  const handleVendedor = (value: string) => {
    setUsuario({
      ...usuario,
      idVendedor: Number(value),
    });
  };

  const handleCadastroUsuario = async () => {
    await connectionAPIPost(URL_USUARIO, usuario)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Usuário cadastrado com sucesso!');
        navigate(UsuarioRoutesEnum.USUARIOS);
      })
      .catch((error: Error) => {
        setNotification('Falha!', 'error', error.message);
      });
  };

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
            <Button type="primary" htmlType="submit" onClick={handleCadastroUsuario}>
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
