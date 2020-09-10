import DayList from "components/DayList.js";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

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
}

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

  useEffect(() => {
    Promise.all([promise1, promise2, promise3
    ])
    .then((all) => {
    // console.log(all[0]);
    // console.log(all[1]);
    // console.log(all[2]);
    setState(prev => ({ ...prev, days: [...all[0].data], appointments: {...all[1].data}, interviewers: {...all[2].data}}));
  })
  }, []);

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    // console.log('id', id, interview);
    // console.log("DAYSTATE", state.day)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const updateSpots = function(increment) {
    //   const dayObj = state.days.find((item) => item.name === state.day)
    //   dayObj.spots += increment;
    //   return state.days;
    // }

    const newState = {...state, appointments}
    const newDays = newState.days.map((day) => {
      return {...day, spots: getSpotsDay(newState, day.name)}
    })

    setState({...newState, days: newDays});
 
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      return null;
      // const days = updateSpots(-1);
      // setState({...state, appointments, days });
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
  }

  

  function cancelInterview(id, interview) {
    // console.log('id', id, interview);
    // console.log("DAYSTATE", state.day)
    // console.log(id, interview);
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

    setState({...newState, days: newDays});

    // const updateSpots = function(increment) {
    //   const dayObj = state.days.find((item) => item.name === state.day)
    //   setState({...state, days})
    //   dayObj.spots += increment;
    //   return state.days;
    // }


    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      return null;
      // const days = updateSpots(1);
      // setState({...state, appointments, days });
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
  }


  return {state, setDay, bookInterview, cancelInterview}
}

   /*  -DAY ARR.LENGTH - APPOINTMENTS = SPOTS LEFT
      -FIND APPT DAY ID
      -MATCH TO DAY ARRAY
      -IF IN DAY ARRAY SUBTRACT 1 FROM DAYARR.LENGTH?
      -WHERE TO STORE AND HOW?

      -FIND DAY ARRAY. IF APPT.ID === LOOP OF DAY ARR, ADD TO NEW ARRAY?
  */   
 //state.day = selected day name adding or deleting from
    //state.days includes a day with name property "name" we're looking for (index)
    //Filter days to return the day with the property that equals state.day
    //once it finds it, we need to do math on spots
    //then we save that day back to state
    //look up how to replace a specific value in state
    //let item = {
    // ...items[1],
    // name: 'newName'
    // const spots = {
    //   ...state.day,
    //   spots: state.days[selectedDay].spots - 1
    // };

      // const selectedDay = state.days.filter((day, index) => {
    //   if (day.name === state.day) {
    //     day.spots += 1
    //     let arrDay = [day, index]
    //     return arrDay
    //   }
    // })