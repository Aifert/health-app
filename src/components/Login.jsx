import React, {userState} from "react";

function Login(props){
    return(
        props.show ? 
            <form>
                <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" id="firstName" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="firstName">Email</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" id="lastName" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="lastName">Password</label>
                    </div>
                </div>
                </div>
            </form>
    : 
    <></>
    )
}

export default Login