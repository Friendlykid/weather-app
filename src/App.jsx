import './App.css'
import {useEffect, useState} from "react";
import {CityInput} from "./CityInput.jsx";
import {WeatherBox} from "./WeatherBox.jsx";
import {fetchWeather} from "./utils/FetchWeather.js";

function App() {
    const [weather, setWeather] = useState({
        city:'',
        list: []
    });

    // Effect for getting current coordinates
    useEffect(() => {
        let test = true;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const {latitude, longitude} = position.coords;
                    if(test){
                        const data = await fetchWeather(undefined, latitude, longitude);
                        if(data){
                            setWeather(data);
                        }
                    }
                },
                (error) => {
                    console.error('Error getting geolocation:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        return () =>{
            test = false;
        }
    }, []);

    return (
    <>
        <h1>Weather app</h1>
        <CityInput setWeather={setWeather}/>
        {weather.list.length !== 0 && <WeatherBox weather={weather} key={weather.city}/>}
    </>
  )
}

export default App
