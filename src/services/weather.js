import favoriteCities from ".././assets/favoriteCities.json";
import axios from "axios";

const getFavoriteCities = async (selectedCity) => {
  const requests = [];
  favoriteCities.forEach((city, index) => {
    if (city.isSelected) {
      selectedCity.value = index;
    }
    requests.push(getCityFromApi(city));
  });

  const weatherDataResp = await Promise.all(requests);

  return weatherDataResp;
};

const getCityFromApi = (city) => {
  const options = {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: import.meta.env.VITE_API_KEY,
      units: "metric",
    },
  };

  return axios.get("https://api.openweathermap.org/data/2.5/onecall", options);
};

const weatherParser = (weatherResp) => {
  let weatherDataArray = [];
  if (weatherResp) {
    weatherResp.forEach((weatherData) => {
      if (weatherData.data) {
        weatherData = formatWeatherResp(weatherData);
        weatherDataArray.push(weatherData.data);
      }
    });
  }
  return weatherDataArray;
};

const formatWeatherResp = (weatherData, fromSearch) => {
  const localOffset = new Date().getTimezoneOffset() * 60000;

  const utc = weatherData.data.current.dt * 1000 + localOffset;

  weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

  // cal hourly weather offset
  weatherData.data.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset;
    hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
  });
  weatherData.data.daily = weatherData.data.daily.slice(1, 6);
  return weatherData;
};

const getWeatherSearchData = async (city) => {
  const weatherDataResp = await getCityFromApi(city);
  const weatherData = formatWeatherResp(weatherDataResp, true);
  return weatherData.data;
};

export { getFavoriteCities, getWeatherSearchData, weatherParser };
