import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {

  return (
    <View>
      <Text>
        Profile page
        <TouchableOpacity onPress={() => navigation.navigate('map')}>
          <Text>Go to Map</Text>
        </TouchableOpacity>

      </Text>
    </View>
  );
}