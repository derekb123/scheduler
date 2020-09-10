import React from "react";
import Button from "components/Button.js";

export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm" data-testid="delete-confirm-module">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button data-testid="delete-confirm" onClick={() =>props.onConfirm(props.id)} danger>Delete</Button>
      </section>
  </main>

  )
}
