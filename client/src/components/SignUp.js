import { useEffect, useState } from 'react';
import axios from "axios";
import {Link , useNavigate} from 'react-router-dom';
import "./styles/Login-SignUp.css";

const USR_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PSWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function SignUp(){
    const navigate = useNavigate();

    const [errMessage,setErrMessage] = useState('');

    const [username,setUsername] = useState('');
    const [validUserName,setValidUsername] = useState(false);

    const [password,setPassword] = useState('');
    const [validPassword,setValidPassword] = useState(false);

    const [password2,setPassword2] = useState('');
    const [validMatch,setValidMatch] = useState(false);


    useEffect(() => {
        validateUserName(username);
    }, [username]);
    
    useEffect(() => {
        if (validPassword)
            validateMatch();
    }, [password, password2]);
    
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
            setErrMessage('Invalid username, Please try something else');
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
            setErrMessage('Invalid password, Not strong enough.');
            setValidPassword(false);
        }
        else
        {
            setErrMessage('');
            setValidPassword(true);
        }
        if (username=="")
        {
            setErrMessage("Username Cannot be empty.");
            return;
        }
    }

    function validateMatch(){
        if(!validPassword && password!="")
            return;

        if (password2=="")
        {
            setValidMatch(false);
            return;
        }

        var result = (password === password2);
        if (!result)
        {
            setErrMessage('Password doesnt match.');
            setValidMatch(false);
        }
        else
        {
            setErrMessage('');
            setValidMatch(true);
        }
        if (username=="")
        {
            setErrMessage("Username Cannot be empty.");
        }
    }

    function onUsernameChange(usr){
        setUsername(usr);
    }

    function onPasswordChange(pswd){
        setPassword(pswd);
    }

    function onPassword2Change(pswd2){
        setPassword2(pswd2);
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
                else if(res.data=="success"){
                    navigate(`/Login`);
                }
                else if(res.data=="fail"){
                    setErrMessage('Sign up failed, Please try again.');
                }
            })
            .catch(e=>{
                setErrMessage('Sign up failed, Please try again.');
                console.log("connection error: "+e);
            })

        }
        catch(e){
            console.log("client side error: "+e);

        }

    }

    return(
        <div className="login-signup-root">
            <form className='form-box' action='POST'>
            <h1 className='form-title'>Sign Up to Taqs</h1>
                <input type="text" value={username} className="form-field" name="username" placeholder='Username' onChange={(e)=>onUsernameChange(e.target.value)} required/>
                <input type='password' value={password} className="form-field" name="password" placeholder='Password' onChange={(e)=>onPasswordChange(e.target.value)} required/>
                <input type='password' value={password2} className="form-field" name="password2" placeholder='Confirm Password' onChange={(e)=>onPassword2Change(e.target.value)} required/>
                <button disabled={!validUserName || !validPassword || !validMatch} type="submit" className='submit-button' onClick={submit}>Sign Up</button>
                <div className='submit-error-message'>{errMessage}</div>
                <span className="form-subtext">Already have account? <Link className='form-link' to='/Login'>Login.</Link></span>
                <span className="form-subtext">Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>
            </form>
        </div>
    );
}
export default SignUp;