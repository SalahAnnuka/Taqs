import SearchBar from './SearchBar';
import {Link,Navigate} from "react-router-dom";
import taqs_white from '../drawable/taqs-white.svg';
import { useState } from 'react';


 
function UserNav({Username}){

  const [user,setUser] = useState({Username});

  function logOut(){
    setUser(null);
  }

  if (!user || user=="")
  return(
    <Navigate to="/" replace=""/>
    );
    
    function handleClick(){
      try {logOut();}
      catch(error){console.log("failed to log out: "+error)}
    }


    return (
      <div className="NavBar">
        <Link to="/User"><img className="logo" src={taqs_white} alt="Logo image."/></Link>
        <button onClick={handleClick}>Log Out</button>
        <SearchBar/>
      </div>
    );
  }

  export default UserNav;