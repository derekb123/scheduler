import React from "react";
import "./styles.scss";
import classnames from "classnames";
import Show from "./Show"
import Empty from "./Empty"
import Header from "./Header"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"





export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function onSave(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
}

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
     <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
      {mode === CREATE && (
      <Form 
        interviewers={[]}
        onCancel={() => back()}
        onSave={onSave}
      />
      )}

    </article>
  )
}

// {props.interview ? <Show {useVisualMode(SHOW)} student={props.interview.student} interviewer={props.interview.interviewer.name}/> :  <Empty {useVisualMode(EMPTY)} />}