import React, { useState, useEffect } from 'react';
import './styles/Forecast.css';
import BlueSky from './drawable/img/blue-sky.jpeg';

function Forecast({ country, city }) {
    const [forecastData, setForecastData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function getIcon(id) {
        return `https://openweathermap.org/img/wn/${id}.png`;
    }
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await fetch(`http://localhost:7777/forecast/${country}/${city}`);
                const data = await response.json();
                setForecastData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
                setForecastData([]);
                setIsLoading(true);
            }
        };

        fetchForecastData();
    }, []);
    console.log(forecastData)

    return (
        <div className="forecast-container">
            {isLoading ? (
                <div>Loading Forecast...</div>
            ) : (
                <div className="forecast-container">
                    {Object.keys(forecastData).map(day => (
                        <div key={day} style={{ backgroundImage: `url(${BlueSky})` }} className="forecast-card">
                            <div className='forecast-dim'></div>
                            <h2 className="forecast-card-title">{day}</h2>
                            <div className="hourly-forecast">
                                {forecastData[day].map(hour => (
                                    <div key={hour.hour} className="forecast-hour-container">
                                        <span className="forecast-hour-label">{hour.hour}:00</span>
                                        <img className="forecast-weather-icon" src={getIcon(hour.icon)} alt="Weather icon" />
                                        <div className="forecast-weather-details">
                                            <div className='forecast-weather-description'>{capitalize(hour.description)}</div>
                                            <div className='forecast-weather-temperature'>{Math.round(hour.temp)}° C</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Forecast;
