import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//API Urls
import { sigin } from '../../APIs/fakeStoreProdApis';
import './Auth.css';

//component imports 
import Auth from '../../components/Auth/Auth';

//context imports
import UserContext from '../../context/UserContext';

// custom hooks
import useCart from '../../hooks/useCart';

function Login() {

    const authRef = useRef(null);
    const navigator = useNavigate();
    const{setUser}=useContext(UserContext);
    const {fetchUserCart} = useCart();


    async function onAuthFormSubmit(formDetails){
        try {
        
            const response = await axios.post(sigin(),{
                username : formDetails.username,
                email : formDetails.email,
                password : formDetails.password
            },{
                withCredentials:true
            });
            const token = response.data.token;
            const tokenDetails = jwtDecode(token);
            setUser({username : tokenDetails.user, id : tokenDetails.id }); 
            fetchUserCart(tokenDetails.id);
            navigator('/');

        } catch (error) {
            authRef.current.resetFormData();
            console.log(error);   
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
                <h4 className="text-center">Login</h4>
                <Auth
                    onSubmit={onAuthFormSubmit}
                    ref={authRef}
                />
                <div className="signup-btn text-center" id="showSignupBtn">
                    <Link to="/signup">
                    Don't have an Account? Sign Up Here
                    </Link>
                </div>

            </div>
        </div>
    )
}


export default Login;