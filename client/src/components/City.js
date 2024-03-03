import React, { useEffect, useState } from "react";
import UserNav from "./NavBar/UserNav";
import { useParams,Navigate } from "react-router-dom";
import CityDetails from "./CityDetails";



function City(){
    const {country,city} = useParams();
    

    return (
        <div className="Home">
          <UserNav/>
          <div className="home-body">
            <CityDetails country={country} city={city}/>
          </div>
        </div>
    );
  }
export default City;

/*

*/