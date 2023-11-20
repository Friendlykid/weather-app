import PropTypes from "prop-types";

export function WeatherBox({weather}){
    console.log('/src/images/'+ weather.icon + '.svg');
    return(
        <div className="weather-box">
            {weather.icon && <img src={'/src/images/'+ weather.icon + '.svg'} alt="weather"/>}
            <div>
                <span>Today</span>
                <h1>{weather.city}</h1>
                {weather && <p>{Math.round(weather.temp)} °C</p>}
            </div>
            <div className="other-days">

            </div>
        </div>
    )
}

WeatherBox.propTypes = {
    weather : PropTypes.object
}