import DayList from "components/DayList.js";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "4pm",
//     interview: {
//       student: "Puff Daddy Combs",
//       interviewer: {
//         id: 1,
//         name: "Schmeegle",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "8am",
//     interview: {
//       student: "Skeletor",
//       interviewer: {
//         id: 1,
//         name: "Albert Mindstein",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
    console.log(state.interviewers)
  })
  }, []);

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});

  }


  
  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );

  });

    // return (
    //   <Appointment
    //     key={appointment.id}
    //     id={appointment.id}
    //     time={appointment.time}
    //     interview={interview}
    //   />
    // );
//   })
// };

  // const apptStateArr = getAppointmentsForDay(state, state.day);

  // const newAppointmentArr = apptStateArr.map(appt =>
  //   <Appointment key={appt.id} {...appt}/>)

return (
  <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />      
    </section>
    <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" />
    </section>
  </main>
  );
}

// {newAppointmentArr}
// <Appointment key="last" time="5pm" />

