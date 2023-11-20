export async function fetchWeather(cityName = null, lat = null, lon = null) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?";
    let weather = null;
    if (cityName) {
        url += "q=" + cityName;
    } else {
        url += "lat=" + lat + "&lon=" + lon;
    }
    url += "&appid=3ed7f252522467deac5d55daeeaef40a&units=metric";
    console.log(url);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        weather =  await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    let counter = 0;
    weather.list.forEach(a => {
        //console.log(a.dt_txt);
        if(a.dt_txt.includes("12:00:00"))
            counter++
    });
    console.log(counter);
    const days = weather.list.map(hour =>{
        if(hour.dt_txt.includes("12:00:00")){
            return simplifyWeatherData(hour);
        }
    });
    if(days.length < 5){
        days.unshift(simplifyWeatherData(weather.list[0]))
    }

    return days.filter(a => a);
}

function simplifyWeatherData(data){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        day: weekday[new Date(data.dt * 1000).getDay() - 1]
    };
}