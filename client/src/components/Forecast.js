import React, { useState, useEffect } from 'react';
import './styles/Forecast.css';
import BlueSky from './drawable/img/blue-sky.jpeg';

function Forecast({ country, city }) {
    const [forecastData, setForecastData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function getIcon(id) {
        return `https://openweathermap.org/img/wn/${id}.png`;
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
    }, [country, city]);
    console.log(forecastData)

    return (
        <div className="forecast-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="forecast">
                    {Object.keys(forecastData).map(day => (
                        <div key={day} style={{ backgroundImage: `url(${BlueSky})`, }} className="card">
                            <div className='forecast-dim'></div>
                             <h2 className="card-title">{day}</h2>
                            <div className="hourly-forecast">
                                {Object.keys(forecastData[day]).map(hour => (
                                    <div key={hour} className="hour">
                                        <span className="hour-label">{hour.hour}:00</span>
                                        <img className="weather-icon" src={getIcon(hour.icon)} alt="Weather icon" />
                                        <div className="weather-details">
                                            {hour.description}<br />
                                            {hour.temp}<br />
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
