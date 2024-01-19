import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [FOOD, setFOOD] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
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
      <form>
        <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">What would you like to log today?</h6>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="exercise" onClick={() => handleonClick("exercise")} value="option1" />
                        <label className="form-check-label" htmlFor="femaleGender">Exercise</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="food" value="option2" onClick={() => handleonClick("food")} />
                        <label className="form-check-label" htmlFor="maleGender">Food
                        </label>
                        </div>
            </div>
        <input
          name="date"
          onChange={handleChange}
          value={note.title}
          placeholder="Date"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder={FOOD ? "What did you eat today?" : "What did you do today?"}
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
