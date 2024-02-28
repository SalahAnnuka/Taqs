import taqs_white from './drawable/taqs-white.svg';
import {Link} from 'react-router-dom';
import './styles/Home.css';

function Navbar(){
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
  
  function Home(){
    return (
      <div className="Home">
        <Navbar/>
      </div>
    );
  }

  export default Home;