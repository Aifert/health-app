import React, {useState, useEffect} from "react";
import Home from "./Home.jsx"

const apiURL = "https://health-app-jqdy.onrender.com"

function LandingPage(props){
    const [country, setCountry] = useState("");
    const [countryProvided, setcountryProvided] = useState(false);

    const countries = ["Singapore", "Malaysia", "Australia", "Russia", "India", "New Zealand"];

    function handleonSubmit(e){
        e.preventDefault();

        setcountryProvided(true);
    }

    async function handleGenerate() {

      const randomIndex = Math.floor(Math.random() * countries.length);
    

      const randomCountry = countries[randomIndex];

      setCountry(randomCountry);
      
      setcountryProvided(true);

      document.getElementById("country").value = randomCountry;
    

      document.getElementById("landing-button").click();

    }
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiURL}/ping`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const responseData = await response.json();

          console.log(responseData.message);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      const intervalId = setInterval(() => {
        fetchData();
      }, 1000); // 1000 milliseconds = 1 second
  
    }, []);

    return (
      !countryProvided ? 
        <div id="landing-page">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="cardcontainer col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <div class = "selectionbuttons">
                    <form onSubmit={handleonSubmit}>
                      <div className = "label">
                        <h3><label htmlFor="country">Welcome to my fitness app</label></h3>
                      </div>
                      <br />
                      <div className = "random">
                        <div className = "title mb-2">
                        <h5>Generate a random country</h5>
                        </div>
                        <div className = "generate mb-5">
                          <button className = "generateButton" onClick={handleGenerate}>Generate</button>
                        </div>
                      </div>
                      <div className = "title mb-5">
                        <h6>OR</h6>
                      </div>
                      <div className = "label mb-3">
                      <h5>
                      <label htmlFor="country">Input your favourite Country</label>
                      </h5>
                      </div>
                        <input
                            type="text"
                            id="country"
                            className="form-control form-control-lg mb-3 "
                            value={country}
                            placeholder = {props.Error ? "Please Try Again" : ""}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div className = "label">
                        <button id = "landing-button" type="submit">Explore Now!</button>
                        </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
        :
        <Home 
        Country = {country}
        />
      );
}

export default LandingPage;