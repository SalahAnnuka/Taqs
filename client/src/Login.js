import {Link} from 'react-router-dom';

function Login(){
    return(
        <div className="Login">
            <form>
                <input type="text" className="field" name="username"/>
                <input type='password' className="field" name="password"/>
                <div className="buttons">
                <button type="submit">Login</button>
                <span>Don't have account? <Link to='/SignUp'>Sign Up</Link></span>
                </div>
            </form>
        </div>
    );
}
export default Login;