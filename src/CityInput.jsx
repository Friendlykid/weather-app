import PropTypes from "prop-types";
import {useState} from "react";
import {fetchWeather} from "./utils/FetchWeather.js";

export function CityInput({setWeather}){
    const [data, setData] = useState({
            city: '',
            placeholder:"Enter a City..."
        });
    //const [city, setCity] = useState('');
    return(
        <form onSubmit={async (e) => {
            e.preventDefault();
            const weather = await fetchWeather(data.city).catch(() => false);

            if(weather){
                setWeather(weather);
                setData({
                    city: '',
                    placeholder:"Enter a City..."
                });
            }
        else{
                setData({
                    city: '',
                    placeholder:"Wrong City..."
                });
            }
        }}>
            <input value={data.city}
                   onChange={(e) =>
                       setData({city: e.target.value, placeholder: "Enter a City..."})}
                   placeholder={data.placeholder}
                   name="form"
            />
        </form>

    )
}

CityInput.propTypes = {
    setWeather: PropTypes.func
}