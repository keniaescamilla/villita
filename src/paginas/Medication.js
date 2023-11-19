import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './login.css';

function MedicationTable() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hoursToAdd, setHoursToAdd] = useState('');
    const [resultTime, setResultTime] = useState('');
    const [resultTimeFila, setResultTimeFila] = useState('');
    const [timeCategory, setTimeCategory] = useState('');
    const [originalTime, setOriginalTime] = useState('');
    const [inputHours, setInputHours] = useState('');//mismas??
    const [medications, setMedications] = useState([]);
    const [NombreMed, setNombreMed] = useState('');
    const [DosisMed, setDosisMed] = useState('');
    const [medicationinputHours, setMedicationinputHours] = useState('');//mismas??
    const [DiasMed, setDiasMed] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMedicationIndex, setCurrentMedicationIndex] = useState(null);
    const [data, setData] = useState({
        morning: [],
        noon: [],
        evening: [],
        night: [],
        // only: [],
      });
      const [TablaOnly,setTablaOnly] = useState([
        { name: 'only', color: '#AAD1BD', image: 'https://cdn-icons-png.flaticon.com/512/482/482004.png', nextSuggestedTime: null},
    ]);
    const addMedication = () => {
        const newMedication = {
            name: NombreMed,
            dose: DosisMed,
            input: inputHours,
            duration: DiasMed,
            taken: false,
            proximaToma: null,
            nextSuggestedTime: null,
        };
        // Agregar la nueva dosis
        setMedications([...medications, newMedication]);
    
        // Limpiar los campos después de agregar
        setNombreMed('');
        setDosisMed('');
        setMedicationinputHours('');
        setDiasMed('');
    };
    
    const Check = (index) => {
        const updatedMedications = [...medications];
        const medicationToMove = updatedMedications[index];
      
        if (!medicationToMove) {
          // Evitar errores si el elemento no está definido
          return;
        }
      
        updatedMedications.splice(index, 1);
      
        if (medicationToMove.taken) {
          const category = momentIndex(new Date().getHours());
      
          const newData = {
            name: medicationToMove.name,
            dose: medicationToMove.dose,
            duration: medicationToMove.duration,
            inputHours: hoursToAdd,
            originalTime: originalTime,
            resultTime: resultTime,
            resultTimeFila: resultTime + hoursToAdd,
          };
      
          setData((prevData) => ({
            ...prevData,
            [category]: [...prevData[category], newData],
          }));
        }
      
        const newTime = new Date(currentTime);
        const original = new Date(currentTime); // Guarda la hora original
        newTime.setHours(newTime.getHours() + parseInt(hoursToAdd, 10));
      
        const hours = newTime.getHours();
        const category = momentIndex(hours);
      
        const formattedHours = formatTime(newTime);
      
        setResultTime(formattedHours);
        setTimeCategory(category);
        setOriginalTime(formatTime(original));
        setDiasMed(DiasMed)
        setInputHours(hoursToAdd);
        setNombreMed(NombreMed);
      
        const newData = {
          name: medicationToMove.name,
          DosisMed: DosisMed,
          DiasMed: medicationToMove.dose,
          hoursToAdd: hoursToAdd,
          originalTime: formatTime(original),
          resultTime: formattedHours,
          resultTimeFila: resultTime + hoursToAdd,
        };
      
        setData((prevData) => ({
          ...prevData,
          [category]: [...prevData[category], newData],
        }));
      
        setMedications(updatedMedications);
      };
      
      const CheckDos = (index) => {
        const updatedMedications = [...medications];
      
        if (updatedMedications[index]) {
          updatedMedications[index].taken = !updatedMedications[index].taken;
      
          if (updatedMedications[index].taken) {
            const { name, dose, input, duration } = updatedMedications[index];
            const onlyMed = {
              name,
              dose,
              input,
              duration,
            };
      
            setTablaOnly([...TablaOnly, onlyMed]);
          }
      
          setMedications(updatedMedications);
        }
      };
      const CheckEnMomentos= (index) => {
        const updatedMedications = [...medications];
        const medicationToMove = updatedMedications[index];
      
        if (!medicationToMove) {
          // Evitar errores si el elemento no está definido
          return;
        }
      
        updatedMedications.splice(index, 1);
      
        if (medicationToMove.taken) {
          const category = momentIndex(new Date().getHours());
      
          const newData = {
            name: medicationToMove.name,
            dose: medicationToMove.dose,
            duration: medicationToMove.duration,
            inputHours: hoursToAdd,
            originalTime: originalTime,
            resultTime: resultTime,
            resultTimeFila: resultTime + hoursToAdd,
          };
      
          setData((prevData) => ({
            ...prevData,
            [category]: [...prevData[category], newData],
          }));
        }
      
        const newTime = new Date(currentTime);
        const original = new Date(currentTime); // Guarda la hora original
        newTime.setHours(newTime.getHours() + parseInt(hoursToAdd, 10));
      
        const hours = newTime.getHours();
        const category = momentIndex(hours);
      
        const formattedHours = formatTime(newTime);
      
        setResultTime(formattedHours);
        setTimeCategory(category);
        setOriginalTime(formatTime(original));
        setDiasMed(DiasMed)
        setInputHours(hoursToAdd);
        setNombreMed(NombreMed);
      
        const newData = {
          name: medicationToMove.name,
          DosisMed: DosisMed,
          DiasMed: medicationToMove.dose,
          hoursToAdd: hoursToAdd,
          originalTime: formatTime(original),
          resultTime: formattedHours,
          resultTimeFila: formattedHours,

        };
      
        setData((prevData) => ({
          ...prevData,
          [category]: [...prevData[category], newData],
        }));
      
        setMedications(updatedMedications);
      };
      

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
const momentIndex = (hours) => {
    if (hours >= 0 && hours < 11) {
      return 'morning';
    } else if (hours >= 11 && hours < 17) {
      return 'noon';
    } else if (hours >= 17 && hours < 19) {
      return 'evening';
    } else {
      return 'night';
    }
  };
