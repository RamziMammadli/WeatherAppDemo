import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableOpacity
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Setting } from '../Settings';
import {useDispatch, useSelector} from 'react-redux';


const HomeScreen = () => {

  const color = useSelector( (state: any) => state.mod.backgroundColor )

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const fetchWeatherData = async () => {

    

    const apiKey = 'yourApiKey';
    if (!location) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
      if (data.name) {
        setLocationName(data.name)
      }
    } catch (error) {
      console.error('Hava durumu alınırken bir hata oluştu:', error);
    }
  };

  // Kullanıcının konum iznini isteyen işlev
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Konum izni verildi.');
        getLocation();
      } else {
        console.log('Konum izni reddedildi.');
      }
    } catch (error) {
      console.error('Konum izni alınamadı:', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.error('Konum alınamadı:', error),
    );
  };

  useEffect(() => {
    // Sayfa yüklendiğinde konum izni 
    requestLocationPermission();
  }, []);

  useEffect(() => {
    // location state güncellendiğinde hava durumu verilerini alma
    if (location) {
      fetchWeatherData();
    }
  }, [location]); // location state değiştiğinde hava durumu verilerini alma

  useEffect(() => {
    // Haftanın günü ve ayın tarihini alma
    const currentDateObj = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', // Ay ismi
      day: 'numeric',
      weekday: 'long', // Gün ismi
    };
    setCurrentDate(currentDateObj.toLocaleDateString('tr-TR', options));

    // Saati alma
    const currentTimeObj = new Date();
    setCurrentTime(
      currentTimeObj.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  }, []);

  return (
    <View style={{...styles.container,backgroundColor: color}}>
      <Setting/>
      <View style={{paddingHorizontal:15,flex:14}}>
        <View style={styles.header}>
          <Text style={{...styles.text, fontSize: 18}}>{currentDate}</Text>
          <Text style={{...styles.text, fontSize: 26}}>{currentTime}</Text>
        </View>
        {weatherData ? (
          <View style={styles.main}>
            <View style={styles.middle}>
              <Text style={styles.text}>
                {locationName}
              </Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.text}>Hava durumu</Text>
              <Text style={styles.weatherText}>
                {weatherData.weather[0].description}
              </Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.text}>Sıcaklık</Text>
              <Text style={styles.weatherText}>{weatherData.main.temp}°C</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.weatherText}>Hava durumu yükleniyor...</Text>
        )}
      </View>
      <View style={styles.logo}>
        <Image source={require('../../assets/logo.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
    gap: 20,
    backgroundColor: '#E7E7F2',
    justifyContent: 'space-between',
  },
  weatherText: {
    fontSize: 36,
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#889CC4',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 26,
    color: 'gold'
  },
  middle: {
    alignItems: 'center',
    backgroundColor: '#889CC4',
    borderRadius: 20,
    padding: 15,
    width: '100%',
  },
  main: {
    gap: 20,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: '#B1B9FF',
    borderTopRightRadius:100,
    borderTopLeftRadius:100,
    paddingTop:15
  },
});

export default HomeScreen;
