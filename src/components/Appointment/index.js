import React from "react";
import "./styles.scss";
import Show from "./Show"
import Empty from "./Empty"
import Header from "./Header"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {

  //Mode states that appointment can have.  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  //transitions and function call for saving appointment.
  //see bookInterview in useApplicationData.js for state & DB update logic, 
  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
    .then((res) => {
      if (!res) {
        transition(SHOW);
      } 
      else {
        transition(ERROR_SAVE, true);
      }
    });
  };

  //transitions and function call for confirming deletion of appointment.
  //see cancelInterview in useApplicationData.js for state & DB update logic. 
  function onDestroy(id) {
    transition(DELETING, true);

    props.cancelInterview(id)
    .then((res) => {
      if (!res) {
        transition(EMPTY);
      } 
      else {
        transition(ERROR_DELETE, true);
      }
    });
  };

  //initial delete button that transitions to CONFIRM mode for destroy or cancel.
  function onDelete() {
    transition(CONFIRM);
  };

  //edit button that transitions to prefilled EDIT mode of Form.
  function onEdit() {
    transition(EDIT);
  };


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} />}
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
          onDestroy={onDestroy}
          onCancel={() => back()}
          id={props.id}
        />
      )}
    </article>
  );
};