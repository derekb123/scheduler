import "components/Application.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

//This file holds functional logic for Application

//calculates spots available for specific day - used during bookInterview and cancelInterview
const getSpotsDay = function(state, dayName) {
  const foundDay = state.days.find((item) => item.name === dayName);
  let daySpots = 0;
  for (let appointmentId of foundDay.appointments) {
    const appointment = state.appointments[appointmentId];
    if (appointment.interview === null) {
      daySpots ++;
    }
  }
  return daySpots;
};

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const promise1 = axios.get("/api/days");
  const promise2 = axios.get("/api/appointments");
  const promise3 = axios.get("/api/interviewers");

  //Initialize all data from database into state
  useEffect(() => {
    Promise.all([promise1, promise2, promise3])
    .then((all) => {
    setState(prev => ({ ...prev, days: [...all[0].data], appointments: {...all[1].data}, interviewers: {...all[2].data}}));
  })
  }, []);

  //used to select day in Daylist
  const setDay = day => setState({ ...state, day });

  //onSave- updates state, calcs spots, and updates database for new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {...state, appointments}
    const newDays = newState.days.map((day) => {
      return {...day, spots: getSpotsDay(newState, day.name)}
    })
 
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...newState, days: newDays});
      return null;
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
  }

  
  //onDestroy- updates state, calcs spots, and updates database for deleting appointment  
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {...state, appointments}
    const newDays = newState.days.map((day) => {
      return {...day, spots: getSpotsDay(newState, day.name)}
    })

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({...newState, days: newDays});
      return null;
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
  }


  return {state, setDay, bookInterview, cancelInterview}
}