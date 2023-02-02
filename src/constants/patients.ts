import { Patient } from '@types';

export const PATIENTS: Patient[] = [
  {
    name: 'Pt 1',
    availability: [
      { startTime: '0700', endTime: '1300' },
      { startTime: '1500', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'Pt 2',
    availability: [
      { startTime: '0700', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'Pt 3',
    availability: [
      { startTime: '1100', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'Pt 4',
    availability: [
      { startTime: '0700', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
];