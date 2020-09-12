
import React from "react";

//Component for an empty space with a button to add appointment and move to From component
export default function Empty(props) {
  
  return(
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
)};