import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';
import {createClient} from "pexels";
import pg from "pg";
import bodyParser from "body-parser"
import bcrypt from "bcrypt";

const app = express();
const port = 4000;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json())

var user_id;

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "health-app",
    password : process.env.DBPW,
    port : process.env.DBPORT,
});
db.connect();

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
        const result = await db.query("SELECT id, password FROM credentials WHERE emailaddress = $1" , [emailAddress]);

        if(result.rowCount !== 0){
            const {id, password} = result.rows[0];

            if(bcrypt.compareSync(pw, password)){
                user_id = id;
                return {valid : true , message : "Login Successful"}
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
        const {date, exercise_name} = result;

        if (!currentEntry || currentEntry.date !== date) {
            // Create a new entry if the date changes
            currentEntry = { date, exercise_names: [], food_names : [] };
            organizedData.push(currentEntry);
            }
        
            currentEntry.exercise_names.push(exercise_name);
    })

    food_results.forEach((result) => {
        const { date, food_name } = result;
    
        // Search for an existing entry with the same date
        const existingEntry = organizedData.find((entry) => entry.date === date);
    
        if (existingEntry) {
            // If an entry exists, append the food_name to the names array
            existingEntry.food_names.push(food_name);
        } else {
            // If no entry exists, create a new entry
            const newEntry = { date, exercise_names:[], food_names: [food_name] };
            organizedData.push(newEntry);
        }
    });

    return organizedData;
}

async function fetchData(id) {
    try {
      const [exercise_Result, food_Result] = await Promise.all([
        db.query(
          "SELECT user_id, exercise_name, date FROM exercise WHERE user_id = $1 ORDER BY date",
          [id]
        ),
        db.query(
          "SELECT user_id, food_name, date FROM food WHERE user_id = $1 ORDER BY date",
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
    const {userID, date, content, mode} = note

    if(userID !== "" && date !== "" && content !== "" && mode !== ""){
        try {
            const query = `INSERT INTO ${mode} (user_id, date, ${mode}_name) VALUES ($1, $2, $3)`;
    
            const result = await db.query(
              query,
              [userID, date, content]
            );
            }
        catch(error){
            console.error("Error adding note", error.message);
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
                var number = Math.floor(Math.random() * 10)
                console.log("Fetched");
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
        res.status(200).json({message : "Login Successful", userID : user_id})
    }
    else{
        console.log("Wrong credentials");
        res.status(500).json({error : result.message});
    }
})

app.get("/getNote/:id", async (req, res) => {
    const userID = parseInt(req.params.id);

    console.log("Getting note");

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
    const {date, content, mode } = req.body;

    const note = {userID, date, content, mode}

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

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})