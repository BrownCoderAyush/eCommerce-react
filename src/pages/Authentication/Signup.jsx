import { Link, useNavigate } from "react-router-dom";
import Auth from "../../components/Auth/Auth";
import { signUp } from '../../APIs/fakeStoreProdApis';
import axios from "axios";
import { useState } from "react";
function Signup() {

    const navigator = useNavigate();
    const [resetSignUpForm,setResetSignUpForm ]= useState(false);
    async function handleOnSubmit(authArgs,resetForm){
        try {
            
            const response = await axios.post(signUp(),{
                username : authArgs.username,
                email : authArgs.email,
                password : authArgs.password
            });
            navigator('/signin');

        } catch (error) {
            console.log(error);
            resetForm();
        }
    }

    return (
        <div className="container">
            <div className="row">
                <h2 className="home-title text-center">
                    Welcome to Shop Cart
                </h2>
            </div>
            <div className="login-wrapper" id="loginForm">
                <h4 className="text-center">SignUp</h4>
                <Auth 
                    onSubmit={handleOnSubmit}
                />
                <div className="signup-btn text-center" id="showSignupBtn">
                    <Link to="/signin"> 
                    Already have an Account? Sign In Here
                    </Link>
                </div>

            </div>
        </div>
    )
}


export default Signup;