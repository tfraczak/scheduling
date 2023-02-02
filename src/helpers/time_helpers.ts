export const convertTime = (time: string | number): string | number => {
  if (typeof time === 'string') {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2, 4);
    return parseFloat(hours) + (parseFloat(minutes) / 60);
  }

  const hours = Math.floor(time);
  const minutes = 60 * (time - hours);
  let hoursStr = hours.toString();
  hoursStr = hoursStr.length === 1 ? '0'.concat(hoursStr) : hoursStr;
  let minutesStr = minutes.toString();
  minutesStr = minutesStr.length === 1 ? '0'.concat(minutesStr) : minutesStr;
  return `${hoursStr}${minutesStr}`;
};