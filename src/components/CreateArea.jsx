import React, { useState , useCallback} from "react";

function CreateArea(props) {
  const [FOOD, setFOOD] = useState(false);
  const [dateValidity, setDateValidity] = useState('');

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

    if (dateValidity) {
      return;
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
        note = {date : temp, mode, content};
    }
    else{
      note = {date, mode, content };
    }

    console.log(note);
    // Create a note object from form values

    // Call the onAdd function with the note object
    props.onAdd(note);
  }

  return (
    <div>
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
              required
            />
            <label className="form-check-label" htmlFor="food">
              Food
            </label>
          </div>
        </div>
        <textarea
          name="content"
          placeholder={FOOD ? "Good food heals you, what did you eat?" : "Exercise calms you, what did you do?"}
          rows="3"
          className="mt-3"
          style={{
            border: '2px dashed #3498db',
            borderRadius: '5px',
            padding: '8px'
          }}
          required
        />
        <button className="add_note" type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
