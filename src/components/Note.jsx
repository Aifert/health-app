import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  
  console.log(props.exercise_names)
  console.log(props.food_names)

  return (
    <div className="note">
      <h1>{props.date}</h1>
      <ul> Exercise
      {props.exercise_names.map((nameItem) => {
        return <li>{nameItem}</li>
      })}
      </ul>
      <hr />
      <ul> Food
      {props.food_names.map((nameItem) => {
        return <li>{nameItem}</li>
      })}
      </ul>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
