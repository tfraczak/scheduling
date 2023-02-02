Write code that will optimize scheduling based on the following parameters:

### PATIENT
- Available times
- Must see each primary therapist at least once each.

### THERAPIST
- Available times
- Primary: true/false

### TIME SLOTS
- 45 minute intervals
- 15 minute break times at:
  - 0830-0845
  - 1015-1030
  - 1200-1300
  - 1430-1445
  - 1615-1715

### CONSTRAINTS
- No appointments may be scheduled during breaks, or overlapping breaks.
- All of the patients' and therapists' availabilities must be respected.
- Each patient must be seen 4 times per day.
- Each patient must be seen by each primary therapist at least once per day.

## RUN PROGRAM

1. Run `yarn install`.
2. Run `yarn start`.
3. Check the dev tools console in your browser: you can check `patients`, `scheduleObj`, `schedule`, and `errorMessage` on the window.

### License

MIT © [awran5](https://github.com/awran5/)
