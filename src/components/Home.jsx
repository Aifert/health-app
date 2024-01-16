import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";

function Home() {
  const [isClicked, updateisClicked] = useState(true);
  const [photoURL, setPhotoURL] = useState("LMAO");

  function handleonClick() {
    updateisClicked(!isClicked);
  }

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:4000/wallpaper");
      const data = await response.json();

      const newPhotoURL = `https://images.pexels.com/photos/${data.photoID}/pexels-photo-${data.photoID}.jpeg`;
      setPhotoURL(newPhotoURL);

      console.log(newPhotoURL); // This will log the updated state
    } catch (error) {
      console.error("Error fetching photos", error);
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