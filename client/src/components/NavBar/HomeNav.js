import taqs_white from '../drawable/taqs-white.svg';
import {Link} from 'react-router-dom';

function HomeNav(){
    return (
      <div className="NavBar">
        <img className="logo" src={taqs_white} alt="Logo image."/>
        <div className='navButtons'>
            <Link to='/Login' className='navOption'>Login</Link>
            <Link to='/SignUp' className='navOption'>Sign Up</Link>
        </div>
      </div>
    );
  }

  export default HomeNav;