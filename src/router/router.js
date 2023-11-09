import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../paginas/LoginPage';
import MedicationTable from '../paginas/MedicationTable.JS';



function RouterComponent() {
  // Simula el estado de inicio de sesión
  const isLoggedIn = false; // Cambia esto según tu lógica de inicio de sesión

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/MedicationTable">Tabla de Medicamentos</Link>
            </li>
            {/* Otros enlaces de navegación que desees agregar */}
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/login">
          {/* Página de inicio de sesión */}
          {isLoggedIn ? <Redirect to="/MedicationTable" /> : <LoginPage />}
        </Route>

        <Route exact path="/MedicationTable">
          {/* Página de MedicationTable */}
          {isLoggedIn ? <MedicationTable /> : <Redirect to="/login" />}
        </Route>

        {/* Otras rutas de tu aplicación */}
      </Switch>
    </Router>
  );
}

export default RouterComponent;
