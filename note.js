/**
 * Going to be connecting it to a database, when login need to check if the credentials 
 * are already available in the database if yes then render to next page
 * 
 * If not then straight put to register and after registering then need to put login page again and login again to go into homepage
 * 
 * Once logged in, display all the stats
 */


/**
 * 17/1/2024
 * 
 * Database is done, next need to figure out what to show after the user has successfully registerd
 * thinking of putting it back to the home page but the hope page is not loading at the moment, not sure why
 * maybe it goes into a loop? with the photo url request but not sure
 * 
 * Tomorrow fix that and implement login
 */

/**
 * 30/1/2024 
 * 
 * Not sure why the thing isn't spanning the full page might be something from the parent
 * preventing it from filling the whole page
 */

/**
 * 
 * 31/1/2024
 * 
 * Want to add protein etc and a circle diagram 
 */


/**
 * import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id, props.date);
  }

  const totalExerciseMinutes = props.exercise_names.reduce((total, item) => total + item.minutes, 0);
  const percentage = (totalExerciseMinutes / 100) * 360; // Calculate percentage of 360 degrees

  return (
    <div className="note">
      <div className="date-container">
        <div className="date mb-3">
          <h1>{props.date}</h1>
        </div>
      </div>
      <div className="progress-wheel" style={{ background: `conic-gradient(#3498db ${percentage}deg, transparent ${percentage}deg 360deg)` }}></div>
      <ul>
        Exercise
        {props.exercise_names && props.exercise_names.map((nameItem) => {
          return (
            <div key={nameItem.exercise}>
              <li>{nameItem.exercise} {nameItem.minutes}</li>
            </div>
          )
        })}
      </ul>
      <hr />
      <ul>
        Food
        {props.food_names && props.food_names.map((nameItem) => {
          return (
            <div key={nameItem.food_name}>
              <li>{nameItem.food_name}</li>
              <ul>
                <li>Protein: {nameItem.protein}</li>
                <li>Calories: {nameItem.calories}</li>
                <li>Carbs: {nameItem.carbs}</li>
              </ul>
            </div>
          )
        })}
      </ul>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;

 */