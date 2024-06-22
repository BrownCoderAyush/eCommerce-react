import { useEffect, useState } from "react";

function Auth({ onSubmit}){



    const [formDetails,setFormDetails] = useState({
        email: '',
        password: '',
        username: '',
        isLoading : false
    });

    function updatedEmail(updatedEmail){
        setFormDetails({...formDetails,email:updatedEmail});
    }
    
    function updatedPassword(updatedPassword){
        setFormDetails({...formDetails,password:updatedPassword});
    }

    function updatedUsername(updatedUsername){
        setFormDetails({...formDetails,username:updatedUsername});
    }

    function onFormSubmit(){
        setFormDetails({...formDetails,isLoading:true});
        console.log(onSubmit);
        onSubmit(formDetails,resetForm);
    }
    
    function resetForm() {
        setFormDetails({email: '', password: '', username: '', isLoading: false});
    }

    useEffect(()=>{
        setFormDetails({
            email: '',
            password: '',
            username: '',
            isLoading : false
        });
    },[]);


    return (
        <>
        <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        id="loginUsername" 
                        value={formDetails.username}
                        onChange={(e)=>updatedUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="email" 
                        id="loginEmail" 
                        value={formDetails.email}
                        onChange={(e)=>updatedEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        id="loginPassword"
                        value={formDetails.password} 
                        onChange={(e)=>updatedPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <button className="form-control btn btn-primary"
                        type="button"
                        onClick={onFormSubmit}
                        disabled={formDetails.isLoading}
                    >
                        {
                            (formDetails.isLoading)&& <span 
                            className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        }
                        {(formDetails.isLoading)?'Loading...':'Submit'}
                    </button>
                    
                </div>
        </>
    )
}

export default Auth;