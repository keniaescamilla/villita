import React, { useState } from 'react';
import '../App.css';
import MedicationForm from './MedicationForm';

function MedicationTable() {
  const [medications, setMedications] = useState([]);
  const [moment, setMoment] = useState('Morning');

  const momentColors = {
    Morning: "#F3C1B6",
    Noon: '#FFFCBD',
    Evening: '#B6F3EC',
    Night: '#91A0D5',
    'Only when needed': '#ADDBB9',
  };

  const momentImages = {
    Morning: "https://thenounproject.com/api/private/icons/3077824/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
    Noon: "https://th.bing.com/th/id/R.8629193cd9144e8785e435dc08242f19?rik=VHtMNOylpsEP4g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_464543.png&ehk=2LcAlANO4fH8A%2bnWG2%2fsZ4ZAjtK2UDtn07iJ8brhB2s%3d&risl=&pid=ImgRaw&r=0",
    Evening: "https://thenounproject.com/api/private/icons/1022052/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
    Night: "https://thenounproject.com/api/private/icons/1553201/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
    'Only when needed': "https://cdn1.iconfinder.com/data/icons/science-volume-1/48/041-512.png",
  };

  const handleAddMedication = (newMedication) => {
    // Agregar el nuevo medicamento al estado
    setMedications([...medications, { ...newMedication, moment }]);
  };

  return (
    <div>
      <h1>CUADRO DE MEDICAMENTOS</h1>

      <table className="container">
        <thead>
          <tr>
            <th>Moment</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Time</th>
            <th>Date</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {["Morning", "Noon", "Evening", "Night", "Only when needed"].map((momentOption) => (
            <tr key={momentOption} style={{ backgroundColor: momentColors[momentOption] }}>
              <td>
                {momentOption} <img src={momentImages[momentOption]} alt={momentOption} />
              </td>
              <td>
                {medications
                  .filter((medication) => medication.moment === momentOption)
                  .map((medication, index) => (
                    <div key={index}>
                      {medication.medication}
                    </div>
                  ))}
              </td>
              <td>
                {medications
                  .filter((medication) => medication.moment === momentOption)
                  .map((medication, index) => (
                    <div key={index}>
                      {medication.dosage}
                    </div>
                  ))}
              </td>
              <td>
                {medications
                  .filter((medication) => medication.moment === momentOption)
                  .map((medication, index) => (
                    <div key={index}>
                      {medication.time}
                    </div>
                  ))}
              </td>
              <td>
                {medications
                  .filter((medication) => medication.moment === momentOption)
                  .map((medication, index) => (
                    <div key={index}>
                      {medication.date}
                    </div>
                  ))}
              </td>
              <td>
                {medications
                  .filter((medication) => medication.moment === momentOption)
                  .map((medication, index) => (
                    <div key={index}>
                      {medication.comments}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label htmlFor="momentSelector">Selecciona el Momento: </label>
        <select
          id="momentSelector"
          onChange={(e) => setMoment(e.target.value)}
          value={moment}
        >
          <option value="Morning">Morning</option>
          <option value="Noon">Noon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
          <option value="Only when needed">Only when needed</option>
        </select>
      </div>
      <MedicationForm onAddMedication={handleAddMedication} />
    </div>
  );
}

export default MedicationTable;
