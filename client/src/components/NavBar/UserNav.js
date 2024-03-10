import SearchBar from './SearchBar';
import {Link,Navigate} from "react-router-dom";
import taqs_white from '../drawable/taqs-white.svg';
import { useState } from 'react';
import "./UserNav.css";


 
function UserNav(){
  return (
    <div className="NavBar">
      <Link to="/User"><img className="logo" src={taqs_white} alt="Logo image."/></Link>
      <div className='usernav-right-elements'>
        <SearchBar/>
      </div>
    </div>
  );
}

export default UserNav;