import React, { useState } from 'react';
import './login.css';

function MedicationTable() {
    const [medications, setMedications] = useState([]);
    const [medicationName, setMedicationName] = useState('');
    const [medicationDose, setMedicationDose] = useState('');
    const [medicationInterval, setMedicationInterval] = useState('');
    const [medicationDuration, setMedicationDuration] = useState('');
    const [currentMedicationIndex, setCurrentMedicationIndex] = useState(null);

    const addMedication = () => {
        const newMedication = {
            name: medicationName,
            dose: medicationDose,
            interval: medicationInterval,
            duration: medicationDuration,
            taken: false,
            nextTime: null,
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
            updatedMedications[index].nextTime = new Date();
            // Calcula la próxima hora sugerida de toma
            updatedMedications[index].nextSuggestedTime = calculateNextTime(
                updatedMedications[index].nextTime,
                updatedMedications[index].interval
            );
        } else {
            // Si la toma se marca como no tomada, limpia tanto "Hora de Toma" como "Sugerencia de Siguiente Toma"
            updatedMedications[index].nextTime = null;
            updatedMedications[index].nextSuggestedTime = null;
        }

        // Si aún hay dosis por tomar, calcula la próxima toma
        if (updatedMedications[index].nextTime && updatedMedications[index].duration > 1) {
            updatedMedications[index].duration--;

            // Agrega la siguiente toma a la tabla
            if (updatedMedications[index].duration > 0) {
                const nextDose = {
                    name: updatedMedications[index].name,
                    dose: updatedMedications[index].dose,
                    interval: updatedMedications[index].interval,
                    duration: updatedMedications[index].duration,
                    taken: false, // Inicializamos en falso, sin llenar la "Hora de Toma"
                    nextTime: null, // Inicializamos en null
                    nextSuggestedTime: null, // Inicializamos en null
                };
                updatedMedications.splice(index + 1, 0, nextDose);
            }
        }

        setMedications(updatedMedications);
    };

    const calculateNextTime = (currentTime, interval) => {
        if (!currentTime) {
            // Si es la primera toma, toma la hora actual
            return new Date();
        } else {
            // Calcula la próxima toma sumando el intervalo de tiempo
            const nextTime = new Date(currentTime);
            nextTime.setHours(nextTime.getHours() + interval);
            return nextTime;
        }
    };

    return (
        <div className="login-card">
            <h2>Cuadro de Medicamentos</h2>
            <form className="medication-form">
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
                <button type="button" onClick={addMedication}>
                    Agregar
                </button>
            </form>

            <table className="medication-table">
                <thead>
                    <tr>
                        <th>Nombre del Medicamento</th>
                        <th>Dosis</th>
                        <th>Tomada</th>
                        <th>Hora de Toma</th>
                        <th>Sugerencia de Siguiente Toma</th>
                    </tr>
                </thead>
                <tbody>
                    {medications.map((medication, index) => (
                        <tr key={index}>
                            <td>{medication.name}</td>
                            <td>{medication.dose}</td>
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
                                {medication.taken ? (medication.nextTime ? medication.nextTime.toLocaleTimeString() : null) : null}
                            </td>
                            <td>{medication.nextSuggestedTime ? medication.nextSuggestedTime.toLocaleTimeString() : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MedicationTable;
