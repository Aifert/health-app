import React, {useEffect} from "react";

function Note(props) {

  const food = props.food_names;
  
  function handleClick() {
    props.onDelete(props.id, props.date);
  }

  const totalProtein = food.reduce((total, item) => total + item.protein, 0)
  const totalCalories = food.reduce((total, item) => total + item.calories, 0)
  const totalCarbs = food.reduce((total, item) => total + item.carbs, 0)
  const totalNutrients = totalProtein + totalCalories + totalCarbs;

  const percentageProtein = (totalProtein / totalNutrients) * 100 || 0;
  const percentageCalories = (totalCalories / totalNutrients) * 100 || 0;
  const percentageCarbs = (totalCarbs / totalNutrients) * 100 || 0;
  
  return (
    <div className="note">
      <div className="date-container">
        <div className = "date mb-3">
          <h1>{props.date}</h1>
        </div>
      </div>
      <h3>Exercise</h3>
      <ul>
      {props.exercise_names && props.exercise_names.map((nameItem) => (
          <div key={nameItem.exercise}>
            <li>{nameItem.exercise} {nameItem.minutes}</li>
          </div>
        ))}
      </ul>
      <hr />
      <h3>Food</h3>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <ul> 
      {props.food_names && props.food_names.map((nameItem) => (
          <div key={nameItem.food_name}>
            <li>{nameItem.food_name}</li>
          </div>
        ))}
      </ul>
      <div className="progress-wheel" style={{ 
          width : '100px',
          height : '100px',
          background: `conic-gradient(
            #77DD77 0% ${percentageProtein}%, 
            #FF964F ${percentageProtein}% ${percentageProtein + percentageCalories}%, 
            #FF6961 ${percentageProtein + percentageCalories}% ${percentageProtein + percentageCalories + percentageCarbs}%, 
            transparent ${percentageProtein + percentageCalories + percentageCarbs}% 100%
          )`,
          borderRadius: '50%' }}>
        </div>
      </div>

      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
