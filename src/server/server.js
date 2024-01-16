import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';
import {createClient} from "pexels";

const app = express();
const port = 4000;

app.use(cors());

const client = createClient(process.env.APIKEY);


app.get("/wallpaper/:country", (req, res) => {
    try{
        const query = req.params.country;

        client.photos.search({
            query,
            per_page : 1
        })
        .then(
            response => {
                const id = response.photos[0].id;
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