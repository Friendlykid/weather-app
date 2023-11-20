import './App.css'
import {useEffect, useState} from "react";
import {CityInput} from "./CityInput.jsx";
import {WeatherBox} from "./WeatherBox.jsx";
function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({
        temp: null,
        description: null,
        city: null,
        icon: null
    });
    const [currentCoordinates, setCurrentCoordinates] = useState({
        latitude: null,
        longitude: null,
    });

    // Effect for getting current coordinates
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentCoordinates({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting geolocation:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect( () => {
        let process = true;

        if(process){
            fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${currentCoordinates.latitude}&lon=${currentCoordinates.longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                }).then(data =>{
                if(process){
                    console.log(data);
                    console.log(data.name);
                    setWeather({
                        temp:data.main.temp,
                        description: data.weather[0].description,
                        city: data.name,
                        icon: data.weather[0].icon
                    });
                }
            })
        }


        return (() =>{
            process = false;
        })
    }, [currentCoordinates]);
    return (
    <>
        <h1>Weather app</h1>
        <CityInput city={city} setCity={setCity}></CityInput>
        {weather.city && <WeatherBox weather={weather}/>}
    </>
  )
}

export default App
