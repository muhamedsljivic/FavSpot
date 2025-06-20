import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import React from 'react';
import IconButton from './UI/IconButton';
import Map from './screens/Map'; 

export type RootStackParamList = {
  allPlaces: undefined;
  addPlace: {
    pickedLatitude: number;
    pickedLongitude: number;
  };
  Map: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="allPlaces" component={AllPlaces} options={({navigation}) =>({ title: 'All Places',
            headerRight: () => <IconButton icon='add' color={'black'} size={24} onPress={() =>
              navigation.navigate("addPlace", {
                pickedLatitude: 0,
                pickedLongitude: 0,
              })
            }/>
             
          })}/>
          <Stack.Screen name="addPlace" component={AddPlace} options={{title: "Add Place"}} />
          <Stack.Screen name="Map" component={Map} options={{ title: 'Select Location' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
