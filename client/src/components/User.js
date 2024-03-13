import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/User.css';
import UserNav from "./NavBar/UserNav";
import Facts from "./Facts";
import Forecast from "./Forecast";
import CityDetails from './CityDetails';
import LogOut from './LogOut';
function User() {

    const { Username } = useParams();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    const [cityLoad,setCityLoad] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        const fetchAuthorization = async () => {
            try {
                // Make a request to the server to authorize the user
                const response = await axios.post(`http://localhost:7777/authorize/${Username}`);
                const { authorized } = response.data;

                // Update the state based on the authorization result
                setAuthorized(authorized);
                setCityLoad(true);
            } catch (error) {
                console.error("Error authorizing user:", error);
                setCityLoad(false);
            }
        };

        const fetchCityCountry = async () => {
            try {
                // Make a request to the server to get city and country data
                const response = await axios.post(`http://localhost:7777/getCityCountry/${Username}`);
                const { city, country } = response.data;

                // Update the state with the retrieved city and country
                setCity(city);
                setCountry(country);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching city and country:", error);
                setLoading(true);
            }
        };
        fetchAuthorization();
        fetchCityCountry();
    }, [Username]);

    

    if (loading || !cityLoad) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        // If the user is not authorized, redirect to the login page or show an error message
        navigate(`/Login`,{ state: {stateType:"unauthorized-entry"}} );
    }


    // If the user is authorized, render the User component
    return (
        <div className="Home">
            <UserNav Username={Username}/>
            <div className="home-body">
              <h1>Welcome, {Username}</h1>
              <CityDetails city={city} country={country} />
              <Forecast city={city} country={country} />
              <LogOut Username={Username}/>
            </div>
        </div>
    );
}

export default User;
