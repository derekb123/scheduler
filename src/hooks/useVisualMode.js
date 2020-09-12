import {React, useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition between modes with state update logic
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
      setHistory([...history.slice(0,-1), newMode]);
    } else {
      setHistory([...history, newMode]);  
      setMode(newMode);
    }
  };

  //go back to previous mode with state update logic
  function back() { 
    if(history.length >1) {
      const prevHistory = history[history.length-2];
      setMode(prevHistory);
      setHistory(history.slice(0,history.length-1));  
    }    
  };

  return { mode, transition, back };
};