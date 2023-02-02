import { TimeSlot } from '@types';
import { convertTime } from '@helpers';

export const START_TIME = 7;
export const START_TIMES: number[] = [];
export const BREAK_TIMES = [8.5, 10.25, 12, 14.5, 16.25];
let time: number = START_TIME;
while (time < 17) {
  START_TIMES.push(time);
  if (!BREAK_TIMES.includes(time)) time += 0.75;
  else time += (time === 12 ? 1 : 0.25);
}

export const TIME_SLOTS: TimeSlot[] = START_TIMES.map((startTime: number) => {
  let endTimeModifier = (BREAK_TIMES.includes(startTime) ? 0.25 : 0.75);
  if (startTime === 12) endTimeModifier = 1;
  return {
    startTime: convertTime(startTime) as string,
    endTime: convertTime(startTime + endTimeModifier) as string,
    break: BREAK_TIMES.includes(startTime),
  };
});