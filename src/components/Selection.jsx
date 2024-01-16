import React, {useState} from "react";
import Register from "./Register";
import Login from './Login';

function Selection(){

    const [isClicked, updateisClicked] = useState(true);

    function handleonClick(){
        updateisClicked(!isClicked)
    }

    return (
        <div class="selection">
        <div>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <div class = "buttons">
                        <button onClick = {handleonClick}>Login</button>
                        <button onClick = {handleonClick}>Register</button>
                    </div>
                    <hr />
                    <Register 
                    show = {!isClicked}
                    />
                    <Login 
                    show = {!isClicked}
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

export default Selection