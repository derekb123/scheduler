import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";

//Component for creating a new appointment
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    return props.onCancel();
  }

  //Check, stop, & show error message if fields empty when attempting save. 
  //Clear Errors and save once all fields are complete.
  function validate() {
    if (name === "") {
      setError1("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError2("Please select an interviewer");
      return;
    }
  
    setError1("");
    setError2("");
    props.onSave(name, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            name="name"
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error1}</section>
        <section className="appointment__validation">{error2}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

