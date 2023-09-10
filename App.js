import * as React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, FAB, Text, Button, Searchbar, Card, Snackbar, Divider } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  "colors": {
    "primary": "rgb(0, 95, 175)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(212, 227, 255)",
    "onPrimaryContainer": "rgb(0, 28, 58)",
    "secondary": "rgb(84, 95, 113)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(218, 231, 201)",
    "onSecondaryContainer": "rgb(17, 28, 43)",
    "tertiary": "rgb(110, 86, 118)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(247, 216, 255)",
    "onTertiaryContainer": "rgb(39, 20, 48)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(253, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(224, 226, 236)",
    "onSurfaceVariant": "rgb(67, 71, 78)",
    "outline": "rgb(116, 119, 127)",
    "outlineVariant": "rgb(195, 198, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(165, 200, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(240, 244, 251)",
      "level2": "rgb(233, 239, 249)",
      "level3": "rgb(225, 235, 246)",
      "level4": "rgb(223, 233, 245)",
      "level5": "rgb(218, 230, 244)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(45, 49, 56, 0.4)"
  }
};

function HomeScreen({ navigation }) {

  return (
    <View  style={{ flex: 1, alignItems: 'center', marginTop: 50, justifyContent:'center'}}>

          {/* <Text style={styles.intheader}>Welcome to Weather Time!</Text>
          <Text style={styles.header}>Press <MaterialCommunityIcons name='plus-thick'/> to view and add cities from around the world to view their date, time and weather. You can pin a city to display it here on the Home screen.{"\n"}</Text>
          <Text style={styles.header}>Press <MaterialIcons name='settings'/> for settings. Settings enables the user to select unit of temperature, text size, sound effects and brightness.</Text> */}

      <View style={{paddingTop: 10, paddingBottom: 20}}>
          
          <Text style={{textAlign: 'center', fontWeight:'500', fontSize: 32, fontFamily:'Roboto', paddingBottom: 10}}>Sydney</Text>
          <Image style={styles.weatherLogo} source={require('./assets/weathericons/sunny.png')}></Image>
          <Text style={{textAlign: 'center', fontWeight:'700', fontSize: 54, fontFamily:'Roboto'}}>59°F</Text>
          <Text style={{textAlign: 'center', fontWeight:'500', fontSize: 28, fontFamily:'Roboto'}}>Clear</Text>
          <Text style={{textAlign: 'center', fontWeight:'300', fontSize: 18, fontFamily:'Roboto', paddingBottom: 15}}>clear sky</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', paddingRight: 15}}>
          <Card mode='contained' style={{marginBottom: 15}}>
            <Text style={styles.details}>Feels Like</Text>
            <Text style={styles.detValues}>57°F</Text>
          </Card>
          <Card mode='contained'>
            <Text style={styles.details}><Image style={styles.weatherIcon} source={require('./assets/weathericons/temp-min.png')}/>   Temp Min</Text>
            <Text style={styles.detValues}>57°F</Text>
            <Divider horizontalInset='true' bold='true'/>
            <Text style={styles.details}><Image style={styles.weatherIcon} source={require('./assets/weathericons/temp-max.png')}/>   Temp Max</Text> 
            <Text style={styles.detValues}>64°F</Text>
          </Card>
        </View>
        <View>
          <Card mode='contained' style={{paddingBottom:10}}>
            <Text style={styles.details}><Image style={styles.weatherIcon} source={require('./assets/weathericons/humid.png')}/>   Humidity</Text>
            <Text style={styles.detValues}>58%</Text>
            <Divider horizontalInset='true' bold='true'/>
            <Text style={styles.details}><Image style={styles.weatherIcon} source={require('./assets/weathericons/press.png')}/>   Pressure</Text>
            <Text style={styles.detValues}>1028 mb</Text>
            <Divider horizontalInset='true' bold='true'/>
            <Text style={styles.details}><Image style={styles.weatherIcon} source={require('./assets/weathericons/wind.png')}/>   Wind Speed</Text>
            <Text style={styles.detValues}>20 km/h</Text>
          </Card>
        </View>
      </View>
      <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('Lists')} 
            // label='Set City'
        />
    </View>
  );
}

function DetailsScreen({}) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [visible, setVisible] = React.useState(false);
  const [action, setAction] = React.useState('Pin');
  const unPin = () => {setAction('Pinned')};
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [shouldShow, setShouldShow] = React.useState(true);

  return (
    <SafeAreaProvider>
    <View style={{ flex: 1, paddingTop: 50, marginLeft: 10, marginRight: 10}}>
      <ScrollView>
      <Text variant='displaySmall' style={{ marginBottom:20, marginLeft: 5}}>City List</Text>
      {/* <Text style={styles.header}>Type in your city in the search bar below to retrieve weather information.</Text> */}
      <Card style={styles.cards}>
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.titleCard}>Sydney</Text>
              <Text style={styles.labelCard}>21:49</Text>
              <Text>8/09/2023</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image style={{resizeMode: 'contain', height: 45, width: 45, marginRight: 5}} source={require('./assets/weathericons/sunny.png')}/>
                <Text style={{fontSize: 26}}>59°F</Text>
              </View>
              <Text style={{textAlign: 'right'}}>Clear, clear sky</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button disabled>Delete</Button>
          <Button onPress={() => { unPin(); onToggleSnackBar(); }}>{action}</Button>
        </Card.Actions>
      </Card>
      {shouldShow ? (
      <Card style={styles.cards}>
        <Card.Content>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.titleCard}>Melbourne</Text>
              <Text style={styles.labelCard}>21:49</Text>
              <Text>8/09/2023</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image style={{resizeMode: 'contain', height: 45, width: 45, marginRight: 5}} source={require('./assets/weathericons/part_cloud.png')}/>
                <Text style={{fontSize: 26, textAlign: 'right'}}>55°F</Text>
              </View>
              <Text style={{textAlign: 'right'}}>Cloudy, partly cloudy</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => setShouldShow(!shouldShow)}>Delete</Button>
          <Button>Pin</Button>
        </Card.Actions>
      </Card> ) :null }
      </ScrollView>

      <Searchbar
      style={styles.search}
      placeholder="Search City"
      onChangeText={onChangeSearch}
      value={searchQuery}
      />

      <Snackbar
      duration={2000}
      visible={visible}
      onDismiss={onDismissSnackBar}
      >
      Selected city is pinned to Home Screen.
      </Snackbar>
    </View>
    </SafeAreaProvider>
  );
}

