import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import tw from "twrnc";

const dataHandler = require('../components/dataHandler.js')
const api_key = 'AIzaSyCuIx6jsRwkt-nc7yrbrE-nFXXcJYUfGf4'

const ViewPointAPi = require('../components/apis/viewPointApi.js')

export default function Map({navigation}) {

  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const Api = new ViewPointAPi(api_key)
      const lat = "51.475638"
      const lng = "0.015027"
      const radius = "1600"
      const keyword = "viewpoints"

      const data = await Api.getData(lat, lng, radius, keyword);
      const results = dataHandler(data)
      setMarkers(results)
    })();

 
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if(location){
    return (
      <View style={tw`h-100 mt-20`}>
        <MapView
          style={tw`flex-1`}
          Region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: location.coords.latitudeDelta,
            longitudeDelta: location.coords.longitudeDelta,
          }
          }
        >
    
          {markers !== null ? markers.map((location, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: location.location.lat, longitude: location.location.long }}
                title={location.name}
                description={location.rating.toString()}
                >
      
              </Marker>
            )
          }) : null}
        </MapView>
        <Text>{JSON.stringify(markers)}</Text>
      </View>
    );
  }
  return (
    <View style={tw`h-100 mt-20`}>
      <MapView
        style={tw`flex-1`}
        region={{
          latitude: 51.475656,
          longitude: -0.01496,
          latitudeDelta: 0.0182,
          longitudeDelta: 0.0111,
        }}
      >
      </MapView>
      <Text>not loaded</Text>
    </View>
  )
 
}
