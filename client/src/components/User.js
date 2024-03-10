import { useEffect, useState } from 'react';
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

import UserNav from "./NavBar/UserNav";
import UserPage from "./UserPage";

function User() {
    const { Username } = useParams();
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


    // If the user is authorized, render the User component
    return (
        <div className="Home">
            <UserNav Username={Username}/>
            <div className="home-body">
              <h1>Welcome, {Username}</h1>
              <UserPage user={Username}/>
              <button onClick={() => handleLogout()}>Log out</button>
            </div>
        </div>
    );
}

export default User;
