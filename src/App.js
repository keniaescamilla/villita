// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import LoginPage from './paginas/LoginPage';
// import MedicationTable from './paginas/Medication';

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/login">Iniciar Sesión</Link>
//             </li>
//             <li>
//               <Link to="/MedicationTable">Medication Table</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Aquí colocamos los componentes LoginPage y MedicationTable */}
//       <Route exact path="/login" component={LoginPage} />
//       <Route exact path="/MedicationTable" component={MedicationTable} />
//       {/* Otras rutas de tu aplicación */}
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import LoginPage from './paginas/LoginPage';

// function App() {
//   return (
//     <div className="App">
//       <LoginPage />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginPage from './paginas/LoginPage';
import MedicationTable from './paginas/Medication';
import Calculadora from './paginas/calculadora';
import Meds from './paginas/MedicationTracker';

function App() {
  return (
    <Router>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/MedicationTable" component={MedicationTable} />
      <Route exact path="/Calculadora" component={Calculadora} />
      <Route exact path="/Meds" component={Meds} />
      
    </Router>
    
  );
}

export default App;

