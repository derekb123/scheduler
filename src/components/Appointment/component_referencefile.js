export default function App(props) {
  const [person, setPerson] = useState({
    name: 'Kanye West',
    age: 35,
    hair: 'Black'
  })
  
  return(
    <Parent personName={person.name} personOrig={setPerson} />
  )
}

export default function Parent(props) {
   /*
   props = {
       personName: person.name,
       personOrig: setPerson
   }
   */
  return(
    <Child personName={props.personName}  personChild={props.personOrig} />
  )
}

export default function Child(props) {
     /*
   props = {
       personName: person.name,
       personChild: setPerson
   }
   */
  const newString = `asodifhosdihfksjhdf`;
  props.personChild({ name: newString });
  
  return(
    <p>{props.personName}</p>
  )
}



//regular javascript anaology
// function app() {
  
//   const newFunc = (item) => {
//     return item
//   }

//   function parent(newFunc) {
//     function child(newFunc) {
//       newFunc()
//     }
//   }
// }