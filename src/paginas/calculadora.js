import React, { useState, useEffect } from 'react';

const Calculadora = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoursToAdd, setHoursToAdd] = useState(0);
  const [resultTime, setResultTime] = useState('');
  const [timeCategory, setTimeCategory] = useState('');
  const [originalTime, setOriginalTime] = useState('');
  const [inputHours, setInputHours] = useState('');
  const [morningData, setMorningData] = useState([]);
  const [noonData, setNoonData] = useState([]);
  const [eveningData, setEveningData] = useState([]);
  const [nightData, setNightData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addHours = () => {
    const newTime = new Date(currentTime);
    const original = new Date(currentTime);
    newTime.setHours(newTime.getHours() + parseInt(hoursToAdd, 10));

    const hours = newTime.getHours();
    const category = momentIndex(hours);

    const formattedHours = formatTime(newTime);

    setResultTime(formattedHours);
    setTimeCategory(category);
    setOriginalTime(formatTime(original));
    setInputHours(hoursToAdd);

    const newData = {
      inputHours: hoursToAdd,
      originalT: formatTime(original),
      resultT: formattedHours,
    };

    switch (category) {
      case 'morning':
        setMorningData([...morningData, newData]);
        break;
      case 'noon':
        setNoonData([...noonData, newData]);
        break;
      case 'evening':
        setEveningData([...eveningData, newData]);
        break;
      case 'night':
        setNightData([...nightData, newData]);
        break;
      default:
        break;
    }
  };

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

  const renderTable = (data) => (
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Input Hours</th>
          <th>Original Time</th>
          <th>Result Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {index === 0 && <td rowSpan={data.length}>{timeCategory}</td>}
            <td>{item.inputHours}</td>
            <td>{item.originalT}</td>
            <td>{item.resultT}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
      <div>
        <label>Hours to Add</label>
        <input
          type="number"
          value={hoursToAdd}
          onChange={(e) => setHoursToAdd(e.target.value)}
        />
        <button onClick={addHours}>Add Hours</button>
      </div>
      {resultTime && (
        <div>
          <p>Input Hours: {inputHours}</p>
          <p>Original Time: {originalTime}</p>
          <p>Result Time: {resultTime}</p>
          <p>Time Category: {timeCategory}</p>
        </div>
      )}
      <div>
        {morningData.length > 0 && renderTable(morningData)}
        {noonData.length > 0 && renderTable(noonData)}
        {eveningData.length > 0 && renderTable(eveningData)}
        {nightData.length > 0 && renderTable(nightData)}
      </div>
    </div>
  );
};

export default Calculadora;
