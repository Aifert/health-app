import React, {useState, useEffect} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Health(props) {
  const [notes, setNotes] = useState([]);

  async function getNote() {
    try {
      const response = await fetch(`http://localhost:4000/getNote/${props.userID}`);

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
      const addResponse = await fetch(`http://localhost:4000/addNote/${props.userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (addResponse.ok) {
        const data = await getNote();
        setNotes(data);
      } else {
        console.log("Error adding note");
      }
    } catch (error) {
      console.log("Error adding note", error.message);
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    // Load notes when the component mounts
    const loadNotes = async () => {
      const result = await getNote();
      setNotes(result);
    };

    loadNotes();
  }, [props.userID]); // Trigger the effect when props.userID changes

  return (
    <div>
      <CreateArea onAdd={addNote} />
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