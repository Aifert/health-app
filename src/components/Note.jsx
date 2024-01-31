import React, {useEffect} from "react";

function Note(props) {

  const food = props.food_names;
  const exercise = props.exercise_names;
  
  function handleClick() {
    props.onDelete(props.id, props.date);
  }

  const totalMinutes = exercise.reduce((total, item) => total + item.minutes, 0);

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
            <li>{nameItem.exercise} {nameItem.minutes} minutes</li>
          </div>
        ))}
      </ul>
      <p style={{fontSize : "16px"}}>Total: {totalMinutes} minutes</p>
      <hr />
      <div style ={{display : 'flex', alignItems : 'baseline'}}>
      <h3 style={{marginRight : "15px"}}>Food</h3>
      <div style={{display : 'flex', alignItems : 'baseline', fontSize : '10px', marginRight:"10px"}}><div style={{backgroundColor : '#77DD77', width : '10px', height : '10px', marginRight:"2px"}}></div>Protein</div>
      <div style={{display : 'flex', alignItems : 'baseline', fontSize : '10px', marginRight:"10px"}}><div style={{backgroundColor : '#FF964F', width : '10px', height : '10px', marginRight:"2px"}}></div>Calories</div>
      <div style={{display : 'flex', alignItems : 'baseline', fontSize : '10px', marginRight:"10px"}}><div style={{backgroundColor : '#FF6961', width : '10px', height : '10px', marginRight:"2px"}}></div>Carbs</div>
      </div>
      <div className="mb-3" style={{display: 'flex', justifyContent:'space-between'}}>
      <ul> 
      {props.food_names && props.food_names.map((nameItem) => (
          <div key={nameItem.food_name}>
            <li style={{maxWidth : "90px"}}>{nameItem.food_name}</li>
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
          borderRadius: '50%', display : 'flex', justifyContent:'center', alignItems : 'center' }}>
          <div style ={{width : '70px', height : '70px', backgroundColor : 'white', borderRadius : '50%'}}></div>
        </div>
      </div>

      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
