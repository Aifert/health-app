import React, {useState} from "react";

function Login(props){

    const [failed, updatefailed] = useState(false);
    const [message, updatemessage] = useState("");

    async function handleonSubmit(e){
        e.preventDefault();

        const emailAddress = document.getElementById("emailAddress").value;
        const password = document.getElementById("password").value;


        const data = {
            emailAddress,
            password,
        };

        try{
            const response = await fetch("http://localhost:4000/login", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            });
            

            if(response.ok){
                const responseData = await response.json();
                const userID = responseData.userID;
                console.log("Login Successfully");
                console.log(userID);
                props.loginSuccess(userID);
            }
            else{
                const errorData = await response.json();
                updatefailed(true);
                updatemessage(errorData.error);
                console.error("Login failed");
                
            }
        }
        catch(error){
            console.error("Error during Login:", error);
        }
    }

    return(
        props.show ? 
            <form onSubmit = {handleonSubmit}>
                <div className="row">
                {failed ? <div className = "existmessage"><h4>{message}</h4></div> : <></>}
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" id="emailAddress" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="firstName">Email</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="password" id="password" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="lastName">Password</label>
                    </div>
                </div>
                </div>
                <div className="mt-4 pt-2">
                <div className = "selectionbuttons">
                    <input className="btn  btn-lg" type="submit" value="Submit" />
                </div>
                </div>
            </form>
        : 
        <></>
    )
}

export default Login