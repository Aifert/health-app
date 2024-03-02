import React, {useState, useEffect} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

const apiURL = "https://health-app-jqdy.onrender.com"

function Health(props) {
  const [notes, setNotes] = useState([]);
  const [order, updateOrder] = useState("most");

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
    }
    catch(error){
      console.log("Error deleting note", error.message);
    }

  }

  async function duplicateNote(id){

    const note = notes.find((noteItem,index) => {
      return index === id;
    })

    try{
      const duplicateResponse = await fetch(`${apiURL}/duplicateNote/${props.userID}`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(note)
      });

      console.log(duplicateResponse);

      if (duplicateResponse.ok) {
        const updatedNotes = await getNote();
        setNotes(updatedNotes);
      } else {
        console.log("Error duplicating note");
      }
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

  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  async function sort(result, order) {
    const sortedResult = [...result];
    if (order === "most") {
      sortedResult.sort((a, b) => convertDate(b.date) - convertDate(a.date));
    } else if (order === "least") {
      sortedResult.sort((a, b) => convertDate(a.date) - convertDate(b.date));
    }
  
    return sortedResult;
  }

  useEffect(() => {
    // Load notes when the component mounts
    const loadNotes = async () => {
      const result = await getNote();

      const sortedData = await sort(result, order);

      setNotes(sortedData);
    };

    loadNotes();
  }, [props.userID, order]); // Trigger the effect when props.userID changes

  

  return (
    <div style = {{backgroundColor : "#ebe3d5"}}>
      <button className="logout" onClick={handleLogout}>
      Log Out
      </button>
      <div className = "welcome">
        <h3>{`Welcome ${props.username}`}</h3>
      </div>
      <CreateArea onAdd={addNote}/>
      <div className = "sort">
        <button onClick = {() => updateOrder("most")} style={order === "most" ? { opacity: "70%" } : { opacity: "100%" }} className = "sort-button">Sort by most recent</button>
        <button onClick = {() => updateOrder("least")} style={order === "least" ? { opacity: "70%" } : { opacity: "100%" }} className = "sort-button">Sort by least recent</button>
      </div>
      <div className = "center">
      <div className = "notewrapper">
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          date={noteItem.date}
          exercise_names={noteItem.exercise_names}
          food_names={noteItem.food_names}
          onDelete={deleteNote}
          onDuplicate={duplicateNote}
        />
      ))}
      </div>
      </div>
    </div>
  );
}

export default Health