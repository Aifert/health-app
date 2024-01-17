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

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "health-app",
    password : process.env.DBPW,
    port : process.env.DBPORT,
});
db.connect();

const client = createClient(process.env.APIKEY);

async function verifyClient(firstname, lastname){
    const result = await db.query("SELECT first_name, last_name FROM credentials WHERE first_name = $1 AND last_name = $2", [firstname, lastname]);

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

    const result = await verifyClient(firstName, lastName);

    console.log(result);

    if(result){
        console.log("Registering User");
        try{
            await registerClient(firstName, lastName, gender, emailAddress, password);

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

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})