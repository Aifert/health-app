import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import LandingPage from "./LandingPage"

function Home(props) {
  const [isClicked, updateisClicked] = useState(true);
  const [photoURL, setPhotoURL] = useState("LMAO");
  const [error, setError] = useState(false);

  function handleonClick() {
    updateisClicked(!isClicked);
  }

  async function fetchData() {
    if(photoURL === "LMAO"){
      try {
        const response = await fetch(`http://localhost:4000/wallpaper/${props.Country}`);
        const data = await response.json();

        const newPhotoURL = `https://images.pexels.com/photos/${data.photoID}/pexels-photo-${data.photoID}.jpeg`;
        setPhotoURL(newPhotoURL);
        setError(false);

        console.log(newPhotoURL); // This will log the updated state
      } catch (error) {
        setError(true);
        console.error("Error fetching photos", error);
      }      
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const componentStyle = {
    backgroundImage: `url(${photoURL})`,
    backgroundSize: "cover",
    backgroundPosition: "center", // Adjust as needed
    width: "100%",
    height: "100vh",
  };
    
    return (
        !error ? 
        <div className="Home">
        <div>
        <section className="vh-100 gradient-custom" style = {componentStyle}>
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                  <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline selectionbuttons">
                    <button onClick = {handleonClick} className = "login-register p-3">Login</button>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline selectionbuttons">
                    <button onClick = {handleonClick} className = "login-register p-3">Register</button>
                    </div>
                </div>
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
        :
        <LandingPage
        Error ={error}
         /> 
    )
}

export default Home