import PropTypes from "prop-types";

export function WeatherBox({weather}){
    return(
        <div className="weather-box">
            <div className="today">
                {weather.list[0].icon && <img src={'/src/images/'+ weather.list[0].icon + '.svg'} alt="weather"/>}
                <div className="today-info">
                    <span>Today</span>
                    <h1>{weather.city}</h1>
                    <p>Temperature: {Math.round(weather.list[0].temp)} °C</p>
                    <p>{weather.list[0].description}</p>
                </div>

            </div>
            <div className="other-days">
                {weather.list.map((day, index) =>{
                    if(index !== 0){
                        return (
                            <div className="other-day" key={day.day}>
                                <span>{day.day}</span>
                                <img src={'/src/images/'+ day.icon + '.svg'} alt="weather"/>
                                <p>{Math.round(day.temp) + "°C"}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

WeatherBox.propTypes = {
    weather : PropTypes.object
}