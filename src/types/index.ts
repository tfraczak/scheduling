export type Availability = {
  startTime: string,
  endTime: string,
};

export type TimeSlot = Availability & { break: boolean };

export type Therapist = {
  availability: Availability[],
  name: string,
  primary: boolean,
};

export type Patient = {
  availability: Availability[],
  name: string,
  primariesScheduled: string[],
  numAppointments: number,
};
