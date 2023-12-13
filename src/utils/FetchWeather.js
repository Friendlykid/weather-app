export async function fetchWeather(cityName = null, lat = null, lon = null) {
  let url = "https://api.openweathermap.org/data/2.5/forecast?";
  let weather = null;
  if (cityName) {
    url += "q=" + cityName;
  } else {
    url += "lat=" + lat + "&lon=" + lon;
  }
  url += "&appid=" + import.meta.env.VITE_WEATHER_API_KEY + "&units=metric";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    weather = await response.json();

    if (!weather || !weather.list || !Array.isArray(weather.list)) {
      //console.error('Unexpected API response format:', weather);
      return false;
    }
  } catch (error) {
    return false;
  }
  const days = weather.list.map((hour) => {
    if (hour.dt_txt.includes("12:00:00")) {
      return simplifyWeatherData(hour);
    }
  });
  if (days.length < 5) {
    days.unshift(simplifyWeatherData(weather.list[0]));
  }

  return {
    list: days.filter((a) => a),
    city: weather.city.name,
  };
}

function simplifyWeatherData(data) {
  const weekday = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    day: weekday[new Date(data.dt * 1000).getDay()],
  };
}
