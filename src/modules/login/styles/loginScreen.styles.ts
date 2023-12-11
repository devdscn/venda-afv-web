import styled from 'styled-components';

export const ContainerLogin = styled.section`
  display: flex;
  align-items: center; /* Alinhamento vertical */
  justify-content: center; /* Alinhamento horizontal */

  //padding: 22px;

  width: 100%;
  height: 300px;
  max-width: 480px;
  // background: #fff;
  background-color: #d9d9d9;

  margin: 150px auto;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .login-form {
    max-width: 400px;
    width: 100%;
  }
  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
  .login {
    text-align: center;
  }
`;
