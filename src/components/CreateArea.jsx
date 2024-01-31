import React, { useState , useCallback} from "react";

function CreateArea(props) {
  const [FOOD, setFOOD] = useState(false);
  const [placeholder , setPlaceholder] = useState("Exercise calms you, what did you do?")
  const [dateValidity, setDateValidity] = useState('');

  const handleModeChange = (event) =>{
    const selectedMode = event.target.value;

    if(selectedMode === "food"){
      setFOOD(true);
      setPlaceholder("Good food heals you, what did you eat today?");
    }
    else{
      setFOOD(false);
      setPlaceholder("Exercise calms you, what did you do?")
    }
  }

  const handleDateInput = useCallback((event) => {
    const dateInput = event.target.value;
    const [day, month, year] = dateInput.split('/').map(Number);

    if (day > 31 || month > 12) {
      setDateValidity('Invalid date');
    } else {
      setDateValidity('');
    }
  }, []);

  function submitNote(event) {
    event.preventDefault();

    // Access form elements directly using event.target
    const date = event.target.elements.date.value;
    const mode = event.target.elements.mode.value;
    const content = event.target.elements.content.value;
    var details; 

    if (dateValidity) {
      return;
    }

    if(FOOD){
      const protein = event.target.elements.protein.value && event.target.elements.protein.value >= 0 ? event.target.elements.protein.value : 0;
      const calories = event.target.elements.calories.value && event.target.elements.calories.value >= 0 ?  event.target.elements.calories.value : 0;
      const carbs = event.target.elements.carbs.value && event.target.elements.carbs.value >= 0 ? event.target.elements.carbs.value : 0;
      details = {protein : protein, calories : calories, carbs : carbs};
    }
    else{
      const minutes = event.target.elements.minutes.value;
      details = {minutes : minutes};
    }

    const [day, month, year] = date.split('/').map(String);

    var temp;
    var note;

    if(day.length === 1 || month.length == 1){
        if(day.length === 1 && month.length === 1){
          temp = `0${day}/0${month}/${year}`
        }
        else if(day.length === 1){
          temp = `0${day}/${month}/${year}`
        }
        else{
          temp = `${day}/0${month}/${year}`
        }

        console.log(temp);
        note = {date : temp, mode, content, details};
    }
    else{
      note = {date, mode, content, details};
    }
    // Create a note object from form values

    // Call the onAdd function with the note object
    props.onAdd(note);
  }

  return (
    <div className="create">
      <form className="createarea" onSubmit={submitNote}>
      {dateValidity && <div className="error-message">{dateValidity}</div>}
        <input
          name="date"
          placeholder="Date (dd/mm/yyyy)"
          className="my-3"
          style={{
            border: '2px dashed #3498db',
            borderRadius: '5px',
            padding: '8px'
          }}
          pattern="\d{1,2}/\d{1,2}/\d{4}"
          title="Please enter a date in the format dd/mm/yyyy"
          required
          onInput={handleDateInput}
        />
        <div className="col-md-6 my-3 action_field">
          <h6 className="mb-2 pb-1">What would you like to log today?</h6>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mode"
              id="exercise"
              value="exercise"
              onChange={handleModeChange}
              required
            />
            <label className="form-check-label" htmlFor="exercise">
              Exercise
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mode"
              id="food"
              value="food"
              onChange={handleModeChange}
              required
            />
            <label className="form-check-label" htmlFor="food">
              Food
            </label>
          </div>
        </div>
        <div className = "contentarea">
          <textarea
            name="content"
            placeholder={placeholder}
            rows="3"
            className="mt-3"
            style={{
              border: '2px dashed #3498db',
              borderRadius: '5px',
              padding: '8px',
              marginRight : '15px',
              width : 'auto'
            }}
            required
          />
        <div className = "details">
        {FOOD ? 
        <div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <label htmlFor="protein" style={{ marginRight: '5px', opacity : '80%' }}>Protein:</label>
              <input
                type="text"
                id="protein"
                name="protein"
                placeholder="Enter Protein Value"
                className="mt-3"
                style={{
                  border: '2px dashed #3498db',
                  borderRadius: '5px',
                  fontSize: '16px', // Adjust the font size as needed
                }}
              />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <label htmlFor="calories" style={{ marginRight: '5px', opacity : '80%' }}>Calories:</label>
              <input
                type="text"
                id="calories"
                name="calories"
                placeholder="Enter calories Value"
                className="mt-3"
                style={{
                  border: '2px dashed #3498db',
                  borderRadius: '5px',
                  fontSize: '16px', // Adjust the font size as needed
                }}
              />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <label htmlFor="carbs" style={{ marginRight: '5px', opacity : '80%' }}>Carbs:</label>
              <input
                type="text"
                id="carbs"
                name="carbs"
                placeholder="Enter Carbs Value"
                className="mt-3"
                style={{
                  border: '2px dashed #3498db',
                  borderRadius: '5px',
                  fontSize: '16px', // Adjust the font size as needed
                }}
              />
        </div>
        </div> 
        :
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <label htmlFor="minutes" style={{ marginRight: '5px', opacity : '80%' }}>Minutes:</label>
              <input
                type="text"
                id="minutes"
                name="minutes"
                placeholder="Enter Minutes Value"
                className="mt-3"
                style={{
                  border: '2px dashed #3498db',
                  borderRadius: '5px',
                  fontSize: '16px', // Adjust the font size as needed
                }}
                required
              />
        </div>}
        </div>          

        </div>
        <button className="add_note" type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
