import React, { useState, useEffect } from 'react';

const MedicationTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [medName, setMedName] = useState('');
  const [doseCount, setDoseCount] = useState('');
  const [intervalHours, setIntervalHours] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addMedication = () => {
    if (medName && doseCount && intervalHours && durationDays) {
      const newMed = {
        id: medications.length + 1,
        name: medName,
        doseCount: parseInt(doseCount),
        intervalHours: parseInt(intervalHours),
        durationDays: parseInt(durationDays),
        nextDoseTime: new Date(currentTime.getTime() + (parseInt(intervalHours) * 60 * 60 * 1000)),
      };

      setMedications([...medications, newMed]);
      setMedName('');
      setDoseCount('');
      setIntervalHours('');
      setDurationDays('');
    }
  };

  const takeDose = (medID) => {
    const updatedMeds = medications.map((med) => {
      if (med.id === medID) {
        const nextDoseTime = new Date(med.nextDoseTime.getTime() + (med.intervalHours * 60 * 60 * 1000));
        return { ...med, nextDoseTime };
      }
      return med;
    });

    setMedications(updatedMeds);
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    return `${hours % 12 || 12}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h2>Medication Tracker</h2>
      <div>
        <label>Medication Name</label>
        <input
          type="text"
          value={medName}
          onChange={(e) => setMedName(e.target.value)}
        />
        <label>Dose Count</label>
        <input
          type="number"
          value={doseCount}
          onChange={(e) => setDoseCount(e.target.value)}
        />
        <label>Interval Hours</label>
        <input
          type="number"
          value={intervalHours}
          onChange={(e) => setIntervalHours(e.target.value)}
        />
        <label>Duration (Days)</label>
        <input
          type="number"
          value={durationDays}
          onChange={(e) => setDurationDays(e.target.value)}
        />
        <button onClick={addMedication}>Add Medication</button>
      </div>
      <div>
        <h3>Medications</h3>
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dose Count</th>
              <th>Next Dose Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.doseCount}</td>
                <td>{formatTime(med.nextDoseTime)}</td>
                <td>
                  <button onClick={() => takeDose(med.id)}>Take Dose</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationTracker;
