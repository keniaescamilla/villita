import React, { useState } from 'react';
import Modal from 'react-modal';
import './login.css';

function MedicationTable() {
    const [medications, setMedications] = useState([]);
    const [medicationName, setMedicationName] = useState('');
    const [medicationDose, setMedicationDose] = useState('');
    const [medicationInterval, setMedicationInterval] = useState('');
    const [medicationDuration, setMedicationDuration] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const momentsOfDay = ['Morning', 'Noon', 'Evening', 'Night', 'Only'];
    const [currentMedicationIndex, setCurrentMedicationIndex] = useState(null);

    const addMedication = () => {
        const newMedication = {
            name: medicationName,
            dose: medicationDose,
            interval: medicationInterval,
            duration: medicationDuration,
            taken: false,
            proximaToma: null,
            nextSuggestedTime: null,
        };
        setMedications([...medications, newMedication]);
        // Limpiar los campos después de agregar
        setMedicationName('');
        setMedicationDose('');
        setMedicationInterval('');
        setMedicationDuration('');
    };

    const toggleTaken = (index) => {
        const updatedMedications = [...medications];
        updatedMedications[index].taken = !updatedMedications[index].taken;

        if (updatedMedications[index].taken) {
            // Registra la hora exacta de la toma en la fila actual
            updatedMedications[index].proximaToma = new Date();
            // Calcula la próxima hora sugerida de toma
            updatedMedications[index].nextSuggestedTime = calculateproximaToma(
                updatedMedications[index].proximaToma,
                updatedMedications[index].interval
            );
        } else {
            // Si la toma se marca como no tomada, limpia tanto "Hora de Toma" como "Sugerencia de Siguiente Toma"
            updatedMedications[index].proximaToma = null;
            updatedMedications[index].nextSuggestedTime = null;
        }

        // Si aún hay dosis por tomar, calcula la próxima toma
        if (updatedMedications[index].proximaToma && updatedMedications[index].duration > 1) {
            updatedMedications[index].duration--;

            // Agrega la siguiente toma a la tabla
            if (updatedMedications[index].duration > 0) {
                const nextDose = {
                    name: updatedMedications[index].name,
                    dose: updatedMedications[index].dose,
                    interval: updatedMedications[index].interval,
                    duration: updatedMedications[index].duration,
                    taken: false, // Inicializamos en falso, sin llenar la "Hora de Toma"
                    proximaToma: null, // Inicializamos en null
                    nextSuggestedTime: null, // Inicializamos en null
                };
                updatedMedications.splice(index + 1, 0, nextDose);
            }
        }

        setMedications(updatedMedications);
    };

    const calculateproximaToma = (currentTime, interval) => {
    if (!currentTime) {
        // Si es la primera toma, toma la hora actual
        return new Date();
    } else {
        const proximaToma = new Date(currentTime);
        
        proximaToma.setHours(proximaToma.getHours()+interval*13);
        console.log(interval)
        return proximaToma;
    }
};

    const formatTime = (time) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return time.toLocaleTimeString(undefined, options);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const momentsOfDay = [
        { name: 'Morning',color: '#FF8C7B', image: 'https://cdn-icons-png.flaticon.com/512/10413/10413664.png' },
        { name: 'Noon',color: '#FBEE80', image: 'https://cdn-icons-png.flaticon.com/512/10414/10414424.png' },
        { name: 'Evening', color: '#5FA88E',image: 'https://cdn-icons-png.flaticon.com/512/6597/6597319.png' },
        { name: 'Night',color: '#7985A2', image: 'https://cdn-icons-png.flaticon.com/512/3094/3094125.png' },
        { name: 'only', color: '#AAD1BD',image: 'https://cdn-icons-png.flaticon.com/512/482/482004.png' },
    ];
    return (
        <div className="login-card">
            <h2>CUADRO DE MEDICAMENTOS</h2>
             {/* Botón para abrir el modal */}
             <button onClick={openModal}>
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
                    <input
                        type="text"
                        placeholder="Nombre del Medicamento"
                        value={medicationName}
                        onChange={(e) => setMedicationName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Dosis"
                        value={medicationDose}
                        onChange={(e) => setMedicationDose(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Intervalo (en horas)"
                        value={medicationInterval}
                        onChange={(e) => setMedicationInterval(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Duración (en días)"
                        value={medicationDuration}
                        onChange={(e) => setMedicationDuration(e.target.value)}
                    />
                    <br></br>
                    <button type="button" onClick={addMedication}>
                        Agregar
                    </button>
                    <br></br>
                    <button onClick={closeModal}>Listo!</button>
                </form>
               
            </Modal>
           
<div className='table-card'>
<h1>TUS MEDICAMENTOS</h1>
            <table className="medication-table">
                <thead>
                    <tr>
                        <th>Nombre del Medicamento</th>
                        <th>Dosis</th>
                        <th>Intervalo (hrs)</th>
                        <th>Tomada</th>
                        <th>Hora de Toma</th>
                        <th>Sugerencia de Siguiente Toma</th>
                    </tr>
                </thead>
                <tbody className='tablita'>
                    {medications.map((medication, index) => (
                        <tr key={index}>
                            
                            <td>{medication.name}</td>
                            <td>{medication.dose}</td>
                            <td>{medication.interval}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={medication.taken}
                                    onChange={() => {
                                        setCurrentMedicationIndex(index);
                                        toggleTaken(index);
                                    }}
                                />
                            </td>
                            <td>
                                {medication.taken ? (medication.proximaToma ? formatTime(medication.proximaToma) : null) : null}
                            </td>
                            <td>{medication.nextSuggestedTime ? formatTime(medication.nextSuggestedTime) : '-'}
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
            <div className='table-card'>
            <h1>SUGERENCIAS DE TOMA</h1>
            <table className="medication-table">
                <thead>
                    <tr>
                        <th>MOMENTO DEL DIA</th>
                        <th>Medicamento</th>
                        <th>Dosis</th>
                        <th>Intervalo (hrs)</th>
                        <th>Tomada</th>
                        <th>Hora de Toma</th>
                        
                    </tr>
                </thead>
                <tbody className='tablita'>
              
                      
                        {momentsOfDay.map((moment, index) => (
                            <React.Fragment key={index}>
                               
                            < tr key={index} className={`moment-${index}`}>
                                <td style={{ backgroundColor: moment.color }}><img src={moment.image} alt={moment.name} /></td>
                                {/* Puedes llenar las otras columnas según tu lógica */}
                                <td ></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* {Array.from({ length: 4 }, (_, childIndex) => (
                                <tr key={`child-${index}-${childIndex}`} className={`child-row-${childIndex}`} colSpan="6">
                                    Contenido de las filas secundarias
                                </tr>
                            ))} */}
                        </React.Fragment>
                        ))}
                    </tbody>
            </table>
            </div>
        </div>
    );
}

export default MedicationTable;