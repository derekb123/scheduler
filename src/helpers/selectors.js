//Returns apointments for specific day.
export function getAppointmentsForDay(state, day) {
  const filteredAppts = state.days.filter(obj => obj.name === day);
    if (!filteredAppts[0]) {
      return [];
    }
  const newApptArr = filteredAppts[0].appointments.map((appt) => state.appointments[appt]);
  return newApptArr;
};

//Populates interviewer information into interview object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewObjNew = {...interview, interviewer: state.interviewers[interviewerId]};
  return interviewObjNew;
};

//Returns interviewers for specific day.
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(obj => obj.name === day);
  if (!filteredDays[0]) {
    return [];
  }
  const newApptArr = filteredDays[0].interviewers.map((interviewer) => state.interviewers[interviewer]);
  return newApptArr;
};