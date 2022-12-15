import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import MapView from 'react-native-maps'

import tw from 'twrnc';

export default function App() {
  return (
    <NativeBaseProvider>

      <ScrollView style={tw``}>

        <Button style={tw`mt-10`}>wow</Button>

      </ScrollView>
    </NativeBaseProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50

  },
});
