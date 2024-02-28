import taqs_white from './drawable/taqs-white.svg';
import {Link} from 'react-router-dom';
import './styles/User.css';

function Navbar(){
    return (
      <div className="HomeNav">
        <img className="logo" src={taqs_white}/>
        <form>
            <input type='text' placeholder='Enter Your Query...'/>
            <button>Search</button>
        </form>
      </div>
    );
  }
  
  function User(){
    return (
      <div className="Home">
        <Navbar/>
      </div>
    );
  }

  export default User;