import { Therapist } from '@types';

export const THERAPISTS: Therapist[] = [
  {
    name: 'A',
    availability: [
      { startTime: '0700', endTime: '1500' },
    ],
    primary: true,
  },
  {
    name: 'B',
    availability: [
      { startTime: '0930', endTime: '1730' },
    ],
    primary: true,
  },
  // {
  //   name: 'C',
  //   availability: [
  //     { startTime: '0700', endTime: '1730' },
  //   ],
  //   primary: false,
  // },
  {
    name: 'D',
    availability: [
      { startTime: '1100', endTime: '1730' },
    ],
    primary: false,
  },
];