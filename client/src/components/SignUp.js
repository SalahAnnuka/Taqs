import { useRef, useState } from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';

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



    return(
        <div className="Login">
            
            <form>
            <input type="email" className="field" name="email" placeholder='E-mail' required/>
                <input type="text" className="field" name="username" placeholder='Username' required/>
                <input type='password' className="field" name="password" placeholder='Password' required/>
                <div className="buttons">
                <button type="submit">Sign Up</button>
                <span>Already have account? <Link to='/Login'>Login</Link></span>
                </div>
            </form>
        </div>
    );
}
export default SignUp;