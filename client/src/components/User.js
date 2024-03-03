
import UserNav from "./NavBar/UserNav";
import {Routes, Route, Navigate} from "react-router-dom";
import UserPage from "./UserPage";
import { useState } from 'react';


  function User(){
    const [user,setUser] = useState("Salah");

    function logOut(){
      setUser(null);
    }

    if (!user)
    return(
      <Navigate to="/" replace=""/>
      );
    return (
      <div className="Home">
          <UserNav user={user} logOut={logOut}/>
          <UserPage/>
      </div>
    );
  }

  export default User;