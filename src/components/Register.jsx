import React from "react";

function Register(props){
    return  (
        props.show ? 
            <form>
                <div className="row">
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
                    <div className="form-outline datepicker w-100">
                    <input type="text" className="form-control form-control-lg" id="birthdayDate" />
                    <label htmlFor="birthdayDate" className="form-label">Email</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <h6 className="mb-2 pb-1">Gender: </h6>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="option1" checked />
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="option2" />
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="option3" />
                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                    <input type="email" id="emailAddress" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="emailAddress">Password</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="phoneNumber">Repeat Password</label>
                    </div>
                </div>
                </div>
                <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                </div>
            </form>
    : 
    <></>
    );
}

export default Register