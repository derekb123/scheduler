
import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

//Shows list of interviewers to select from
function InterviewerList(props) {
  const NewInterviewerListArr = props.interviewers.map(person =>
    <InterviewerListItem
      key={person.id}
      id={person.id}
      name={person.name}
      avatar={person.avatar}
      setInterviewer={props.setInterviewer}
      selected={person.id === props.value}
    />
  )
  
    return (
    <div className="interviewers__list">
      {NewInterviewerListArr}
    </div>
    )
  }

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};

export default InterviewerList;


