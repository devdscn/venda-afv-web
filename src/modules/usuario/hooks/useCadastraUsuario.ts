import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USUARIO } from '../../../shared/constants/urls';
import { CadastroUsuario } from '../../../shared/dtos/CadastroUsuario.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { UsuarioRoutesEnum } from '../routes';

export const useCadastraUsuario = () => {
  const { setNotification } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [disablebButton, setDisabledButton] = useState(true);
  const [usuario, setUsuario] = useState<CadastroUsuario>({
    email: '  ',
    name: '',
    password: '',
    idVendedor: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario.name && usuario.email && usuario.password) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [usuario]);

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
    setLoading(true);
    await connectionAPIPost(URL_USUARIO, usuario)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Usuário cadastrado com sucesso!');
        navigate(UsuarioRoutesEnum.USUARIOS);
      })
      .catch((error: Error) => {
        setNotification('Erro!', 'error', error.message);
      });
    setLoading(false);
  };

  return {
    usuario,
    loading,
    disablebButton,
    handleEmail,
    handleName,
    handlePassword,
    handleVendedor,
    handleCadastroUsuario,
  };
};
