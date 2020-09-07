import {React, useState} from "react"
;
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
      setHistory([...history.slice(0,-1), newMode]);
    } else {
    setHistory([...history, newMode]);  
    setMode(newMode);
    }
  }

  function back() { 
    if(history.length >1) {
      const prevHistory = history[history.length-2];
      setMode(prevHistory)
      setHistory(history.slice(0,history.length-1));  
    }    
  }


  return { mode, transition, back };
}

// export default function useVisualMode (initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
//   const transition = (newMode, replace = false) => {
//       if (replace) {
//           setMode(newMode);
//           setHistory([...history.slice(0, -1), newMode]);
//       } else {
//           setMode(newMode);
//           const nextHistory = [...history, newMode]
//           setHistory(nextHistory);
//       }
//   }
//   const back = () => {
//       if (history.length > 1) {
//           setHistory(history.slice(0, -1));
//           setMode(history[history.length - 2]);
//       }
//   }
//   return { mode, transition, back };
// }