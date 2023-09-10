import axios from 'axios'

    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const urlForecast = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}`;
    const urlLocation = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;
    const apiKey = '38b9e7564ac148c0bf065635230509';
    const apiCall = async (endpoint)=>{
        const options = {
            method: 'GET',
            url: endpoint,
        };
        try{
            const response = await axios.request(options);
            return response.data;
          }catch(error){
            console.log('error: ',error);
            return {};
    }
}
    export const fetchWeatherForecast = params=>{
        let forecastUrl = urlForecast(params);
        return apiCall(forecastUrl);
    }

    export const fetchLocations = params=>{
        let locationsUrl = urlLocation(params);
        return apiCall(locationsUrl);
    }

    export const weatherImages = {
        'Partly cloudy': require('../assets/images/part_cloud.png'),
        'Moderate rain': require('../assets/weathericons/lite_rain.png'),
        'Patchy rain possible': require('../assets/weathericons/lite_rain.png'),
        'Sunny': require('../assets/weathericons/sunny.png'),
        'Clear': require('../assets/weathericons/sunny.png'),
        'Overcast': require('../assets/weathericons/cloud.png'),
        'Cloudy': require('../assets/weathericons/cloud.png'),
        'Light rain': require('../assets/weathericons/lite_rain.png'),
        'Moderate rain at times': require('../assets/weathericons/rain.png'),
        'Heavy rain': require('../assets/weathericons/heavy_rain.png'),
        'Heavy rain at times': require('../assets/weathericons/heavy_rain.png'),
        'Moderate or heavy freezing rain': require('../assets/weathericons/heavy_rain.png'),
        'Moderate or heavy rain shower': require('../assets/weathericons/heavy_rain.png'),
        'Moderate or heavy rain with thunder': require('../assets/weathericons/storm.png'),
        'Mist': require('../assets/weathericons/haze.png'),
        'other': require('../assets/weathericons/dust.png')
    }