import { Therapist } from '@types';

export const THERAPISTS: Therapist[] = [
  {
    name: 'Alice',
    availability: [
      { startTime: '0700', endTime: '1500' },
    ],
    primary: true,
  },
  {
    name: 'Bob',
    availability: [
      { startTime: '0930', endTime: '1730' },
    ],
    primary: true,
  },
  // {
  //   name: 'Charles',
  //   availability: [
  //     { startTime: '0700', endTime: '1730' },
  //   ],
  //   primary: false,
  // },
  {
    name: 'Diana',
    availability: [
      { startTime: '1100', endTime: '1730' },
    ],
    primary: false,
  },
];