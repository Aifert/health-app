import React, {useState, useEffect} from "react";
import {createClient} from 'pexels';

function Image(){
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        const client = createClient(process.env.PEXESAPIKEY)
        const query = "Switzerland"

        client.photos.search({
            query,
            per_page : 1
        })
        .then(response => {
            setPhotoURL(response.photos[0].url);
        })
        .catch(error => {
            console.error("Error fetching photos", error);
        })
    }, []);

    return (photoURL)
}

export default Image