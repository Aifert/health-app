import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id, props.date);
  }

  return (
    <div className="note">
      <div className="date-container">
        <div className = "date mb-3">
          <h1>{props.date}</h1>
        </div>
      </div>
      <ul> Exercise
      {props.exercise_names && props.exercise_names.map((nameItem) => {
        return <li>{nameItem}</li>
      })}
      </ul>
      <hr />
      <ul> Food
      {props.food_names && props.food_names.map((nameItem) => {
        return <li>{nameItem}</li>
      })}
      </ul>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
