import React, { useEffect, useState } from "react";
import axios from 'axios';

import UserNav from "./NavBar/UserNav";
import { useParams,Navigate } from "react-router-dom";
import CityDetails from "./CityDetails";
import Facts from "./Facts"
import Forecast from "./Forecast";


function City(){
    const {Username,country,city} = useParams();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAuthorization = async () => {
            try {
                // Make a request to the server to authorize the user
                const response = await axios.post(`http://localhost:7777/authorize/${Username}`);
                const { authorized } = response.data;

                // Update the state based on the authorization result
                setAuthorized(authorized);
                setLoading(false);
            } catch (error) {
                console.error("Error authorizing user:", error);
                setLoading(false);
            }
        };

        fetchAuthorization();
    }, [Username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        // If the user is not authorized, redirect to the login page or show an error message
        return (
          <Navigate to="/" replace=""/>
        );
    }
    

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