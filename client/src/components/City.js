import React, { useEffect, useState } from "react";
import UserNav from "./NavBar/UserNav";
import { useParams,Navigate } from "react-router-dom";
import CityDetails from "./CityDetails";
import Facts from "./Facts"
import Forecast from "./Forecast";


function City(){
    const {country,city} = useParams();
    

    return (
        <div className="Home">
          <UserNav/>
          <div className="home-body">
            <CityDetails country={country} city={city}/>
            <Forecast country={country} city={city}/>
            <Facts/>
          </div>
        </div>
    );
  }
export default City;

/*

*/