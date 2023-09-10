import {weather, location, current} from './homeScreen';

export default function DetailsScreen({}) {

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
        <Card style={styles.cards}>
          <Card.Content>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.titleCard}>{location?.name}</Text>
                <Text style={styles.labelCard}>{location?.localtime}</Text>
                <Text>{weather?.forecast?.forecastday[0]?.date}</Text>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Image style={{resizeMode: 'contain', height: 45, width: 45, marginRight: 5}} source={require('./assets/weathericons/sunny.png')}/>
                  <Text style={{fontSize: 26}}>{current?.temp_c}°C</Text>
                </View>
                <Text style={{textAlign: 'right'}}>{current?.condition?.text}</Text>
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
            <Text variant="titleLarge">Melbourne</Text>
            <Text variant="bodyMedium">07/09/2023</Text>
            <Text>Cloudy</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setShouldShow(!shouldShow)}>Delete</Button>
            <Button onPress={() => { unPin(); onToggleSnackBar(); }}>{action}</Button>
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