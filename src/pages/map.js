import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";

export default function Map({navigation}) {

  return (

    <View style={tw`h-100 mt-20`}>
      <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0312,
          longitudeDelta: 0.0321,
        }
        }   
      >
        <Marker
          coordinate={{
            latitude: 37.788254827145542,
            longitude: -122.4324,
          }}/>
      </MapView>
    </View>


  );
}
