import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import viewPointFinder from '../functions/findViewPoints';

import tw from "twrnc";


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

      const lat = location.coords.latitude
      const lng = location.coords.longitude

      const results = await viewPointFinder(lat, lng)
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
      <View style={tw`h-200 mt-1`}>
        <MapView
          style={tw`flex-1`}
          Region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: location.coords.latitudeDelta,
            longitudeDelta: location.coords.longitudeDelta,
          }}
          onRegionChangeComplete={async (region) => { 
            const results = await viewPointFinder(region.latitude, region.longitude) 
            setMarkers(results)
          }}
        >
          {markers !== null ? markers.map((location, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: location.location.lat, longitude: location.location.long }}
                title={location.name}
                description={location.rating.toString() + "⭐️"}
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
