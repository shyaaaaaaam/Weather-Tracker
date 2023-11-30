import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import snowyBackground from './assets/snowy.jpg';
import rainyBackground from './assets/rainy.png';
import thunderBackground from './assets/thunder.jpg';
import clearDayBackground from './assets/clearday.jpg';
import clearNightBackground from './assets/clearnight.png';
import cloudyDayBackground from './assets/cloudyday.png';
import cloudyNightBackground from './assets/cloudynight.jpg';

const API_KEY = '95d09d97f017316cee832c038fb989fd';

export default function App() {
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [searchedLocationData, setSearchedLocationData] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      getWeatherData(location.coords.latitude, location.coords.longitude, true);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getWeatherData = async (latitude, longitude, isCurrentLocation) => {
    try {
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
        },
      });

      if (isCurrentLocation) {
        setCurrentLocationData(response.data);
        setSearchedLocationData(null);
      } else {
        setSearchedLocationData(response.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    setSearchVisible(true);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery) {
      setSearchedLocationData(null);
      setSearchVisible(false);
      return;
    }
  
    getWeatherDataByCity(searchQuery);
    setSearchVisible(false);
  };
  

  const getWeatherDataByCity = async (city) => {
    try {
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setSearchedLocationData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not find weather data for the specified location');
      console.error('Error fetching weather data:', error);
    }
  };

  const renderWeatherInfoBox = (title, value) => {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value !== undefined ? value : 'N/A'}</Text>
      </View>
    );
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getBackgroundImage = () => {
    const weatherData = searchedLocationData || currentLocationData;

    if (!weatherData) {
      return clearDayBackground;
    }

    const weather = weatherData.weather[0].main.toLowerCase();
    switch (weather) {
      case 'snow':
        return snowyBackground;
      case 'rain':
        return rainyBackground;
      case 'thunderstorm':
        return thunderBackground;
      case 'clear':
        return isDay(weatherData) ? clearDayBackground : clearNightBackground;
      case 'clouds':
        return isDay(weatherData) ? cloudyDayBackground : cloudyNightBackground;
      default:
        return clearDayBackground;
    }
  };

  const isDay = (weatherData) => {
    const sunriseTimestamp = weatherData.sys.sunrise * 1000;
    const sunsetTimestamp = weatherData.sys.sunset * 1000;
    const currentTimestamp = Date.now();
    return currentTimestamp > sunriseTimestamp && currentTimestamp < sunsetTimestamp;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.heading}>Weather Tracker</Text>
          <Text style={styles.subHeading}>Simple Weather Application!</Text>

          {currentLocationData && (
            <View>
              <Text style={styles.city}>{currentLocationData.name}</Text>
              <Text style={styles.temperature}>{currentLocationData.main.temp} °C</Text>
              <Text style={styles.weather}>{capitalizeFirstLetter(currentLocationData.weather[0].description)}</Text>

              <View style={styles.weatherInfoContainer}>
                {renderWeatherInfoBox('Sunrise', new Date(currentLocationData.sys.sunrise * 1000).toLocaleTimeString())}
                {renderWeatherInfoBox('UV Index', formatUVIndex(currentLocationData.uvi))}
                {renderWeatherInfoBox('Wind Speed', `${currentLocationData.wind.speed} m/s`)}
                {renderWeatherInfoBox('Wind Direction', getWindDirection(currentLocationData.wind.deg))}
                {renderWeatherInfoBox('Precipitation', formatPrecipitation(currentLocationData.rain && currentLocationData.rain['1h']))}
                {renderWeatherInfoBox('Visibility', `${currentLocationData.visibility} meters`)}
                {renderWeatherInfoBox('Humidity', `${currentLocationData.main.humidity}%`)}
                {renderWeatherInfoBox('Pressure', `${currentLocationData.main.pressure} hPa`)}
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>

          {searchVisible && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSearchSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          {searchedLocationData && (
            <View>
              <Text style={styles.city}>{searchedLocationData.name}</Text>
              <Text style={styles.temperature}>{searchedLocationData.main.temp} °C</Text>
              <Text style={styles.weather}>{capitalizeFirstLetter(searchedLocationData.weather[0].description)}</Text>

              <View style={styles.weatherInfoContainer}>
                {renderWeatherInfoBox('Sunrise', new Date(searchedLocationData.sys.sunrise * 1000).toLocaleTimeString())}
                {renderWeatherInfoBox('UV Index', formatUVIndex(searchedLocationData.uvi))}
                {renderWeatherInfoBox('Wind Speed', `${searchedLocationData.wind.speed} m/s`)}
                {renderWeatherInfoBox('Wind Direction', getWindDirection(searchedLocationData.wind.deg))}
                {renderWeatherInfoBox('Precipitation', formatPrecipitation(searchedLocationData.rain && searchedLocationData.rain['1h']))}
                {renderWeatherInfoBox('Visibility', `${searchedLocationData.visibility} meters`)}
                {renderWeatherInfoBox('Humidity', `${searchedLocationData.main.humidity}%`)}
                {renderWeatherInfoBox('Pressure', `${searchedLocationData.main.pressure} hPa`)}
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    color: 'white',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 50,
    color: 'white',
  },
  searchButton: {
    position: 'absolute',
    top: 150,
    right: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    color: 'white',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  temperature: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  weather: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: 'white',
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    minWidth: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const index = Math.round((degrees % 360) / 45);
  return directions[index];
};

const isValueAvailable = (value) => {
  return value !== undefined && value !== null;
};

const formatUVIndex = (uvIndex) => {
  return isValueAvailable(uvIndex) ? uvIndex.toFixed(2) : 'N/A';
};

const formatPrecipitation = (precipitation) => {
  return isValueAvailable(precipitation) ? `${precipitation} mm` : 'N/A';
};