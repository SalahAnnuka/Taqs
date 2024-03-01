import taqs_white from './drawable/taqs-white.svg';
import {Link} from 'react-router-dom';

function HomeNav(){
    return (
      <div className="HomeNav">
        <img className="logo" src={taqs_white}/>
        <div className='navButtons'>
            <Link to='/Login' className='navOption'>Login</Link>
            <Link to='/SignUp' className='navOption'>SignUp</Link>
        </div>
      </div>
    );
  }

  export default HomeNav;