import { useState,useEffect } from "react";
import "./CityDetails.css";

import clear from "./drawable/img/clear.jpeg";
import clouds from "./drawable/img/clouds.jpeg";
import drizzle from "./drawable/img/drizzle.jpeg";
import mist from "./drawable/img/mist.jpeg";
import rain from "./drawable/img/rain.jpeg";
import snow from "./drawable/img/snow.jpeg";
import thunderstorm from "./drawable/img/thunderstorm.jpeg";
import unknownImage from "./drawable/img/unknown.avif";

function CityDetails({country,city}){
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getIcon(id){
        return `https://openweathermap.org/img/wn/${id}.png`;
    }

    function getImg(img_name) {
        return (
          img_name.toLowerCase() === 'clear' ? clear :
          img_name.toLowerCase() === 'clouds' ? clouds :
          img_name.toLowerCase() === 'drizzle' ? drizzle :
          img_name.toLowerCase() === 'haze' ||
          img_name.toLowerCase() === 'mist' ? mist :
          img_name.toLowerCase() === 'rain' ? rain :
          img_name.toLowerCase() === 'snow' ? snow :
          img_name.toLowerCase() === 'thunderstorm' ? thunderstorm :
          unknownImage
        );
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
           <img className="details-bg" src={getImg(weatherData.weather[0].main)} alt="Weather image."/>
           <div className="details-items">
            <div className="details-text">
            <h1 className="details-title">{city}, {country} </h1>
                <h3 className="details-desc">{capitalize(weatherData.weather[0].description)}</h3>
                <div>Min. Temperature: {weatherData.main.temp_min}° C</div>
                <div>Max. Temperature: {weatherData.main.temp_max}° C</div>
                <div>Humidity: {weatherData.main.humidity}%</div>
            </div>
            <div className="details-divider"></div>
            <div className="details-current-temp">
                <div>{weatherData.main.temp}° C</div>
                <div className="details-feels-like">Feels like {weatherData.main.temp}° C</div>
            </div>
            <img className="details-icon" src={getIcon(weatherData.weather[0].icon)}/>
           </div>
        </div>
    );



}

export default CityDetails;