import { useState,useEffect } from "react";

function CityDetails({country,city}){
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getIcon(id){
        return `https://openweathermap.org/img/wn/${id}.png`;
    }

    useEffect(()=>{
        try 
        {
            fetch(`http://localhost:7777/Result/${country}/${city}`)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                setWeatherData(data);
                setIsLoading(false);
                console.log(weatherData);
            });          
        } 
        catch (error)
        {
            console.error('Error fetching data:', error);
            // Handle errors appropriately, e.g., display an error message
            setWeatherData([]);
            setIsLoading(true);
        }
        return()=>{};
    },[country, city]);

    if (isLoading)
        return(
          <div>Loading...</div>
        );
    else return (
        <div className="CityDetails">
          <h1>Weather Details in {city}, {country}: </h1>
          <div>Description: {capitalize(weatherData.weather[0].description)}</div>
          <div>Min. Temperature: {weatherData.main.temp_min}</div>
          <div>Max. Temperature: {weatherData.main.temp_max}</div>
          <div>Humidity: {weatherData.main.humidity}</div>
          <img src={getIcon(weatherData.weather[0].icon)}/>
          <button>Set as Home Page</button>
        </div>
    );



}

export default CityDetails;