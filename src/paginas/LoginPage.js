import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './login.css'; // Importa tu archivo CSS

const LoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (

    <div className="login-card">
        <h1>AGENDA DE MEDICAMENTOS</h1>
        <br></br>
        <img src='https://cdn-icons-png.flaticon.com/512/1405/1405981.png' alt='wow'></img>
      <h1>Iniciar sesión con Google</h1>

      <GoogleLogin
        clientId="51789054220-em7uhdls9qi3lsjecphmhc984cb0l72b.apps.googleusercontent.com"
        buttonText="Iniciar sesión con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default LoginPage;
