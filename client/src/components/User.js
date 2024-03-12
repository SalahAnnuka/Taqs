import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/User.css';
import UserNav from "./NavBar/UserNav";
import Facts from "./Facts";
import Forecast from "./Forecast";
import CityDetails from './CityDetails';
function User() {
    const { Username } = useParams();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [city,setCity] = useState("Moscow");
    const [country,setCountry] = useState("RU");

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://localhost:7777/logout/${Username}`, {
                method: 'POST',
            });
    
            const data = await response.json();
            if (data === "success") {
                // Handle successful logout here, e.g., redirect to login page or update state
                console.log("Logout successful");
                navigate("/");
                window.location.reload();
            } else if (data === "user not found") {
                // Handle case where user is not found
                console.log("User not found");
            } else {
                // Handle other failure cases
                console.log("Logout failed");
            }
        } catch (error) {
            // Handle error if fetch fails
            console.error("Error during logout:", error);
        }
    };

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
                setLoading(false);
            }
        };
        fetchAuthorization();
        fetchCityCountry();
    }, [Username,handleLogout]);

    

    if (loading) {
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
              <div className='logout-button' onClick={() => handleLogout()}>Log out</div>
            </div>
        </div>
    );
}

export default User;
