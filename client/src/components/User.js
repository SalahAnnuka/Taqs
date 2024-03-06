
import Facts from "./Facts";
import UserNav from "./NavBar/UserNav";
import UserPage from "./UserPage";
import { useState } from 'react';
import { useParams } from "react-router-dom";


  function User(){
    const {Username} = useParams;
    
    return (
      <div className="Home">
          <UserNav Username={Username}/>
          <div className="home-body">
            <UserPage/>
            <Facts/>
          </div>
      </div>
    );
  }

  export default User;