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
    setNote((prevNote) => ({
        ...prevNote,
        ["mode"] : gender
        }));
    props.onAdd(note);
    setNote({
      date : "",
      content: "",
      mode : ""
    });
    event.preventDefault();
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
        />
        <div className="col-md-6 my-3 action_field">
                        <h6 className="mb-2 pb-1">What would you like to log today?</h6>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="exercise" onChange = {() => setMode("exercise")} onClick={() => handleonClick("exercise")} value="exercise" />
                        <label className="form-check-label" htmlFor="femaleGender">Exercise</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="food" onChange = {() => setMode("food")} value="food" onClick={() => handleonClick("food")} />
                        <label className="form-check-label" htmlFor="maleGender">Food
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
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
