import { Patient } from '@types';

export const PATIENTS: Patient[] = [
  {
    name: 'Edgar',
    availability: [
      { startTime: '0700', endTime: '1300' },
      { startTime: '1500', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'Francine',
    availability: [
      { startTime: '0700', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'George',
    availability: [
      { startTime: '1100', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
  {
    name: 'Helen',
    availability: [
      { startTime: '0700', endTime: '1715' },
    ],
    primariesScheduled: [],
    numAppointments: 0,
  },
];