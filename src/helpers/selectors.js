export function getAppointmentsForDay(state, day) {
  const filteredAppts = state.days.filter(obj => obj.name === day);
  if (!filteredAppts[0]) {
    return [];
  }
  const newApptArr = filteredAppts[0].appointments.map((appt) => state.appointments[appt]);
  // console.log('newApptArr', newApptArr);
    return newApptArr;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewObjNew = {...interview, interviewer: state.interviewers[interviewerId]};
  return interviewObjNew;
}

export function getInterviewersForDay(state, day) {
  //console.log(state.days);
  const filteredDays = state.days.filter(obj => obj.name === day);
  // console.log('filteredDays', filteredDays);
  if (!filteredDays[0]) {
    return [];
  }
  const newApptArr = filteredDays[0].interviewers.map((interviewer) => state.interviewers[interviewer]);
  // console.log('newApptArr', newApptArr);
    return newApptArr;
};