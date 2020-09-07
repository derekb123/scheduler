import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const newDayListArray = props.days.map(day =>
    <DayListItem 
  name={day.name} 
  key={day.id}
  spots={day.spots} 
  selected={day.name === props.day}
  setDay={props.setDay}  />
  )
  return (
    <ul>{newDayListArray}</ul>
  )
}