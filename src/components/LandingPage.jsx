import React, {useState} from "react";
import Home from "./Home.jsx"

function LandingPage(props){
    const [country, setCountry] = useState("");
    const [countryProvided, setcountryProvided] = useState(false);

    function handleonSubmit(e){
        e.preventDefault();

        setcountryProvided(true);

        console.log(country);
    }
    
    return (
        !countryProvided ?
        <div id = "landing-page">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <div class = "selectionbuttons">
                    <form onSubmit={handleonSubmit}>
                      <div className = "label">
                        <label htmlFor="country">Welcome to my fitness app</label>
                      </div>
                      <br />
                      <div className = "label">
                        <label htmlFor="country">Where is your favourite Country?</label>
                      </div>
                        <input
                            type="text"
                            id="country"
                            className="form-control form-control-lg mb-5 mt-5"
                            value={country}
                            placeholder = {props.Error ? "Please Try Again" : ""}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div className = "label">
                        <button id = "landing-button" type="submit">Explore Now!</button>
                        </div>
                        </form>
                    </div>
                    <hr />
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