const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    return `${hours % 12 || 12}:${minutes} ${ampm}`;
  
    };
    const renderTable = (category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Data</h3>
          <table className='tablita'>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Days</th>
                <th>Dose</th>
                <th>Interval</th>
                <th>hora de toma</th>
                <th>tomada o unica toma</th>
                <th>Siguiente</th>
                <th>Siguiente toma</th>
              </tr>
            </thead>
            <tbody>
              {data[category].map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.DiasMed}</td>
                  <td>{item.DosisMed}</td>
                  <td>{item.hoursToAdd}</td>
                  <td>{item.resultTime}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.taken}
                      onChange={() => {
                        setCurrentMedicationIndex(index);
                        CheckEnMomentos(index);
                      }}
                    />
                    <label> Tomada</label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => {
                        setCurrentMedicationIndex(index);
                        CheckDos(index);
                      }}
                      checked={item.taken}
                    />
                    <label>Toma Unica</label>
                  </td>
                  {/* <td>
                    ll
                    {item.taken ? (item.proximaToma ? formatTime(item.proximaToma) : null) : null}
                  </td> */}
                  {/* <td>
                    lkl
                    {item.taken ? (
                      <React.Fragment>
                        <p>Siguiente toma: {resultTime}</p>
                        <p>Momento del dia: {timeCategory}</p>
                      </React.Fragment>
                    ) : null}
                  </td> */}
                  <td>
                    
                    {item.taken ? (
                      <React.Fragment>
                        <p>Siguiente toma: {resultTime}</p>
                        <p>Momento del dia: {timeCategory}</p>
                      </React.Fragment>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
   
    
    return (
        <div>
            <h2>CUADRO DE MEDICAMENTOS</h2>
        <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
             {/* Botón para abrir el modal */}
             <button className = "button"onClick={openModal}>
                Agregar Medicamento
            </button>

            {/* Modal */}
            <Modal className = "modal"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Agregar Medicamento"
            >
                
                <h2 className='modal-content'>Agregar Medicamento</h2>
                <form>
                    {/* Agrega aquí los campos del formulario */}
<p>Nombre de la medicacion</p>
                    <input
                        type="text"
                        placeholder="Formula"
                        value={NombreMed}
                        onChange={(e) => setNombreMed(e.target.value)}
                    />
                    <p>Dosis Requeridas</p>
                    <input
                        type="text"
                        placeholder="Dosis"
                        value={DosisMed}
                        onChange={(e) => setDosisMed(e.target.value)}
                    />
                    <p>Intervalo de hrs entre Dosis</p>
                    <input
            type="number"
            value={hoursToAdd}
            onChange={(e) => setHoursToAdd(e.target.value)}
          />
          <p>Dias de Tratamiento</p>
                    <input
                        type="number"
                        placeholder="Duración (en días)"
                        value={DiasMed}
                        onChange={(e) => setDiasMed(e.target.value)}
                    />
                    <br></br>
                    <button type="button" onClick={addMedication}>
                        Agregar
                    </button>
                    
                    <br></br>
                    <button onClick={closeModal}>Listo!</button>
                </form>
               
            </Modal>
           
<div className='tablita'>
            <table className="table-card">


            <h4>TUS MEDICAMENTOS PENDIENTES</h4>
               
                <tbody className='tablita'>
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <br></br>
                        <th>Dosis</th>
                        
                        <th>Tomada o unica dosis </th>
                        <br></br>
                        <br></br>
                       
                        <th>  Hora de Toma</th>
                    </tr>
                </thead>
                    {medications.map((medication, index) => (
                        <tr key={index}>
                            
                            <td>{medication.name}</td>
                            <td>{medication.dose}</td>
                            <td>{  <p>Tomar cada: {medication.input} hrs, por {medication.duration} dias </p>}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={medication.taken}
                                    onChange={() => {
                                        setCurrentMedicationIndex(index);
                                        Check(index);
                                    }}
                                />
                                <label> Tomada</label>
                                <td>
                                <input
    type="checkbox"
    onChange={() => {
        setCurrentMedicationIndex(index);
        CheckDos(index);
    }}
    checked={medication.taken}
/>
<label>Toma Unica</label>

                                </td>
                            </td>
                            <td>
                                {medication.taken ? (medication.proximaToma ? formatTime(medication.proximaToma) : null) : null}
                            </td>
                            <td>
            <p>Siguiente toma: {resultTime}</p>
            <p>Momento del dia: {timeCategory}</p>
           
        </td>
                            <td>{medication.nextSuggestedTime ? formatTime(medication.nextSuggestedTime) : '-'}
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
                
            </table>
            </div>
            <div className='medication-table'>
            <h1>SUGERENCIAS DE TOMA</h1>
        {Object.keys(data).map((category) => renderTable(category))}
        <table className="medication-table">
        <thead>
            <tr>
               
                <th>Nombre del Medicamento</th>
                <th>Dosis</th>
                <th>Tomado</th>
            </tr>
            {TablaOnly.length > 0 && (
                <tr>
                    <td colSpan="4" style={{ backgroundColor: TablaOnly[0].color }}>
                        <img src={TablaOnly[0].image} alt={TablaOnly[0].name} />
                    </td>
                </tr>
            )}
        </thead>
        <tbody className='tablita'>
<div className='only'>
<td colSpan="4" style={{ backgroundColor: TablaOnly[0].color }}>
                        {/* <img src={TablaOnly[0].image} alt={TablaOnly[0].name} /> */}
                    </td>

</div>
            {TablaOnly.map((moment, index) => (
                index !== 0 && (
                    <tr key={index} className={`moment-${index}`}>
                         <div>
                         </div>
                        
                        <td>{moment.name}</td>
                        {medications.some(medication => moment.name.toLowerCase() === medication.name.toLowerCase()) && (
                            <React.Fragment>
                                <td>
                                    {medications.find(medication => moment.name.toLowerCase() === medication.name.toLowerCase()).dose}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={moment.taken}
                                        onChange={() => CheckDos(index)}
                                    />
                                </td>
                            </React.Fragment>
                        )}
                    </tr>
                )
            ))}
        </tbody>
    </table>
      </div>
        </div>
    );
}
export default MedicationTable;
           