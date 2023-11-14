/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import './login.css';
import appFirebase from './credenciales'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { async } from '@firebase/util'
const auth = getAuth(appFirebase)

const LoginPage = () => {

    const [registrando, setRegistrando] = useState(false)

    const functAutenticacion = async(e)=>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth,correo, contraseña)
            } catch (error) {
                alert('Asegurese que la contraseña tenga mas de 8 caracteres')
            }
        }
        else{
            try {
                await signInWithEmailAndPassword(auth,correo,contraseña)    
            } catch (error) {
                alert('El correo o la contraseña son incorrectos')
            }
            
        }
    }

  return (
 
    <div className="login-card">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <h2>BIENVENIDO</h2>
              <img src='https://cdn-icons-png.flaticon.com/512/1405/1405981.png' alt="" className="img-inicio" />
              <form className="" onSubmit={functAutenticacion}>
                <h3>usuario o email</h3>
                <input
                  type="text"
                  placeholder="Ingresar email"
                  className="cajatexto"
                  id='email'
                  required
                />
<h3>contraseña</h3>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresar contraseña"
                  className="cajatexto"
                  required
                />

                <button className="btnform form-control">
                  {registrando ? "Registrate" : "Inicia Sesion"}
                </button>
              </form>
              <h4 className="texto">
                {registrando ? "Si ya tienes cuenta" : "Aun no tienes cuenta?"}{" "}
                <br></br>
                <button
                  className="btnswitch"
                  onClick={() => setRegistrando(!registrando)}
                >
                  {registrando ? "Inicia Sesion" : "Registrate"}
                </button>
              </h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;