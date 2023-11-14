/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
// importando los modulos de firebase
import appFirebase from './credenciales'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LoginPage from '../paginas/LoginPage';
import MedicationTable from './Medication';
const auth = getAuth(appFirebase)

// importar los componentes



function App() {
  
  const [usuario,setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase)
    }
    else
    {setUsuario(null)}
  })

  return (
   <div>
      {usuario ? <MedicationTable correoUsuario = {usuario.email} /> : <LoginPage/>}
   </div>
  )
}

export default App