import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';
import {createClient} from "pexels";
import pg from "pg";

const app = express();
const port = 4000;

app.use(cors());

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "health-app",
    password : process.env.DBPW,
    port : process.env.DBPORT,
});
db.connect();

const client = createClient(process.env.APIKEY);



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

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})