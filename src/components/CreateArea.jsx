import React, { useState } from "react";

function CreateArea(props) {
  const [FOOD, setFOOD] = useState(false);

  function submitNote(event) {
    event.preventDefault();

    // Access form elements directly using event.target
    const date = event.target.elements.date.value;
    const mode = event.target.elements.mode.value;
    const content = event.target.elements.content.value;

    // Create a note object from form values
    const note = { date, mode, content };

    // Call the onAdd function with the note object
    props.onAdd(note);
  }
  
  return (
    <div>
      <form onSubmit={submitNote}>
        <input
          name="date"
          placeholder="Date"
          className="my-3"
          style={{
            border: '2px dashed #3498db',
            borderRadius: '5px',
            padding: '8px'
          }}
          required
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
