
import { useState } from 'react';
import {Link} from 'react-router-dom';
import "./styles/Login-SignUp.css";



function Login(){
    const [loginErr,setLoginErr] = useState("");


    function handleLogin(){
        // // Perform login validation (replace with your own logic)
        // if (username === 'example' && password === 'password') {
        //     //take me to userpage
        // } 
        // else {
        //     alert('Invalid login credentials');
        // }        
        console.log("ok");
    }



    return(
        <div className="login-signup-root" action='POST'>
            <form className='form-box' onSubmit={handleLogin}>
                <h1 className='form-title'>Login to Taqs</h1>
                <input type="text" className="form-field" name="username" placeholder='Username' required/>
                <input type='password' className="form-field" name="password" placeholder='Password' required/>
                <button type="submit" className='submit-button'>Login</button>
                <div className='submit-error-message'>{loginErr}</div>
                <span>Don't have account? <Link to='/SignUp'>Sign Up.</Link></span>
                <span>Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>

            </form>
        </div>
    );
}
export default Login;