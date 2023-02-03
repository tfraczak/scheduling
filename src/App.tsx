import React from 'react';
import { printSchedule } from '@helpers';
import { PATIENTS, THERAPISTS } from '@constants';

const App = (): JSX.Element => {
  const [schedule, errorMessage] = printSchedule();
  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyle: 'none' }}>
        <h4 style={{ margin: 0, marginBottom: '5px' }}>Therapists:</h4>
        {THERAPISTS.map((therapist) => <li>{therapist.name}{therapist.primary ? '*' : ''}</li>)}
        <h6 style={{ marginTop: '3px' }}>* denotes primary therapist</h6>
      </ul>
      <ul style={{ listStyle: 'none' }}>
        <h4 style={{ margin: 0, marginBottom: '5px' }}>Patients:</h4>
        {PATIENTS.map((patient) => <li>{patient.name}</li>)}
      </ul>
      <table style={{ boxSizing: 'border-box', padding: 0, listStyle: 'none', border: '2px solid #ddd' }}>
        {errorMessage ? (
          <h4 style={{ color: 'red', fontWeight: 700 }}>{errorMessage}</h4>
        ) : null}
        {schedule.map((assignment, idx) => (
          <tr style={{ width: '100%', display: 'flex', backgroundColor: idx % 2 === 0 ? 'white' : '#eee' }}>
            <td style={{ width: '130px', margin: 0, marginRight: '5px', marginBottom: '3px' }}>
              Time: <span style={{ fontWeight: 700 }}>{assignment.time}</span>
            </td>
            <td style={{ width: '130px', margin: 0, marginRight: '5px', marginBottom: '3px' }}>
              Therapist: <span style={{ fontWeight: 700 }}>{assignment.therapist}</span>
            </td>
            <td style={{ width: '130px', margin: 0 }}>
              Patient: <span style={{ fontWeight: 700 }}>{assignment.patient}</span>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default App;
