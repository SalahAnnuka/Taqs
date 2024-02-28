import {Link} from 'react-router-dom';

function SignUp(){
    return(
        <div className="Login">
            <form>
            <input type="email" className="field" name="email" placeholder='E-mail'/>
                <input type="text" className="field" name="username"/>
                <input type='password' className="field" name="password"/>
                <div className="buttons">
                <button type="submit">Sign Up</button>
                <span>Already have account? <Link to='/Login'>Login</Link></span>
                </div>
            </form>
        </div>
    );
}
export default SignUp;