import React, { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import "./styles/Login-SignUp.css";



function Login(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [errMessage,setErrMessage]=useState('');
    const navigate = useNavigate();

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:7777/login",{
                username,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    navigate(`/User/${username}`,{state:{id:username}})
                }
                else if(res.data=="notexist"){
                    setErrMessage(`No such username as ${username}.`);
                }
            })
            .catch(e=>{
                setErrMessage('Login failed, Please try again.');
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

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
                <button type="submit" onClick={submit} className='submit-button'>Login</button>
                <div className="submit-error-message">{errMessage}</div>
                <span>Don't have account? <Link to='/SignUp'>Sign Up.</Link></span>
                <span>Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>

            </form>
        </div>
    );
}
export default Login;