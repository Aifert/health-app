import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';
import {createClient} from "pexels";
import pg from "pg";
import bodyParser from "body-parser"
import bcrypt from "bcrypt";
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3001;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json())

var user_id;

let db;

if (process.env.DB_URL) {
  db = new Sequelize(process.env.DB_URL);
} else {
  db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

const client = createClient(process.env.APIKEY);

async function verifyClient(emailaddress){
    const result = await db.query("SELECT emailaddress FROM credentials WHERE emailaddress=$1", [emailaddress]);

    if (result.rows.length === 0){
        return true;
    }
    else{
        return false;
    }
}

async function saltPassword(password){
    const hash = bcrypt.hashSync(password, saltRounds);

    return hash;
}

async function registerClient(firstname, lastname, gender, emailAddress, password){
    try{
        await db.query("INSERT INTO credentials (first_name, last_name, emailaddress, password, gender) VALUES \
                        ($1, $2, $3, $4, $5)", [firstname, lastname, emailAddress, password, gender]);
    }
    catch(error){
        console.log("Error registering client", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

async function checkClient(emailAddress, pw){
    try{
        const result = await db.query("SELECT first_name, last_name, id, password FROM credentials WHERE emailaddress = $1" , [emailAddress]);

        if(result.rowCount !== 0){
            const {first_name, last_name ,id, password} = result.rows[0];

            if(bcrypt.compareSync(pw, password)){
                user_id = id;
                var username = `${first_name} ${last_name}`
                return {valid : true , message : "Login Successful", username : username};
            }
            else{
                return {valid : false, message : "Wrong email or password, please try again"}
            }
        }
        else{
            return {valid : false, message : "User does not exist"};
        }

       
    }
    catch(error){
        console.log("Error logging in client", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

async function organisebyDate(exercise_results,food_results){
    const organizedData = [];
    let currentEntry;

    exercise_results.forEach((result) => {
        const {date, exercise_name, minutes} = result;

        if (!currentEntry || currentEntry.date !== date) {
            // Create a new entry if the date changes
            currentEntry = { date, exercise_names: [], food_names : []};
            organizedData.push(currentEntry);
            }

            const exerciseEntry = currentEntry.exercise_names.find(entry => entry.exercise === exercise_name);

            if(exerciseEntry){
                exerciseEntry.minutes += minutes
            }
            else{
                currentEntry.exercise_names.push({exercise : exercise_name, minutes : minutes})
            }
    })

    food_results.forEach((result) => {
        const { date, food_name , protein, calories, carbs} = result;

        var Protein = parseInt(protein);
        var Calories = parseInt(calories);
        var Carbs = parseInt(carbs);
    
        // Search for an existing entry with the same date
        const existingEntry = organizedData.find((entry) => entry.date === date);
    
        if (existingEntry) {
            // If an entry exists, append the food_name to the names array
            const foodEntry = existingEntry.food_names.find(entry => entry.food_name === food_name)

            if(foodEntry){
                foodEntry.protein += Protein;
                foodEntry.calories += Calories;
                foodEntry.carbs += Carbs;
            }
            else{
                existingEntry.food_names.push({food_name: food_name, protein : Protein, calories : Calories, carbs : Carbs});
            }
        } else {
            // If no entry exists, create a new entry
            const newEntry = {date, exercise_names:[], food_names: [{food_name: food_name, protein : Protein, calories : Calories, carbs : Carbs}]};
            organizedData.push(newEntry);
        }
    });

    return organizedData;
}


async function fetchData(id) {
    try {
      const [exercise_Result, food_Result] = await Promise.all([
        db.query(
          "SELECT user_id, exercise_name, date, minutes FROM exercise WHERE user_id = $1 ORDER BY date",
          [id]
        ),
        db.query(
          "SELECT user_id, food_name, date, protein, calories, carbs FROM food WHERE user_id = $1 ORDER BY date",
          [id]
        ),
      ]);

      const res = await organisebyDate(exercise_Result.rows, food_Result.rows);

      return res
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  }
  

async function addNoteToDb(note){
    const {userID, date, content, mode, details} = note

    if(userID !== "" && date !== "" && content !== "" && mode !== "" && details){
        if(mode === "food"){
            const {protein, calories, carbs} = details;
            try{
                const query = `INSERT INTO ${mode} (user_id, date, ${mode}_name, protein, calories, carbs) VALUES ($1, $2, $3, $4, $5, $6)`;

                const result = await db.query(query, [userID, date, content, protein, calories, carbs])
            }
            catch(error){
                console.error("Error adding note", error.message);
            }
            
        }
        else{
            const {minutes} = details;
            try{
                const query = `INSERT INTO ${mode} (user_id, date, ${mode}_name, minutes) VALUES ($1, $2, $3, $4)`;

                const result = await db.query(query, [userID, date, content, minutes])
            }
            catch(error){
                console.error("Error adding note", error.message);
            }
        }
    }

}

async function deletefromDB(id, date){
    if(id && date){
        try{
            const exercise_query = `DELETE FROM exercise WHERE user_id = $1 AND date = $2`;
            const food_query = `DELETE FROM food WHERE user_id = $1 AND date = $2`;

            const eresult = await db.query(exercise_query, [id, date]);
            const fresult = await db.query(food_query, [id, date]);
        }
        catch(error){
            console.log("Error deleting entry ", error.message);
        }
    }
}

app.get("/wallpaper/:country", (req, res) => {
    try{
        const query = req.params.country;

        client.photos.search({
            query,
            per_page : 10
        })
        .then(
            response => {
                var number = Math.floor(Math.random() * 10);
                const id = response.photos[number].id;
                res.json({
                    photoID : id
                })
            }
        )
    }
    catch(err){
        console.log("Error fetching wallpaper");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post("/register", async (req, res) => {
    const {firstName, lastName, gender, emailAddress, password} = req.body;

    const result = await verifyClient(emailAddress);

    const saltedPw = await saltPassword(password);

    const email = emailAddress.toLowerCase();

    if(result){
        try{
            await registerClient(firstName, lastName, gender, email, saltedPw);

            console.log(`${firstName} ${lastName} has been successfully registered`);
            res.status(200).json({ message: "Registration successful" });
        }
        catch(error){
            console.log("Error registering user");
            res.status(500).json({error : "Internal Server Error"});
        }
    }
    else{
        console.log("User already exists");
        res.status(500).json({error : "Internal Server Error", message : "User already Exist, try logging in instead"});
    }
})

app.post("/login", async (req, res) => {
    const {emailAddress, password} = req.body;

    const email = emailAddress.toLowerCase();

    const result = await checkClient(email, password);

    if(result.valid){
        res.status(200).json({message : "Login Successful", userID : user_id, username : result.username})
    }
    else{
        console.log("Wrong credentials");
        res.status(500).json({error : result.message});
    }
})

app.get("/getNote/:id", async (req, res) => {
    const userID = parseInt(req.params.id);

    const response = await fetchData(userID);

    if(response){
        res.status(200).json({message : "Successful", result : response})
    }
    else{
        console.log("Error fetching data");
        res.status(500).json({error : "Internal Server Error"});
    }
}) 


app.post("/addNote/:id", async (req, res) =>{
    const userID = parseInt(req.params.id);
    const {date, content, mode, details} = req.body;

    const note = {userID, date, content, mode, details}

    console.log("Adding note");

    try{
        await addNoteToDb(note);

        res.status(200).json({ success: true });
    }
    catch(error){
        res.status(500).json({message : "Failed to addNote"});
    }
})

app.post("/deleteNote/:id", async (req, res) => {
    const userID = parseInt(req.params.id);
    const {Date} = req.body;

    await deletefromDB(userID, Date);
})

app.post("/duplicateNote/:id", async (req, res) => {
    const userID = parseInt(req.params.id);
    const {date, exercise_names, food_names} = req.body;

    const today = new Date();
    const options = { day: '2-digit', month: '2-digit' , year: 'numeric' };
    const newDate = today.toLocaleDateString('en-GB', options);

    var start = "exercise";
    var i = 0;

    try {
        const duplicatedItems = [...exercise_names, ...food_names];
        for (let i = 0; i < duplicatedItems.length; i++) {
          const item = duplicatedItems[i];
          let start;
          let details;
      
          if (i < exercise_names.length) {
            start = "exercise";
            details = { minutes: item.minutes };
          } else {
            start = "food";
            details = { protein: item.protein, calories: item.calories, carbs: item.carbs };
          }
      
          const response = await axios.post(`http://localhost:${port}/addNote/${userID}`, {
            date: newDate,
            content: start === "exercise" ? item.exercise : item.food_name,
            mode: start,
            details: details,
          });
        }

        res.status(200).json({message : "duplicated successfully"});
      } catch (error) {
        console.log("Error duplicating note", error.message);
        res.status(500).json({ message: "Failed to duplicate Note" });
      }
    
})

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})