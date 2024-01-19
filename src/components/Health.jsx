import React, {useState} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Health(props) {
    const [notes, setNotes] = useState([]);
  
    function addNote(newNote) {
        //here probably need to send a post request to server to add the note into the database
        //depending on which kind
    
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });

    //   try{
    //     const reponse = await fetch("http://localhost:4000/")
    //   }
    }
  
    function deleteNote(id) {
        //Delete note, need to send an id to the database to delete the note, 
        //so we need a note database, it will include all the stats
        // then when the user inputs a new prompt, it will update the field for that user 
        // and display the note
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
  
    return (
      <div>
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    );
  }

export default Health