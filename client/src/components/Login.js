
import {Link} from 'react-router-dom';


function Login(){



    return(
        <div className="Login">
            <form className='formBox'>
                <h1 className='formTitle'>Login</h1>
                <input type="text" className="field" name="username" placeholder='Username' required/>
                <input type='password' className="field" name="password" placeholder='Password' required/>
                <button type="submit" className='submitButton'>Login</button>
                <span>Don't have account? <Link to='/SignUp'>Sign Up</Link></span>
            </form>
        </div>
    );
}
export default Login;