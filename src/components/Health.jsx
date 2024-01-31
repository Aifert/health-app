import React, {useState, useEffect} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

const apiURL = "http://localhost:4000"

function Health(props) {
  const [notes, setNotes] = useState([]);

  async function getNote() {
    try {
      const response = await fetch(`${apiURL}/getNote/${props.userID}`);

      if (response.ok) {
        const responseData = await response.json();
        const result = responseData.result;
        return result;
      }
    } catch (error) {
      console.log("Error getting data", error.message);
    }
  }

  async function addNote(newNote) {
    try {
      const addResponse = await fetch(`${apiURL}/addNote/${props.userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (addResponse.ok) {
        const data = await getNote();
        console.log(data);
        setNotes(data);
      } else {
        console.log("Error adding note");
      }
    } catch (error) {
      console.log("Error adding note", error.message);
    }
  }

  async function deleteNote(id, date) {

    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    
    const req_body = {Date : date};
    try{
      const deleteResponse = await fetch(`${apiURL}/deleteNote/${props.userID}`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(req_body)
      });

      console.log(deleteResponse);
    }
    catch(error){
      console.log("Error deleting note", error.message);
    }




  }

  const handleLogout = () => {
    // Perform any logout logic if needed

    // Redirect to the home page
    window.location.href = '/';
  };


  useEffect(() => {
    // Load notes when the component mounts
    const loadNotes = async () => {
      const result = await getNote();
      setNotes(result);
    };

    loadNotes();
  }, [props.userID]); // Trigger the effect when props.userID changes

  

  return (
    <div style = {props.componentstyle}>
      <button className="logout" onClick={handleLogout}>
      Log Out
      </button>
      <CreateArea onAdd={addNote}/>
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          date={noteItem.date}
          exercise_names={noteItem.exercise_names}
          food_names={noteItem.food_names}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default Health