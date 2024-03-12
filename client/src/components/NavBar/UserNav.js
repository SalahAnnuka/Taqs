import SearchBar from './SearchBar';
import {Link,Navigate} from "react-router-dom";
import taqs_white from '../drawable/taqs-white.svg';
import { useState } from 'react';
import "./UserNav.css";


 
function UserNav({Username}){

  return (
    <div className="NavBar">
      <Link to={`/User/${Username}`}><img className="logo" src={taqs_white} alt="Logo image."/></Link>
      <div className='usernav-right-elements'>
        <SearchBar Username={Username}/>
      </div>
    </div>
  );
}

export default UserNav;