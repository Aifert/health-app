import React, {useState, useEffect} from "react";
import Register from "./Register";
import Login from './Login';
import {createClient} from 'pexels';

function Home(){

    const [isClicked, updateisClicked] = useState(true);

    function handleonClick(){
        updateisClicked(!isClicked)
    }

    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        const client = createClient("")
        const query = "Switzerland"

        client.photos.search({
            query,
            per_page : 1
        })
        .then(response => {
            setPhotoURL(`https://images.pexels.com/photos/${response.photos[0].id}/pexels-photo-${response.photos[0].id}.jpeg`,)
            console.log(photoURL);
        })
        .catch(error => {
            console.error("Error fetching photos", error);
        })
    }, []);

    const componentStyle = {
      backgroundImage: `url(${photoURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', // Adjust as needed
      width: '100%',
      height: '100vh',
    };
    
    

    return (
        <div className="Home">
        <div>
        <section className="vh-100 gradient-custom" style = {componentStyle}>
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <div class = "selectionbuttons">
                        <button onClick = {handleonClick}>Login</button>
                        <button onClick = {handleonClick}>Register</button>
                    </div>
                    <hr />
                    <Register 
                    show = {!isClicked}
                    />
                    <Login 
                    show = {isClicked}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
        </div>

    )
}

export default Home