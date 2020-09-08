import React from "react";
import "./styles.scss";
import classnames from "classnames";
import Show from "./Show"
import Empty from "./Empty"
import Header from "./Header"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"
import { prettyDOM } from "@testing-library/react";





export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function onSave(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

// function onDelete(name, interviewer) {
//   const interview = {
//     student: name,
//     interviewer
//   };
//   console.log('interview', interview)
//   transition(SAVING);
//   props.bookInterview(props.id, interview)
//   .then(() => {
//     transition(SHOW);
//   })
// }

function onDelete() {
  transition(CONFIRM);
}

function onEdit() {
  transition(EDIT);
}

function onConfirm(id) {
  // const interview = {
  //   student: name,
  //   interviewer
  // };
  // console.log('interview', interview)
  transition(SAVING);
  props.cancelInterview(id)
  .then(() => {
    transition(EMPTY);
  })
  .catch(error => transition(ERROR_DELETE, true));
}

console.log(props.interview);

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status/>}
        {mode === ERROR_SAVE && <Error/>}
        {mode === ERROR_DELETE && <Error/>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={onSave}
          />
        )}
        {mode === EDIT && (
          <Form 
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            name={props.interview.student}
            onCancel={() => back()}
            onSave={onSave}
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
            student={props.interview.student}
            message={"Are you sure you want to delete?"}
            interviewer={props.interview.interviewer}
            onConfirm={onConfirm}
            onCancel={() => back()}
            id={props.id}
          />
        )}

    </article>
  )
}

// {props.interview ? <Show {useVisualMode(SHOW)} student={props.interview.student} interviewer={props.interview.interviewer.name}/> :  <Empty {useVisualMode(EMPTY)} />}