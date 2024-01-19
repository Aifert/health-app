import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    date : "",
    content: "",
    mode : ""
  });

  const [FOOD, setFOOD] = useState(false);
  const [mode, setMode] = useState("");

  const handleChange = (event) => {
    const { name, value} = event.target;
    // Check the input type
    // For other inputs, update name and value
    setNote((prevNote) => ({
    ...prevNote,
    [name]: value,
    }));
  };

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      date : "",
      content: "",
      mode : ""
    });
  }

  function handleonClick(action){
    if(action === "food"){
        setFOOD(true);
    }
    else{
        setFOOD(false);
    }
  }

  return (
    <div>
      <form onSubmit = {submitNote}>
        <input
          name="date"
          onChange={handleChange}
          value={note.title}
          placeholder="Date"
          className = "my-3"
          style={{
                border: '2px dashed #3498db', // Dashed border with blue color
                borderRadius: '5px',          // Optional: Adds rounded corners
                padding: '8px'
            }}
            required
        />
        <div className="col-md-6 my-3 action_field">
                        <h6 className="mb-2 pb-1">What would you like to log today?</h6>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="mode" id="exercise" onChange = {handleChange} onClick={() => handleonClick("exercise")} value="exercise"  required />
                        <label className="form-check-label" htmlFor="exercise">Exercise</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="mode" id="food" onChange = {handleChange} value="food" onClick={() => handleonClick("food")}  required />
                        <label className="form-check-label" htmlFor="food">Food
                        </label>
                        </div>
            </div>
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder={FOOD ? "Good food heals you, what did you eat?" : "Exercise calms you, what did you do?"}
          rows="3"
          className = "mt-3"
          style={{
                border: '2px dashed #3498db', // Dashed border with blue color
                borderRadius: '5px',          // Optional: Adds rounded corners
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
