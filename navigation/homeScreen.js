import { weatherImages } from '../utils/fetchWeather';
import { DetailsScreen } from '../navigation/cityScreen';

export default function HomeScreen({ navigation }) {

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({})

  const handleSearch = search=>{
    // console.log('value: ',search);
    if(search && search.length>2)
      fetchLocations({cityName: search}).then(data=>{
        // console.log('got locations: ',data);
        setLocations(data);
      })
  }

  const handleLocation = loc=>{
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc.name);
    })
  }

  useEffect(()=>{
    fetchMyWeatherData();
  },[]);

  const fetchMyWeatherData = async ()=>{
    let myCity = await getData('city');
    let cityName = 'Sydney';
    if(myCity){
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data=>{
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    })
    
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

    return (
      <View  style={{ flex: 1, alignItems: 'center', marginTop: 50}}>
        <View style={{paddingTop: 10, paddingBottom: 20}}>

            {/* <Text style={styles.intheader}>Welcome to Weather Time!</Text>
            <Text style={styles.header}>Press <MaterialCommunityIcons name='plus-thick'/> to view and add cities from around the world to view their date, time and weather. You can pin a city to display it here on the Home screen.{"\n"}</Text>
            <Text style={styles.header}>Press <MaterialIcons name='settings'/> for settings. Settings enables the user to select unit of temperature, text size, sound effects and brightness.</Text> */}

            <Text style={{textAlign: 'center', fontWeight:'500', fontSize: 32, fontFamily:'Roboto', paddingBottom: 10}}>{location?.name}</Text>
            <Image style={styles.weatherLogo} source={weatherImages[current?.condition.text || 'other']}></Image>
            <Text style={{textAlign: 'center', fontWeight:'700', fontSize: 54, fontFamily:'Roboto'}}>{current?.temp_c}°C</Text>
            <Text style={{textAlign: 'center', fontWeight:'500', fontSize: 28, fontFamily:'Roboto'}}>{current?.condition?.text}</Text>
            <Text style={{textAlign: 'center', fontWeight:'300', fontSize: 18, fontFamily:'Roboto', paddingBottom: 15}}>{current?.condition?.text}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', paddingRight: 15}}>
            <Card mode='contained' style={{marginBottom: 15}}>
              <Text style={styles.details}>Feels Like</Text>
              <Text style={styles.detValues}>{current?.feelslike_c}°C</Text>
            </Card>
            <Card mode='contained'>
              <Text style={styles.details}><Image style={styles.weatherIcon} source={require('../assets/weathericons/temp-min.png')}/>   Temp Min</Text>
              <Text style={styles.detValues}>{forecast?.forecastday[0]?.day?.mintemp_c}°C</Text>
              <Divider horizontalInset='true' bold='true'/>
              <Text style={styles.details}><Image style={styles.weatherIcon} source={require('../assets/weathericons/temp-max.png')}/>   Temp Max</Text> 
              <Text style={styles.detValues}>{forecast?.forecastday[0]?.day?.maxtemp_c}°C</Text>
            </Card>
          </View>
          <View>
            <Card mode='contained' style={{paddingBottom:10}}>
              <Text style={styles.details}><Image style={styles.weatherIcon} source={require('../assets/weathericons/humid.png')}/>   Humidity</Text>
              <Text style={styles.detValues}>{current?.humidity}%</Text>
              <Divider horizontalInset='true' bold='true'/>
              <Text style={styles.details}><Image style={styles.weatherIcon} source={require('../assets/weathericons/press.png')}/>   Pressure</Text>
              <Text style={styles.detValues}>{current?.pressure_mb} mb</Text>
              <Divider horizontalInset='true' bold='true'/>
              <Text style={styles.details}><Image style={styles.weatherIcon} source={require('../assets/weathericons/wind.png')}/>   Wind Speed</Text>
              <Text style={styles.detValues}>{current?.wind_kph} km/h</Text>
            </Card>
          </View>
        </View>
        <FAB
              icon="plus"
              style={styles.fab}
              onPress={() => navigation.navigate('Lists')} 
              label='Set City'
          />
      </View>
    );
  }

  