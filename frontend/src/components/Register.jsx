import React, {useState, useEffect} from "react";

const apiURL = "https://health-app-jqdy.onrender.com"

function Register(props){

    const [exist, updateExist] = useState(props.exist);

    async function handleonSubmit(e){
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        const emailAddress = document.getElementById("emailAddress").value;
        const password = document.getElementById("password").value;

        const data = {
            firstName,
            lastName,
            gender,
            emailAddress,
            password,
        };

        try{
            const response = await fetch(`${apiURL}/register`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            });

            if(response.ok){
                console.log("Registered Successfully");
                props.onSuccess();
            }
            else{
                updateExist(true)
                console.error("Registration failed");
                
            }
        }
        catch(error){
            console.error("Error during Registration:", error);
        }
    }


    useEffect(() => {
        let timeoutId;
    
        if (exist) {
          timeoutId = setTimeout(() => {
            updateExist(false);
            // updatemessage('');
          }, 5000);
        }
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, [exist]);


    return  (
        props.show? 
            <form className="register" onSubmit = {handleonSubmit}>
                <div className="row">
                {exist ? <div className = "existmessage mb-3"><h4>Please try again, this user already exist</h4></div> : <></>}
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" id="firstName" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" id="lastName" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center">
                <div className="form-outline">
                    <input type="email" id="emailAddress" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="emailAddress">Email</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <h6 className="mb-2 pb-1">Gender: </h6>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="Female" checked />
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="Male" />
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="Other" />
                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                    <input type="password" id="password" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                    <input type="password" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="password">Repeat Password</label>
                    </div>
                </div>
                </div>
                <div className="mt-4 pt-2 selectionbuttons">
                <input className="btn btn-lg" type="submit" value="Submit" />
                </div>
            </form>
    : 
    <></>
    );
}

export default Register