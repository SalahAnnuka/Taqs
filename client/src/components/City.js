import React, { useEffect, useState } from "react";
import UserNav from "./NavBar/UserNav";
import { useParams } from "react-router-dom";
import CityDetails from "./CityDetails";



function City(){
    const {country,city} = useParams();
    

    
    

    return (
        <div className="Home">
          <UserNav/>
          <CityDetails country={country} city={city}/>
        </div>
    );
  }
export default City;

/*

*/