import React from 'react';
import { printSchedule } from '@helpers';
import { PATIENTS, THERAPISTS } from '@constants';

const App = (): JSX.Element => {
  const [schedule, errorMessage] = printSchedule();
  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        <h4 style={{ margin: 0, marginBottom: '5px' }}>Therapists:</h4>
        {THERAPISTS.map((therapist) => <li>{therapist.name}</li>)}
      </ul>
      <ul style={{ listStyle: 'none' }}>
        <h4 style={{ margin: 0, marginBottom: '5px' }}>Patients:</h4>
        {PATIENTS.map((patient) => <li>{patient.name}</li>)}
      </ul>
      <ul style={{ listStyle: 'none' }}>
        <h4 style={{ color: 'red', fontWeight: 700 }}>{errorMessage}</h4>
        {schedule.map((assignment) => (
          <li style={{ display: 'flex' }}>
            <p style={{ margin: 0, marginRight: '5px', marginBottom: '3px' }}>Time: <span style={{ fontWeight: 700 }}>{assignment.time}</span>,</p>
            <p style={{ margin: 0, marginRight: '5px', marginBottom: '3px' }}>Therapist: <span style={{ fontWeight: 700 }}>{assignment.therapist}</span>,</p>
            <p style={{ margin: 0 }}>Patient: <span style={{ fontWeight: 700 }}>{assignment.patient}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
