import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth/Auth';
import './Auth.css';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { sigin } from '../../APIs/fakeStoreProdApis';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import UserContext from '../../context/UserContext';
import useCart from '../../hooks/useCart';

function Login() {

    const authRef = useRef(null);
    const navigator = useNavigate();
    const [token, setToken] = useCookies(['jwt-token']);
    const{user,setUser}=useContext(UserContext);
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
            const tkn = response.data.token;
            console.log('tkn',tkn);
            const tokenDetails = jwtDecode(tkn);
            setUser({username : tokenDetails.user, id : tokenDetails.id });
            setToken('jwt-token',response.data.token,{httpOnly:true}); 
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