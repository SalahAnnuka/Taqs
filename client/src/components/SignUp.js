import { useRef, useState } from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import "./styles/Login-SignUp.css";

const USR_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PSWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function SignUp(){
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pswd,setPswd] = useState('');
    const [validPswd,setValidPswd] = useState(false);
    const [pswdFocus,setPswdFocus] = useState(false);

    const [matchPswd,setMatchPswd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [signupErr,setSingupErr] = useState("");



    return(
        <div className="login-signup-root">
            <form className='form-box' action='POST'>
            <h1 className='form-title'>Sign Up to Taqs</h1>
            <input type="email" className="form-field" name="email" placeholder='E-Mail' required/>
                <input type="text" className="form-field" name="username" placeholder='Username' required/>
                <input type='password' className="form-field" name="password" placeholder='Password' required/>
                <button type="submit" className='submit-button'>Sign Up</button>
                <div className='submit-error-message'>{signupErr}</div>
                <span>Already have account? <Link className='form-link' to='/Login'>Login.</Link></span>
                <span>Not interested enough? <Link className='form-link' to='/'>Go Home.</Link></span>
            </form>
        </div>
    );
}
export default SignUp;