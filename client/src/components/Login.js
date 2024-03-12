import React, { useEffect, useState } from "react";
import {Link,useNavigate,useLocation} from 'react-router-dom';
import axios from "axios";
import "./styles/Login-SignUp.css";


const USR_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PSWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function Login(){
    const location = useLocation();
    const {stateType} = location.state ? location.state : "";

    const [username,setUsername] = useState('');
    const [validUserName,setValidUsername] = useState(false);

    const [password,setPassword] = useState('');
    const [validPassword,setValidPassword] = useState(false);

    const [errMessage,setErrMessage]=useState('');
    const [messageStyle,setMessageStyle] = useState('submit-alert-message');


    const navigate = useNavigate();

    useEffect(() => {
        if (stateType === "signup-successful"){
            setMessageStyle('submit-success-message');
            setErrMessage(`Sign up successful, Please log in.`);
        } else if (stateType === "unauthorized-entry"){
            setMessageStyle('submit-error-message');
            setErrMessage(`Unauthorized access, Login to continue.`);
        }
    });

    useEffect(() => {
        validateUserName(username);
    }, [username]);
    
    useEffect(() => {
        validatePassword(password);
    }, [password]);

    function validateUserName(un){
        if (un == ""){
            setValidUsername(false);
            return;
        }
        var result = USR_REGEX.test(un);
        if (!result)
        {
            setValidUsername(false);
        }
        else
        {
            setErrMessage('');
            setValidUsername(true);
        }
        console.log(result);
    }

    function validatePassword(ps){
        if (ps == ""){
            setValidPassword(false);
            return;
        }
        var result = PSWD_REGEX.test(ps);
        if (!result)
        {
            setValidPassword(false);
        }
        else
        {
            setErrMessage('');
            setValidPassword(true);
        }
    }

    async function submit(e) {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:7777/login", {
                username,
                password
            });
    
            const responseData = response.data;
    
            if (responseData === "success") {
                navigate(`/User/${username}`, { state: { id: username } });
            } else if (responseData === "notexist") {
                setMessageStyle('submit-alert-message');
                setErrMessage(`No such username as ${username}.`);
            } else if (responseData === "wrongpass") {
                setMessageStyle('submit-error-message');
                setErrMessage("Incorrect password.");
            } else if (responseData === "fail") {
                setMessageStyle('submit-error-message');

                setErrMessage('Login failed, Please try again.');
            }
        } catch (error) {
            setMessageStyle('submit-error-message');
            setErrMessage('Login failed, Please try again.');
            console.log(error);
        }
    }
    



    return(
        <div className="login-signup-root">
            <form action="POST" className='form-box'>
                <h1 className='form-title'>Login to Taqs</h1>
                <input
                    type="text"
                    className="form-field"
                    name="username"
                    placeholder='Username' 
                    onChange={(e) => { setUsername(e.target.value) }}
                    required/>

                <input 
                    type='password' 
                    className="form-field" 
                    name="password" 
                    placeholder='Password' 
                    onChange={(e) => { setPassword(e.target.value) }}
                    required/>
                <button disabled={!validUserName || !validPassword} type="submit" onClick={submit} className='submit-button'>Login</button>
                <div className={messageStyle}>{errMessage}</div>
                <span className="form-subtext">Don't have account? <Link to='/SignUp'>Sign Up.</Link></span>
                <span className="form-subtext">Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>

            </form>
        </div>
    );
}
export default Login;