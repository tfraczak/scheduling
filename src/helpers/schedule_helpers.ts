import _ from 'lodash';
import { PATIENTS, THERAPISTS, TIME_SLOTS } from '@constants';
import { convertTime } from './time_helpers';
import { Patient, TimeSlot, Therapist } from '@types';

type Assignment = { patient: string, available: boolean };
type ScheduleObject = { [key: string]: { [key: string]: Assignment } };
type Schedule = {
  patient: string,
  therapist: string,
  time: string,
}[];

const isAvailable = (person: Therapist | Patient, timeSlot: TimeSlot) => {
  if (timeSlot.break) return false;

  const { availability } = person;
  const slotStart = convertTime(timeSlot.startTime);
  const slotEnd = convertTime(timeSlot.endTime);
  return availability.some(({ startTime, endTime }) => {
    const availabilityStart = convertTime(startTime);
    const availabilityEnd = convertTime(endTime);
    return slotStart >= availabilityStart &&
      slotEnd <= availabilityEnd;
  });
};

const findPrimaryTherapists = () => THERAPISTS.filter((therapist) => therapist.primary);
const numPrimaries = findPrimaryTherapists().length;

const findAvailableTherapists = (scheduleObj: ScheduleObject, timeSlot: TimeSlot) => {
  if (timeSlot.break) return [];

  return THERAPISTS
    .filter((therapist) => (
      isAvailable(therapist, timeSlot) &&
        !scheduleObj[timeSlot.startTime][therapist.name].patient
    ))
    .sort((tA, tB) => {
      if (tA.primary === tB.primary) return 0;
      if (tA.primary) return -1;
      if (tB.primary) return 1;
      return 0;
    });
};

const findAvailableTimeSlots = (person: Therapist | Patient) => (
  TIME_SLOTS.filter((timeSlot: TimeSlot) => isAvailable(person, timeSlot))
);

export const buildSchedule = (): [ScheduleObject, Patient[]] => {
  const scheduleObj: ScheduleObject = {};
  TIME_SLOTS.forEach((timeSlot) => {
    scheduleObj[timeSlot.startTime] = {}
    THERAPISTS.forEach((therapist) => {
      scheduleObj[timeSlot.startTime][therapist.name] = {
        patient: '',
        available: isAvailable(therapist, timeSlot),
      }
    });
  });
  const patients = _.cloneDeep(PATIENTS).sort((pA: Patient, pB: Patient) => {
    const numAvailsA = TIME_SLOTS.filter((timeSlot) => isAvailable(pA, timeSlot)).length
    const numAvailsB = TIME_SLOTS.filter((timeSlot) => isAvailable(pB, timeSlot)).length
    if (numAvailsA < numAvailsB) return -1;
    return 1;
  });

  patients.forEach((patient: Patient) => {
    const availableTimeSlots = findAvailableTimeSlots(patient);
    availableTimeSlots.forEach((availableTimeSlot: TimeSlot) => {
      const availableTherapists = findAvailableTherapists(scheduleObj, availableTimeSlot);
      if (_.isEmpty(availableTherapists)) return;

      while (availableTherapists.length) {
        const availableTherapist = availableTherapists.shift();
        if (availableTherapist) {
          const { primary } = availableTherapist;
          const patientSawThisPrimary = patient.primariesScheduled.includes(availableTherapist.name);
          const { numAppointments } = patient;
          const patientSawAllPrimaries = patient.primariesScheduled.length === numPrimaries;
          const canScheduleNonPrimary = (numAppointments < 3 && !patientSawAllPrimaries) ||
            patientSawAllPrimaries;
          const canSchedulePatientWithTherapist = numAppointments < 4 && (
            (primary && !patientSawThisPrimary) ||
            (!primary && canScheduleNonPrimary) ||
            (primary && patientSawAllPrimaries)
          );
          if (canSchedulePatientWithTherapist) {
            scheduleObj[availableTimeSlot.startTime][availableTherapist.name].patient = patient.name;
            if (primary && !patientSawThisPrimary) patient.primariesScheduled.push(availableTherapist.name);
            patient.numAppointments++;
            return;
          }
        }
      }
    });
  });

  window.patients = patients;
  window.scheduleObj = scheduleObj;

  return [scheduleObj, patients];
};

export const printSchedule = (): [Schedule, string] => {
  let schedule: Schedule = [];
  const [scheduleObj, patients] = buildSchedule();
  const timeSlotStrings = Object.keys(scheduleObj);
  timeSlotStrings.forEach((timeSlotKey) => {
    const timeSlotObj = scheduleObj[timeSlotKey];
    const therapistNames = Object.keys(scheduleObj[timeSlotKey]).forEach((tName) => {
      if (timeSlotObj[tName].patient) {
        schedule.push({
          patient: timeSlotObj[tName].patient,
          therapist: tName,
          time: timeSlotKey,
        });
      }
    });
  });

  schedule = schedule.sort((a, b) => {
    const aTime = convertTime(a.time);
    const bTime = convertTime(b.time);
    if (aTime > bTime) return 1;
    if (aTime < bTime) return -1;
    return 0;
  });

  const patientsWithoutFourAppointments: string[] = [];
  patients.forEach((patient: Patient) => {
    if (patient.numAppointments < 4) patientsWithoutFourAppointments.push(patient.name);
  });

  const errorMessage = patientsWithoutFourAppointments.length ? (
    `The following patients do not have 4 appointments: ${patientsWithoutFourAppointments.join(', ')}.`
  ) : '';

  window.schedule = schedule;
  window.errorMessage = errorMessage;

  return [schedule, errorMessage];
};