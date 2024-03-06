import { useRef, useState } from 'react';
import axios from "axios";
import {Link , useNavigate} from 'react-router-dom';
import "./styles/Login-SignUp.css";

const USR_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PSWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function SignUp(){
    const navigate = useNavigate();

    const [errMessage,setErrMessage] = useState('');

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');

    function validateUserName(un){
        var result = USR_REGEX.test(un);
        if (!result)
        {
            setErrMessage('Invalid username, Please try something else');
        }
        else
        {
            setErrMessage('');
        }
        console.log(result);
    }

    function validateMatch(){
        var result = (password == password2);
        if (!result)
        {
            setErrMessage('Password doesnt match.');
        }
        else
        {
            setErrMessage('');
        }
        console.log(password);
        console.log(password2);
        console.log(result);
    }

    function validatePassword(ps){
        var result = PSWD_REGEX.test(ps);
        if (!result)
        {
            setErrMessage('Invalid password, Not strong enough.');
        }
        else
        {
            setErrMessage('');
        }
        console.log(result);
    }

    function onUsernameChange(usr){
        setUsername(usr);
        validateUserName(username);
    }

    function onPasswordChange(pswd){
        setPassword(pswd);
        validateMatch();
        validatePassword(password);
    }

    function onPassword2Change(pswd2){
        setPassword2(pswd2);
        validateMatch();
    }

    async function submit(e){
        e.preventDefault();
        try{

            await axios.post("http://localhost:7777/signup",{
                username,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    setErrMessage(`Usename ${username} already exists.`);
                }
                else if(res.data=="notexist"){
                    navigate(`/Login`);
                }
            })
            .catch(e=>{
                setErrMessage('Sign up failed, Please try again.');
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    return(
        <div className="login-signup-root">
            <form className='form-box' action='POST'>
            <h1 className='form-title'>Sign Up to Taqs</h1>
                <input type="text" className="form-field" name="username" placeholder='Username' onChange={(e)=>onUsernameChange(e.target.value)} required/>
                <input type='text' className="form-field" name="password" placeholder='Password' onChange={(e)=>onPasswordChange(e.target.value)} required/>
                <input type='text' className="form-field" name="password2" placeholder='Confirm Password' onChange={(e)=>onPassword2Change(e.target.value)} required/>
                <button type="submit" className='submit-button' onClick={submit}>Sign Up</button>
                <div className='submit-error-message'>{errMessage}</div>
                <span>Already have account? <Link className='form-link' to='/Login'>Login.</Link></span>
                <span>Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>
            </form>
        </div>
    );
}
export default SignUp;