function SettingsScreen () {
  const [checked, setChecked] = React.useState('first');

  return (
    <ScrollView style={{ flex: 1, marginTop: 50, marginLeft: 15, marginRight: 15}}>
      <Text variant='displaySmall' style={{ marginBottom:30, marginLeft: 5}}>Settings</Text>
      <Card style={styles.cards}>
        <Text variant='titleSmall' style={{ paddingBottom:10, paddingLeft: 10}}>Temperature Units:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button mode="outlined">Celcius</Button>
          <Button mode='contained'>Fahrenheit</Button>
        </View>
      </Card>
      <Card style={styles.cards}>
        <Text variant='titleSmall' style={{ paddingBottom:10, paddingLeft: 10}}>Text Size:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button mode="contained">Normal</Button>
          <Button mode='outlined'>Large</Button>
          <Button mode='outlined'>Extra Large</Button>
        </View>
      </Card>
      <Card style={styles.cards}>
        <Text variant='titleSmall' style={{ paddingBottom:10, paddingLeft: 10}}>Sound Effects:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button mode="contained">ON</Button>
          <Button mode='outlined'>OFF</Button>
        </View>
      </Card>
      <Card style={styles.cards}>
        <Text variant='titleSmall' style={{ paddingBottom:10, paddingLeft: 10}}>Screen Brightness:</Text>
        <View style={{alignItems:'center'}}>
        <Slider
          style={{width: 300, height: 40,}}
          thumbTintColor='#4755b6'
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#4755b6"
          maximumTrackTintColor="#000000"
        />
        </View>
      </Card>
      <Card style={styles.cards}>
      <Text variant='titleMedium' style={styles.aboutus}>Weather Time {"\n"}</Text>
        <Text style={styles.aboutus}>©2023 ABC Solutions Pty Ltd</Text>
        <Text style={styles.ver}>Version 1.1</Text>
        <Text style={styles.aboutus}>Build Date: 29/08/2023</Text>
        <Text style={styles.aboutus}>Last Updated:10/09/2023</Text>
        <Text style={styles.aboutus}>Developer:I Nyoman Bagus Sudassana</Text>
        <Text style={styles.aboutus}>Student Number: 202220636 {"\n"}</Text>
        <Text style={styles.endnote}>Thank you for purchasing Weather Time. If you have any issues or feedback, please contact: 1800 123 456.</Text>
        <Text style={styles.endnote}>Data provided by OpenWeather. Best efforts are taken to ensure accuracy of the data, but no guarantees are made. To view the official data, please visit the website at openweathermap.org</Text>
      </Card>
      <View style={{flex:1, alignItems:'flex-end'}}>
        <Button mode='contained' buttonColor='#ba1a1a'><Text style={{color:'white'}}>Reset to Default</Text></Button>
      </View>
    </ScrollView>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator
        initialRouteName='Home'
        barStyle={{ backgroundColor: '#d4e3ff' }}
        shifting= {false}>
          <Tabs.Screen name="Home" component={HomeScreen} 
          options={{ 
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name='home' color={'#545f71'} size={24} />
            )
          }}/>
          <Tabs.Screen name="Lists" component={DetailsScreen} 
          options={{ 
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name='city-variant' color={'#545f71'} size={24} />
            ), tabBarLabel: "City List"
          }}/>
          <Tabs.Screen name="Settings" component={SettingsScreen}
          options={{ 
            tabBarIcon: ({color}) => (
              <MaterialIcons name='settings' color={'#545f71'} size={24} />
            )
          }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Tabs = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  intheader: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 20,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  search: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  cards: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleCard: {
    fontSize: 26,
    fontWeight: '400',
  },
  labelCard: {
    fontSize: 18,
  },
  del: {
    backgroundColor: 'red'
  },
  aboutus: {
    paddingLeft: 10,
  },
  endnote: {
    paddingRight: 10,
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'right'
  },
  ver: {
    fontWeight:'bold',
    paddingLeft:10
  },
  weatherIcon: {
    width: 20,
    height: 20,
  },
  weatherLogo: {
    marginBottom: 10,
    marginTop: 10,
    width: 120,
    height: 120,

  },
  details: {
    padding: 12,
    textAlign: 'center',
    fontSize: 15
  },
  detValues: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 15,
  }
})

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}