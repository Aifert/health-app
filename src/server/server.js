import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';
import {createClient} from "pexels";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

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
        console.log(result.rows);
        return true;
    }
    else{
        return false;
    }
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

        const {id, password} = result.rows[0];

        if(password === pw){
            user_id = id;
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.log("Error logging in client", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

async function organisebyDate(results, mode){
    const organizedData = {};

    results.forEach((result) => {
        if(mode === "exercise"){
            const {date, exercise_name} = result;

            if(!organizedData[date]){
                organizedData[date] = {names : []};
            }

            organizedData[date].names.push(exercise_name);            
        }
        else{
            const {date, food_name} = result;

            if(!organizedData[date]){
                organizedData[date] = {names : []};
            }

            organizedData[date].names.push(food_name);                  
        }
    })

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

      const exercise_res = await organisebyDate(exercise_Result.rows, "exercise");
      const food_res = await organisebyDate(food_Result.rows, "food");

      return {exercise_res, food_res}
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

    const email = emailAddress.toLowerCase();

    if(result){
        console.log("Registering User");
        try{
            await registerClient(firstName, lastName, gender, email, password);

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
        res.status(500).json({error : "Internal Server Error"});
    }
})

app.post("/login", async (req, res) => {
    const {emailAddress, password} = req.body;

    const email = emailAddress.toLowerCase();

    const result = await checkClient(email, password);

    if(result){
        res.status(200).json({message : "Login Successful", userID : user_id})
    }
    else{
        console.log("Wrong credentials");
        res.status(500).json({error : "Internal Server Error"});
    }
})

app.get("/getNote/:id", async (req, res) => {
    const userID = parseInt(req.params.id);

    console.log("Getting note");

    const {exercise_res, food_res} = await fetchData(userID);

    if(exercise_res || food_res){
        res.status(200).json({message : "Successful", exercise : exercise_res, food : food_res})
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

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})